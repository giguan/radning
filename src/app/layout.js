import localFont from "next/font/local";
import "./globals.css";

import Header from "./components/common/Header/page";
import Footer from "./components/common/Footer/page";
import Banner from "./components/common/Banner/page";
import Head from "next/head";

const NotoSansKR = localFont({
  src: "./fonts/NotoSansKR-VariableFont_wght.ttf",
  variable: "--font-noto-sans-kr",
  weight: "100 900",
});

export const metadata = {
  title: "토토의집 - 토토 및 카지노 정보를 제공하는 커뮤니티",
  description: "토토의집은 최신 토토 및 카지노 정보, 베팅 전략, 꽁머니 이벤트 정보를 제공하는 신뢰할 수 있는 커뮤니티입니다. 현직 전문가들이 운영하며 사용자에게 유용한 토토 및 카지노 정보를 빠르게 공유합니다.",
  canonical: "https://example.com", // 캐노니컬 URL 설정
};

export default function RootLayout({ children }) {

  return (
    <html lang="ko">
      <Head>
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/api/rss" />
      </Head>
      <body
        className={`${NotoSansKR.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Header/>
          <main className="flex-grow mx-auto p-4 max-w-6xl">
            <Banner />
            {children}
          </main>
          <Footer />
      </div>
      </body>
    </html>
  );
}
