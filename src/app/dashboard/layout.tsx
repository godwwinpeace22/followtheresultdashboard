import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FollowTheResults",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <body className={inter.className}> */}
      <div className="container max-w-5xl mx-auto pt-10">
        <div className="border px-5 py-2 rounded-md flex flex-row justify-between items-center">
          <img src="/followtheresultlogo.png" alt="logo" className="w-24" />
          <div className="text-center">
            <span className=" text-2xl text-[#063360] font-bold">
              #FollowTheResult
            </span>{" "}
            <br />
            <span className="text-xs text-center text-gray-500">
              Governorship Elections
            </span>
          </div>

          <div className="flex flex-row gap-3 justify-end items-center">
            <img src="/nyff.jpeg" alt="nyff logo" className="w-24" />
            <img
              src="/leap-africa.png"
              alt="leap africa logo"
              className="w-24"
            />
            <img
              src="/readytoleadafrica.jpeg"
              alt="readytoleadafrica logo"
              className="w-24"
            />
          </div>
        </div>

        {children}
      </div>
      {/* </body> */}
    </div>
  );
}
