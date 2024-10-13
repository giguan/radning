import Link from "next/link";

// 블로그 목록을 서버에서 fetch하여 페이지에 데이터를 전달
export default async function BlogList() {
  // SSR에서 API 호출
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: "no-store", // 최신 데이터를 가져오기 위해 no-store로 설정
  });
  const posts = await response.json();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">블로그 목록</h1>
      <ul className="space-y-8">
        {posts.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-col md:flex-row items-center border-b pb-4"
            >
              {/* 썸네일 이미지 */}
              <div className="w-full md:w-1/4 mb-4 md:mb-0">
                {post.image ? (
                  <img
                    src={post.image} // 실제 이미지 경로
                    alt={`토지노 ${post.title}`}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-32 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
                    No Image
                  </div>
                )}
              </div>

              {/* 블로그 글 정보 */}
              <div className="w-full md:w-3/4 md:pl-6">
                <Link href={`/blog/${post.id}`}>
                  <h2 className="text-2xl font-semibold cursor-pointer hover:text-blue-500">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-500 mt-2">{post.excerpt}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
