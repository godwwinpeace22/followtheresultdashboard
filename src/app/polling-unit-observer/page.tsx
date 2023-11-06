"use client";

import PolingUnitForm from "@/components/polling-unit-form";
import { useState, useEffect } from "react";
import Common from "@/components/common";

export default function Page() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-10 lg:shadow-md">
      <Common />
      <div className="flex justify-center items-center mb-20">
        <img src="/followtheresultlogo.png" alt="" style={{ width: 200 }} />
        {/* <span>#FollowTheResult</span> */}C
      </div>
      <h1
        className="text-center text-lg mb-5 font-bold"
        style={{ fontSize: 25 }}
      >
        Polling Unit Observer Form
      </h1>
      <p className="text-center text-gray-500">
        This form is to aid election observers and monitors send in their <br />
        observation on the election day across all LGAs
      </p>

      {!showForm && (
        <>
          <div className="flex justify-center items-center mt-20">
            <button
              type="button"
              className="mx-auto w-60 self-center py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              onClick={() => setShowForm(true)}
            >
              Get Started
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center mt-20 gap-10">
            <img
              src="nyff.jpeg"
              alt="Nigeria Youth Futures Fund logo"
              width={100}
            />
            <img
              src="leap-africa-logo.jpeg"
              alt="Leap Africa logo"
              width={100}
            />
            <img
              src="readytoleadafrica.jpeg"
              alt="ReadyToLeadAfrica logo"
              width={100}
            />
          </div>
        </>
      )}

      {showForm && (
        <div className="flex  justify-center items-center">
          <PolingUnitForm />
        </div>
      )}
    </div>
  );
}
