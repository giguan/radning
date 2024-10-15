# Dockerfile
FROM node:18-alpine

# dockerize 설치
RUN apk add --no-cache wget \
    && wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-linux-amd64-v0.6.1.tar.gz

WORKDIR /app
COPY . .

# 명령어
CMD ["sh", "-c", "dockerize -wait tcp://db:3306 -timeout 30s && npx prisma migrate dev --name init && npx prisma generate && npm run build && npm run start"]
