import { NextResponse } from 'next/server';
import prisma from '@lib/prisma';

// 특정 게시글을 ID로 가져오는 GET
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id, 10) },  // ID를 숫자로 변환
    });

    if (!post) {
      return NextResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('게시글 가져오기 오류:', error);
    return NextResponse.json({ error: "게시글을 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}
