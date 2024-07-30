"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { StatesAndLGA } from "@/lib/states-and-lga";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { set, uniqBy } from "lodash";
import { supabase } from "@/lib/superbase";
import HeaderTabs from "@/components/HeaderTabs";
import StatBoxes from "@/components/StatBoxes";
import { calcData } from "@/lib/helpers";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Page() {
  const [currStat, setCurrStat] = useState("stat1");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [newData, setNewData] = useState<any>({});
  const [chartData, setChartData] = useState<any>({
    options: {},
    data: {
      labels: [],
      datasets: [],
    },
  });
  const [coordinates, setCoordinates] = useState<any[]>([]);

  const lgas = useMemo(() => {
    return StatesAndLGA.find((s) => s.state === state)?.lgas;
  }, [state]);

  const Map = React.useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>loading...</p>,
        ssr: false,
      }),
    []
  );

  function setChartAndMapData({
    value,
    offColor,
    onColor,
  }: {
    value: string;
    onColor: string;
    offColor: string;
  }) {
    const { coord, chartData } = calcData({
      value: value,
      onColor: onColor,
      offColor: offColor,
      data,
      state,
      lga,
      level: "lga",
    });

    setChartData(chartData);
    setCoordinates(coord);
  }

  function calChartData() {
    if (currStat === "stat1") {
      setChartAndMapData({
        value: "process_7",
        onColor: "green",
        offColor: "red",
      });
    }

    if (currStat === "stat2") {
      setChartAndMapData({
        value: "process_4",
        onColor: "green",
        offColor: "red",
      });
    }

    if (currStat === "stat3") {
      setChartAndMapData({
        value: "process_8",
        onColor: "green",
        offColor: "red",
      });
    }

    if (currStat === "stat4") {
      setChartAndMapData({
        value: "process_3",
        onColor: "green",
        offColor: "red",
      });
    }
  }

  async function fetchData() {
    const { data, error } = await supabase.from("collations").select();

    if (data) {
      setData(data);
    }
  }

  useEffect(() => {
    if (data?.length) {
      setData([...data?.filter((d) => d.id != newData?.id), newData]);
    }
  }, [newData]);

  useEffect(() => {
    if (data?.length > 0) {
      calChartData();
    }
  }, [data, state, lga, currStat]);

  useEffect(() => {
    fetchData();

    async function listener() {
      const channels = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "collations" },
          (payload) => {
            // console.log("Change received!", payload);
            setNewData(payload.new);
          }
        )
        .subscribe();
    }

    listener();
  }, []);

  return (
    <div className="">
      <div className="grid gap-4 grid-cols-2 mt-5">
        <div className=" flex-1 borde">
          <HeaderTabs active="process" bg="bg-[#fa9716]" />

          <div className="grid gap-4 grid-cols-3 mt-5 border border-[#063360] px-2 py-2 rounded-md">
            <div className="flex flex-col">
              <label
                htmlFor="input-label"
                className="block text-xs font-medium mb-2 dark:text-white text-gray-500"
              >
                Geopolitical Zone
              </label>
              <select className="py-1 px-3 pe-9 block w-full border-gray-100 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
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
                className="py-1 px-3 pe-9 block w-full border-gray-100 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
                className="py-1 px-3 pe-9 block w-full border-gray-100 rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <option value="">Select</option>
                {lgas?.map((lga) => (
                  <option key={lga}>{lga}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-1 grid-cols-2 mt-5 border border-[#063360] px-2 py-2 rounded-md">
            <span
              className={`text-xs cursor-pointer ${
                currStat == "stat1" ? "text-[#604606]" : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("stat1")}
            >
              Electronic transmission to IREV Portal
            </span>
            <span
              className={`text-xs cursor-pointer ${
                currStat === "stat2" ? "text-[#604606]" : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("stat2")}
            >
              Inec staff announce loudly the votes scored
            </span>
            <span
              className={`text-xs cursor-pointer ${
                currStat === "stat3" ? "text-[#604606]" : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("stat3")}
            >
              Inec staff paste the results in an open place for public review
            </span>
            <span
              className={`text-xs cursor-pointer ${
                currStat === "stat4" ? "text-[#604606]" : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("stat4")}
            >
              INEC staff cross-check the totals and entries in the form EC60H
            </span>
          </div>

          <div className="grid gap-5 grid-cols-[1fr_2fr] mt-5 borde">
            <StatBoxes state={state} lga={lga} data={data} />
            <div
              className="border flex-1 py-2 flex flex-col pt-1 border-[#063360] rounded-md shadow-md"
              style={{ height: 280 }}
            >
              {/* <p className="text-center text-xs">Charts</p> */}

              <Pie options={chartData.options} data={chartData.data} />
            </div>
          </div>
        </div>
        <div
          className="flex-1 rounded-md border-t-8 border-b-2 border-x-4 border-[#063360]"
          // style={{ height: 602 }}
        >
          <p className="bg-[#063360] px-4 text-white text-xs pb-1">
            {currStat == "stat1" && "Electronic transmission to IREV Portal"}
            {currStat == "stat2" &&
              "Inec staff announce loudly the votes scored"}
            {currStat == "stat3" &&
              "Inec staff paste the results in an open place for public review"}
            {currStat == "stat4" &&
              "INEC staff cross-check the totals and entries in the form EC60H"}
          </p>

          <Map data={coordinates} />
        </div>
      </div>
    </div>
  );
}
