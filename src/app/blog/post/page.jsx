"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Quill은 서버 사이드 렌더링과 호환되지 않으므로 dynamic import를 사용합니다.
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// 기본 툴바 설정
const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
  ],
};

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 전송할 데이터를 출력하여 확인
    console.log({
      title,
      excerpt,
      content,
      image: image ? image.name : null,
    });
  
    const formData = {
      title,
      excerpt,
      content,
      image: image ? image.name : null,  // 이미지가 선택되지 않았을 때는 null
    };
  
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    if (response.ok) {
      alert("게시글이 성공적으로 등록되었습니다.");
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
          modules={modules} // 툴바 설정 적용
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
