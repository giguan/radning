"use client";

import { useEffect, useState } from "react";

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // API에서 게시글 목록 가져오기
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">블로그 목록</h1>
      <ul className="space-y-4">
        {posts.length === 0 ? (
          <p>게시글이 없습니다.</p>
        ) : (
          posts.map((post) => (
            <li key={post.id} className="border-b pb-4">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-gray-500">{post.excerpt}</p>
              <p className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
