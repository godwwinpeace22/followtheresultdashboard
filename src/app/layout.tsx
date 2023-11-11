import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={inter.className}>{children}</body>

      {/* <script src="./node_modules/lodash/lodash.min.js"></script> */}
      {/* <script src="./node_modules/apexcharts/dist/apexcharts.min.js"></script> */}
      {/* <script src="https://preline.co/assets/js/hs-apexcharts-helpers.js"></script> */}
    </html>
  );
}
