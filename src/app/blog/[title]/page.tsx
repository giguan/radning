import { notFound } from "next/navigation";

// 개별 게시글 데이터를 fetch하여 렌더링
export default async function BlogPost({ params }) {
  const { title } = params;

  // 특정 게시글 가져오기
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${encodeURIComponent(title)}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound(); // 게시글이 없는 경우 404 페이지로 이동
  }

  const post = await response.json();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">{new Date(post.createdAt).toLocaleDateString()}</p>
      
      {/* HTML 콘텐츠를 안전하게 렌더링 */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }} // HTML 콘텐츠 렌더링
      />
    </div>
  );
}
