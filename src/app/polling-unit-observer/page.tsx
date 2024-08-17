"use client";

import PolingUnitForm from "@/components/polling-unit-form";
import { useState, useEffect } from "react";
import Common from "@/components/common";
import Login from "@/components/Login";

export default function Page() {
  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const saveUser = () => {
    setShowForm(true);
    setShowLogin(false);
  };

  useEffect(() => {
    const u = localStorage.getItem("email");

    if (u) {
      setShowForm(true);
    }
    setLoading(false);
  }, []);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-10 ">
      <Common />
      <div className="flex justify-center items-center mb-20">
        <img src="/followtheresultlogo.png" alt="" style={{ width: 200 }} />
        {/* <span>#FollowTheResult</span> */}
      </div>
      <h1
        className="text-center text-lg mb-5 font-bold"
        style={{ fontSize: 25 }}
      >
        Polling Unit Observer
      </h1>
      <p className="text-center text-gray-500">
        This FollowTheResult Tech-Form is to aid Election Observers to send in{" "}
        <br />
        Polling Unit Results on Election day across all polling units to the FTR{" "}
        <br />
        Central Command Center.
      </p>

      {!showForm && !showLogin && (
        <>
          <div className="flex justify-center items-center mt-20">
            {!loading && (
              <button
                type="button"
                className="mx-auto w-60 self-center py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-[#063360] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                onClick={() => setShowLogin(true)}
              >
                Get Started
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center items-center mt-20 gap-10">
            <img
              src="readytoleadafrica.jpeg"
              alt="ReadyToLeadAfrica logo"
              width={100}
            />
          </div>
        </>
      )}

      {showLogin && (
        <div className="flex  justify-center items-center">
          <Login
            login={() => {
              saveUser();
            }}
          />
        </div>
      )}

      {showForm && (
        <div className="flex  justify-center items-center">
          <PolingUnitForm />
        </div>
      )}
    </div>
  );
}
