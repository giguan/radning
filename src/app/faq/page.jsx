"use client";

import React, { useState, useRef } from 'react';

export default function Faq() {
  // 상위 컴포넌트에서 openIndex와 activeTab을 관리
  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('전체'); // 기본 탭은 '전체'로 설정
  const faqRefs = useRef([]); // FAQ 항목에 대한 참조 배열

  const toggleCollapse = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // 이미 열려 있으면 닫기
    } else {
      setOpenIndex(index); // 선택한 항목 열기
    }
  };

  const handleHeaderClick = (index) => {
    // 전체 탭을 활성화하고 해당 질문을 열도록 설정
    setActiveTab('전체');
    toggleCollapse(index);
    
    // 해당 항목으로 스크롤
    faqRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="container mx-auto p-6">
      {/* 헤더 섹션 */}
      <section className="p-4">
        <div className="flex justify-evenly items-center">
          <div>
            <h2 className="text-2xl font-bold">무엇을 도와드릴까요?</h2>
            <ul className="mt-4 space-y-2">
              {/* 헤더의 질문을 클릭하면 해당 질문의 Collapse가 열리고 스크롤 */}
              <li className="flex items-center">
                <span className="text-lg font-semibold w-8 h-8 flex border justify-center items-center rounded-full shadow-md text-[#35C6F0]">Q</span>
                <p className="ml-2 cursor-pointer" onClick={() => handleHeaderClick(0)}>토지노DB는 어떻게 구매하나요?</p>
              </li>
              <li className="flex items-center">
                <span className="text-lg font-semibold w-8 h-8 flex border justify-center items-center rounded-full shadow-md text-[#35C6F0]">Q</span>
                <p className="ml-2 cursor-pointer" onClick={() => handleHeaderClick(1)}>주문 취소는 어떻게 하나요?</p>
              </li>
              <li className="flex items-center">
                <span className="text-lg font-semibold w-8 h-8 flex border justify-center items-center rounded-full shadow-md text-[#35C6F0]">Q</span>
                <p className="ml-2 cursor-pointer" onClick={() => handleHeaderClick(2)}>제품의 자세한 정보를 알고 싶어요.</p>
              </li>
              <li className="flex items-center">
                <span className="text-lg font-semibold w-8 h-8 flex border justify-center items-center rounded-full shadow-md text-[#35C6F0]">Q</span>
                <p className="ml-2 cursor-pointer" onClick={() => handleHeaderClick(3)}>제품이 불량일 때는?</p>
              </li>
              <li className="flex items-center">
                <span className="text-lg font-semibold w-8 h-8 flex border justify-center items-center rounded-full shadow-md text-[#35C6F0]">Q</span>
                <p className="ml-2 cursor-pointer" onClick={() => handleHeaderClick(4)}>카카오 계정으로 로그인하면 이미 가입되었다고 합니다.</p>
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
            <h3 className="font-medium text-left font-bold text-lg">고객센터 <span className='text-[#35C6F0]'>09:00 ~ 18:00</span></h3>
            <div className='text-left p-2 text-gray-400'>
              <p> • 평일: 전체 문의 상담</p>
              <p> • 토요일, 공휴일: 오늘의집 직배송 주문건 상담</p>
              <p> • 일요일: 휴무</p>
            </div>
            <a href="tel:1670-0876" className="block text-blue-500 font-semibold">1670-0876</a>
            <button className="w-full bg-[#35C6F0] text-white py-2 px-4 rounded-lg mt-2">1:1 카톡 상담하기</button>
            <div className="flex gap-2 mt-2">
              <button className="border border-gray-300 px-4 py-2 rounded-lg">이메일 문의하기</button>
              <button className="border border-gray-300 px-4 py-2 rounded-lg">이메일 주소 복사하기</button>
            </div>
          </div>
        </div>
      </section>

      <div className='m-4 bg-gray-100 w-full h-2'></div>

      {/* FAQ 섹션 */}
      <FAQSection openIndex={openIndex} toggleCollapse={toggleCollapse} activeTab={activeTab} setActiveTab={setActiveTab} faqRefs={faqRefs} />
    </div>
  );
}

function FAQSection({ openIndex, toggleCollapse, activeTab, setActiveTab, faqRefs }) {
  // 탭별 질문 목록
  const questions = {
    전체: [
      '토지노DB는 어떻게 구매하나요?',
      '주문 취소는 어떻게 하나요?',
      '제품의 자세한 정보를 알고 싶어요.',
      '제품이 불량일 때는?',
      '카카오 계정으로 로그인하면 이미 가입되었다고 합니다.',
    ],
    주문: [
      '주문 내역은 어떻게 확인할 수 있나요?',
      '주문 취소는 어떻게 하나요?',
    ],
    결제: [
      '결제 방법은 어떤 것이 있나요?',
      '신용카드 무이자 할부가 되나요?',
    ],
    배송: [
      '배송은 얼마나 걸리나요?',
      '배송 추적은 어떻게 하나요?',
    ],
  };

  return (
    <section className="mt-8">
      {/* 탭 메뉴 */}
      <div className="flex gap-4 border-b-2 pb-2 mb-4">
        {['전체', '주문', '결제', '배송'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 질문 목록 (Collapse) */}
      <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">{activeTab}</h3>
        <ul className="space-y-4">
          {questions[activeTab].map((question, index) => (
            <li key={index} className="border-b border-gray-200 py-2" ref={(el) => (faqRefs.current[index] = el)}>
              <button
                className="w-full text-left focus:outline-none"
                onClick={() => toggleCollapse(index)}
              >
                {question}
              </button>
              {openIndex === index && (
                <div className="mt-2 text-gray-600">
                  {/* 각 질문에 대한 답변을 추가 */}
                  해당 질문에 대한 자세한 답변이 이곳에 표시됩니다.
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
