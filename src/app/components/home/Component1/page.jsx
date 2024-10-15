"use client";

import Link from "next/link";
import { FaNewspaper, FaShieldAlt, FaCheckCircle, FaLightbulb, FaBook, FaGift } from "react-icons/fa";

const Component1 = () => {
  return (
    <div className="p-3 bg-white rounded-lg shadow-lg border">
      <h2 className="font-bold text-lg mb-4">토토의집 서비스</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="p-3 bg-gray-100 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105">
          <FaNewspaper className="w-10 h-10 text-blue-500" />
          <div className="text-left">
            <Link href="#">
              <h3 className="text-base font-semibold text-gray-700 hover:text-blue-600">
                토토의집 블로그
              </h3>
            </Link>
            <p className="text-xs text-gray-500">
              토지노 전문가들의 최신 소식을 받아보세요.
            </p>
          </div>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105">
          <FaShieldAlt className="w-10 h-10 text-green-500" />
          <div className="text-left">
            <Link href="#">
              <h3 className="text-base font-semibold text-gray-700 hover:text-blue-600">
                먹튀 토토 사이트
              </h3>
            </Link>
            <p className="text-xs text-gray-500">
              신뢰할 수 있는 토토 사이트 검증.
            </p>
          </div>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105">
          <FaCheckCircle className="w-10 h-10 text-yellow-500" />
          <div className="text-left">
            <Link href="#">
              <h3 className="text-base font-semibold text-gray-700 hover:text-blue-600">
                검증 토토 사이트
              </h3>
            </Link>
            <p className="text-xs text-gray-500">
              안전한 사이트를 한눈에 확인하세요.
            </p>
          </div>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105">
          <FaLightbulb className="w-10 h-10 text-orange-500" />
          <div className="text-left">
            <Link href="#">
              <h3 className="text-base font-semibold text-gray-700 hover:text-blue-600">
                토지노 노하우
              </h3>
            </Link>
            <p className="text-xs text-gray-500">
              전문가들의 베팅 전략을 배워보세요.
            </p>
          </div>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105">
          <FaBook className="w-10 h-10 text-red-500" />
          <div className="text-left">
            <Link href="#">
              <h3 className="text-base font-semibold text-gray-700 hover:text-blue-600">
                베팅 가이드
              </h3>
            </Link>
            <p className="text-xs text-gray-500">
              초보자들을 위한 베팅 가이드를 제공합니다.
            </p>
          </div>
        </div>
        <div className="p-3 bg-gray-100 rounded-lg shadow-md flex items-center space-x-2 transition-transform transform hover:scale-105">
          <FaGift className="w-10 h-10 text-purple-500" />
          <div className="text-left">
            <Link href="#">
              <h3 className="text-base font-semibold text-gray-700 hover:text-blue-600">
                이벤트 정보
              </h3>
            </Link>
            <p className="text-xs text-gray-500">
              최신 이벤트 정보를 받아보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component1;
