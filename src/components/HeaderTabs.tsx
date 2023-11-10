import Link from "next/link";
import React from "react";

export default function HeaderTabs({
  active,
  bg = "bg-[#063360]",
}: {
  active: string;
  bg?: string;
}) {
  type TabProps = {
    text: string;
    bg?: string;
  };
  const Tab = ({ text, bg: bgc }: TabProps) => {
    return (
      <Link
        href={`/dashboard/${text}`}
        className={` rounded-lg border w-full capitalize ${
          active === text ? `shadow- ${bgc} text-white` : `text-white ${bgc}`
        } justify-center items-center text-center px-8 py-3 cursor-pointer hover:shadow-sm`}
      >
        <span className="text-center text-sm">{text}</span>
      </Link>
    );
  };

  const HomeTab = () => {
    return (
      <Link
        href={`/dashboard`}
        className={`inline-flex gap-3 rounded-lg border capitalize ${"text-gray-500"} justify-center items-center text-center px-8 py-3 cursor-pointer hover:shadow-sm`}
      >
        <svg
          className="flex-shrink-0 w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="text-center text-sm">Home</span>
      </Link>
    );
  };

  const tabs = [
    { text: "arrival", active: false, bg: "bg-[#db851c]" },
    { text: "process", active: false, bg: "bg-[#898a8c]" },
    { text: "violence", active: false, bg: "bg-[#f50707]" },
    { text: "result", active: false, bg: "bg-[#0a952f]" },
  ];

  return (
    <div className="flex flex-row gap-1 items-center justify-between">
      {active ? (
        <>
          <HomeTab />
          <Tab text={active} bg={bg} />
        </>
      ) : (
        tabs.map((tab, i) => <Tab key={i} text={tab.text} bg={tab.bg} />)
      )}
    </div>
  );
}
