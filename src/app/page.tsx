"use client";
import Footer from "@/components/footer";
import Component from "@/components/new-page";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState("");

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 lg:pt-10 bg-[0b213f]">
        {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div> */}

        <div className="mb-5">
          <Image
            src="/readytoleadafrica.jpeg"
            alt="ReadyToLeadAfrica logo"
            width={100}
            height={50}
          />
        </div>
        <div className="flex place-items-center">
          <Image
            className=""
            src="/followtheresultlogo.png"
            alt="followtheresult logo"
            width={250}
            height={37}
            priority
          />
        </div>

        <Component />

        {/* <div
        className={`mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 grid-cols-2 gap-x-3 ${
          selected ? "lg:grid-cols-4" : "lg:grid-cols-2"
        } lg:text-left`}
      >
        {selected && (
          <>
            <Link
              href="/state-collation"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                State{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                State Collation
              </p>
            </Link>

            <Link
              href="/lga-collation"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                LGA{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                LGA Collation
              </p>
            </Link>

            <Link
              href="/polling-unit-observer"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Poling Unit{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Poling Unit Collation
              </p>
            </Link>

            <Link
              href="/dashboard"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Dashboard
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Visit dashboard
              </p>
            </Link>
          </>
        )}

        {!selected && (
          <>
            <Link
              href="/dashboard"
              className="group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Project KIB
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Visit project
              </p>
            </Link>

            <Link
              href="https://followtheresult-eo.vercel.app"
              rel="noopener"
              target="_blank"
              className="group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Project EO
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Visit project
              </p>
            </Link>
          </>
        )}
      </div> */}
      </main>

      <Footer />
    </div>
  );
}
