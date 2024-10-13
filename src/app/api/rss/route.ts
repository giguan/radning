import { NextResponse } from 'next/server';
import prisma from '@lib/prisma';
import { format } from 'date-fns';

// RSS 피드 XML 생성
export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,  // 최신 20개 게시글만 RSS에 포함
  });

  const rssItems = posts
    .map(post => `
      <item>
        <title>${post.title}</title>
        <link>https://your-domain.com/blog/${post.id}</link>
        <pubDate>${format(new Date(post.createdAt), 'EEE, dd MMM yyyy HH:mm:ss O')}</pubDate>
        <description>${post.excerpt}</description>
      </item>
    `)
    .join('');

  const rssFeed = `
    <rss version="2.0">
      <channel>
        <title>Your Blog Title</title>
        <link>https://your-domain.com/blog</link>
        <description>Blog feed description</description>
        ${rssItems}
      </channel>
    </rss>
  `;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
