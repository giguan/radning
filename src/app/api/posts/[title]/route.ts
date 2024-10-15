import { NextResponse } from 'next/server';
import prisma from '@lib/prisma';

// 게시글을 ID로 조회
export async function GET(req, { params }) {
  const { id } = params;

  try {
    // ID를 사용하여 데이터베이스에서 게시글 찾기
    const post = await prisma.post.findFirst({
      where: { id: Number(id) }, // ID로 조회
    });

    if (!post) {
      return NextResponse.json({ error: '게시글을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('게시글 조회 오류:', error);
    return NextResponse.json({ error: '게시글 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
