import { getAllPosts } from '@/lib/posts'; // 게시글 데이터를 가져오는 함수
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://yourwebsite.com';  // 실제 사이트의 URL로 변경
  const posts = await getAllPosts();  // 모든 게시글 데이터를 가져옵니다.

  // RSS 피드 형식의 XML 데이터 생성
  const rssFeed = `
    <rss version="2.0">
      <channel>
        <title>토토의집 블로그 RSS 피드</title>
        <link>${baseUrl}</link>
        <description>토토의집 최신 블로그 포스트</description>
        <language>ko</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${posts.map((post) => `
          <item>
            <title>${post.title}</title>
            <link>${baseUrl}/posts/${post.slug}</link>
            <description>${post.excerpt}</description>
            <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
          </item>
        `).join('')}
      </channel>
    </rss>
  `;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
