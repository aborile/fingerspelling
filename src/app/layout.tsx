import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";
import { ReactNode } from "react";

import { Footer, Header } from "@/components";
import { classNames } from "@/modules";

import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans_KR({
  weight: ["400", "600"],
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "지문자 연습",
  description: "한글 지문자를 연습해 봐요.",
  keywords: ["지문자", "지화", "수어", "수화", "한글", "연습", "자음", "모음"],
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={classNames(
          `${ibmPlexSans.variable} antialiased font-[family-name:var(--font-ibm-plex-sans)]`,
          "bg-glaucous/10 h-screen w-screen",
          "flex flex-col items-center"
        )}
      >
        <div className="bg-white flex flex-col h-full max-w-full w-[600px]">
          <Header />

          <main className="flex-1 overflow-y-auto">
            {children}
            {modal}
            <div id="modal-root" />
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
