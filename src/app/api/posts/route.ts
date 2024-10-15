import { NextResponse } from 'next/server';
import prisma from '@lib/prisma';

export async function GET() {
    try {
      // Prisma를 통해 모든 게시글 가져오기
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',  // 최신 게시글 순으로 정렬
        },
      });
      return NextResponse.json(posts, { status: 200 });
    } catch (error) {
      console.error('게시글 목록 가져오기 오류:', error);
      return NextResponse.json({ error: '게시글 목록을 불러오는 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }

export async function POST(req: Request) {
  const { title, slug, excerpt, content, image } = await req.json();

  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image,
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('게시글 등록 중 오류:', error);  // 에러를 로그로 출력
    return NextResponse.json({ error: '게시글 등록 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

