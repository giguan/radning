"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import { useRouter } from 'next/navigation';

// Quill은 서버 사이드 렌더링과 호환되지 않으므로 dynamic import를 사용합니다.
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// 한글을 포함한 슬러그 변환 함수
function convertToSlug(text) {
  return text
    .replace(/[^a-zA-Z0-9가-힣\s-]/g, '') // 한글, 영문, 숫자, 공백만 허용
    .replace(/\s+/g, '-') // 공백을 대시로 변환
    .replace(/--+/g, '-') // 여러 개의 대시를 하나로 줄임
    .replace(/^-+|-+$/g, '') // 앞뒤의 대시 제거
    .trim();
}

export default function PostForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = convertToSlug(title); // 한글 슬러그 생성

    const formData = {
      title,
      slug, // 슬러그 저장
      excerpt,
      content,
      image: image ? image.name : null,
    };

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const post = await response.json(); // 등록된 게시글의 ID와 슬러그를 반환받음

      // 게시글의 ID와 슬러그를 사용해 SEO 친화적인 URL로 리다이렉션
      router.push(`/blog/${post.id}/${slug}`);

      // 폼 초기화
      setTitle("");
      setExcerpt("");
      setContent("");
      setImage(null);
    } else {
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-4 space-y-6 bg-white shadow-md rounded">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">요약</label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">본문</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          className="mt-1 h-60 h-auto"
          theme="snow"
          placeholder="내용을 입력하세요"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">이미지</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        게시글 등록
      </button>
    </form>
  );
}
