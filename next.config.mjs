/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['ko'], // 지원하는 언어 코드
        defaultLocale: 'ko', // 기본 언어 설정
      },
};

export default nextConfig;
