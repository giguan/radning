import { NextResponse } from "next/server";
import prisma from "@lib/prisma";

// 특정 타이틀의 게시글을 가져오는 API
export async function GET(request, { params }) {
  const { title } = params;

  try {
    const post = await prisma.post.findFirst({      // 고유키이긴 한데;;; where절 에러남
      where: { title: decodeURIComponent(title) },  // 타이틀을 기반으로 게시글 조회
    });

    if (!post) {
      return NextResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "게시글을 불러오는 중 오류가 발생했습니다." }, { status: 500 });
  }
}
