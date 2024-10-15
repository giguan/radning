import { notFound } from "next/navigation";
import prisma from '@lib/prisma';
import Head from 'next/head'; // Head 컴포넌트 임포트

// 페이지 컴포넌트
export default async function BlogPost({ params }) {
  const { id, title } = params; // URL에서 id와 title(슬러그) 가져오기

  // ID를 사용하여 데이터베이스에서 게시글 조회
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) }, // 고유 ID로 게시글 조회
  });

  console.log(post);

  // 게시글이 없을 때 처리
  if (!post) {
    notFound(); // 게시글을 찾을 수 없으면 404 페이지로 이동
  }

  // 캐노니컬 URL 생성 (예: http://yourwebsite.com/blog/1/slug)
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.id}/${post.slug}`;

  return (
    <>
      {/* Head 태그: 메타 정보 추가 */}
      <Head>
        {/* 페이지 타이틀 */}
        <title>{post.title} | 토토의집</title>
        
        {/* 메타 디스크립션 */}
        <meta name="description" content={post.excerpt} />

        {/* 캐노니컬 태그 */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph 메타 태그 (페이스북, 카카오톡 등에서 링크 미리보기) */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image || '/default-image.jpg'} />
        <meta property="og:url" content={canonicalUrl} />

        {/* 트위터 카드 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image || '/default-image.jpg'} />

        {/* 기타 메타 태그 */}
        <meta name="author" content="토토의집" />
        <meta name="keywords" content={`토지노, 토토, ${post.title}, 토토의집`} />
      </Head>

      {/* 페이지 내용 */}
      <article className="max-w-4xl mx-auto p-6">
        <h1 className="text-5xl font-bold mb-6 text-center text-gray-900">{post.title}</h1>
        <div className="border-b border-gray-300 mb-6"></div>

        {/* 요약글 표시 */}
        <p className="text-xl text-gray-700 italic text-center mb-8">
          {post.excerpt}
        </p>

        <p className="text-gray-500 text-center mb-8">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        {/* 본문 이미지 */}
        {post.image && (
          <div className="mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none mx-auto text-gray-700 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="border-t border-gray-300 mt-12 pt-6">
          <p className="text-sm text-gray-400 text-center">
            © 2024 토토의집. All Rights Reserved.
          </p>
        </div>
      </article>
    </>
  );
}
