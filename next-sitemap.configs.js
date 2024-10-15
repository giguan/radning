module.exports = {
    siteUrl: process.env.SITE_URL || 'https://yourwebsite.com', // 사이트의 URL
    generateRobotsTxt: true, // robots.txt 파일도 생성
    changefreq: 'daily', // 변경 주기 (일일)
    priority: 0.7, // 기본 페이지 우선순위
    sitemapSize: 5000, // 사이트맵당 페이지 수 제한
    generateIndexSitemap: true, // 여러 사이트맵을 인덱스에 포함할지 여부
  };
  