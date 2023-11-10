"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { statesGeoJson } from "@/components/nigerian-states";
import { StatesAndLGA } from "@/lib/states-and-lga";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { uniqBy } from "lodash";
import { supabase } from "@/lib/superbase";
import HeaderTabs from "@/components/HeaderTabs";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Page() {
  const [state, setState] = useState("Kogi");
  const [lga, setLga] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [newData, setNewData] = useState<any>({});

  const [allResults, setAllResults] = useState<{ [p: string]: number }>({});

  const lgas = useMemo(() => {
    return StatesAndLGA.find((s) => s.state === state)?.lgas;
  }, [state]);

  function formatPoliticalParties(
    politicalParties: string[],
    d: any
  ): { [partyName: string]: number } {
    const m = JSON.parse(d.data);
    const formattedParties: { [partyName: string]: number } = {};
    for (const party of politicalParties) {
      //   console.log({ party }, m[party]);
      formattedParties[party] = Number(m[party]);
    }
    return formattedParties;
  }

  const politicalParties: string[] = [
    "A",
    "AA",
    "AAC",
    "ADC",
    "ADP",
    "APC",
    "APGA",
    "APM",
    "APP",
    "BP",
    "LP",
    "NNPP",
    "NRM",
    "PDP",
    "PRP",
    "SDP",
    "YPP",
    "ZLP",
  ];

  type ElectionResult = {
    [partyName: string]: number;
  };

  function aggregateElectionResults(
    electionResults: ElectionResult[]
  ): ElectionResult {
    const aggregatedResults: ElectionResult = {};
    for (const result of electionResults) {
      for (const [partyName, votes] of Object.entries(result)) {
        if (!aggregatedResults[partyName]) {
          aggregatedResults[partyName] = 0;
        }
        aggregatedResults[partyName] += votes;
      }
    }
    return aggregatedResults;
  }

  function calResult() {
    const electionResult = data
      ?.filter(
        (d) =>
          d.level == "lga" &&
          (!!state ? d.state == state : true) &&
          (!!lga ? d.lga == lga : true)
      )
      .map((d) => formatPoliticalParties(politicalParties, d));

    const aggregate = aggregateElectionResults(electionResult);
    setAllResults(aggregate);
    // console.log({ aggregate, electionResult });
  }

  async function fetchData() {
    const { data, error } = await supabase.from("collations").select();

    if (data) {
      setData(data);
    }
  }

  useEffect(() => {
    if (data?.length) {
      setData([...data, newData]);
    }
  }, [newData]);

  useEffect(() => {
    if (data?.length > 0) {
      calResult();
    }
  }, [data, state, lga]);

  useEffect(() => {
    fetchData();

    async function listener() {
      const channels = supabase
        .channel("custom-insert-channel")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "collations" },
          (payload) => {
            console.log("Change received!", payload.new);
            // setData([...data, payload?.new]);
            setNewData(payload.new);
          }
        )
        .subscribe();
    }

    listener();
  }, []);

  return (
    <div className="">
      <div className="grid gap-4 grid-cols-1 mt-5">
        <div className=" py-2 borde">
          <HeaderTabs active="result" bg="bg-[green]" />

          <div className="grid gap-4 grid-cols-3 mt-5 border border-[#063360] px-2 py-2 rounded-md">
            <div className="flex flex-col">
              <label
                htmlFor="input-label"
                className="block text-xs font-medium mb-2 dark:text-white text-gray-500"
              >
                Geopolitical Zone
              </label>
              <select className="py-1 px-3 pe-9 block w-full border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                <option selected>Select</option>
              </select>
            </div>
            <div className="flex flex-col ">
              <label
                htmlFor="input-label"
                className="block text-xs font-medium mb-2 dark:text-white text-gray-500"
              >
                State
              </label>
              <select
                onChange={(e) => setState(e.currentTarget?.value)}
                className="py-1 px-3 pe-9 block w-full border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                defaultValue={"Kogi"}
              >
                <option value="">Select</option>
                <option value={"Kogi"}>Kogi</option>
                <option value={"Imo"}>Imo</option>
                <option value={"Bayelsa"}>Bayelsa</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="input-label"
                className="block text-xs font-medium mb-2 text-gray-500 dark:text-white"
              >
                L.G.A
              </label>
              <select
                onChange={(e) => setLga(e.currentTarget?.value)}
                className="py-1 px-3 pe-9 block w-full border-gray-200 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <option value="">Select</option>
                {lgas?.map((lga) => (
                  <option key={lga}>{lga}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          Party
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400"
                        >
                          SCORE
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {Object.keys(allResults)?.map((item) => (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            {item}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            {allResults[item]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className="rounded-md border-t-8 border-b-2 border-x-4 border-[#063360]"
          style={{ height: 500 }}
        >
          <p className="bg-[#063360] px-4 text-white text-xs pb-1">
            Opening time of polling units
          </p>

          <Map data={coordinates} />
        </div> */}
      </div>
    </div>
  );
}
