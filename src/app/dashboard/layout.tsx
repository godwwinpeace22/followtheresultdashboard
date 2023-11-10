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
    <html lang="en">
      <head>
        {/* <link
        rel="stylesheet"
        href="./node_modules/apexcharts/dist/apexcharts.css"
      ></link> */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>
        <div className="container max-w-5xl mx-auto pt-10">
          <div className="border px-5 py-2 rounded-md flex flex-row justify-between items-center">
            <img src="/followtheresultlogo.png" alt="logo" className="w-24" />
            <span className=" text-2xl text-[#063360] font-bold">
              #FollowTheResult
            </span>

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
      </body>
    </html>
  );
}
