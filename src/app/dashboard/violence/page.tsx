"use client";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { StatesAndLGA } from "@/lib/states-and-lga";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { supabase } from "@/lib/superbase";
import HeaderTabs from "@/components/HeaderTabs";
import StatBoxes from "@/components/StatBoxes";
import { calcData } from "@/lib/helpers";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Page() {
  // const [currTab, setCurrTab] = useState("home");
  const [currStat, setCurrStat] = useState("casualties");
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
    if (currStat === "casualties") {
      setChartAndMapData({
        value: "violence_5",
        onColor: "red",
        offColor: "green",
      });
    }
    if (currStat === "violence_during") {
      setChartAndMapData({
        value: "violence_2",
        onColor: "red",
        offColor: "green",
      });
    }

    if (currStat === "violence_after") {
      setChartAndMapData({
        // positiveText: "No",
        // negativeText: "Yes",
        // label: "Violence after result announcement",
        value: "violence_3",
        onColor: "red",
        offColor: "green",
      });
    }

    if (currStat === "stat4") {
      setChartAndMapData({
        // positiveText: "No",
        // negativeText: "Yes",
        // label: "Violence interrupts collation",
        value: "violence_6",
        onColor: "red",
        offColor: "green",
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
    if (data && data?.length > 0) {
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
          <HeaderTabs active="violence" bg="bg-[#ed143d]" />

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
                <option value={"Edo"}>Edo</option>
                <option value={"Ondo"}>Ondo</option>
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
                currStat == "casualties" ? "text-[#604606]" : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("casualties")}
            >
              Severe injury, loss of life or destruction of electoral materials
            </span>
            <span
              className={`text-xs cursor-pointer ${
                currStat === "violence_during"
                  ? "text-[#604606]"
                  : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("violence_during")}
            >
              Violence during result collation
            </span>
            <span
              className={`text-xs cursor-pointer ${
                currStat === "violence_after"
                  ? "text-[#604606]"
                  : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("violence_after")}
            >
              Violence after result announcement
            </span>
            <span
              className={`text-xs cursor-pointer ${
                currStat === "stat4" ? "text-[#604606]" : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("stat4")}
            >
              Violence interrupts collation or announcement
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
          style={{ height: 602 }}
        >
          <p className="bg-[#063360] px-4 text-white text-xs pb-1">
            {currStat == "casualties" &&
              "Injury, loss of life or destruction of electoral materials"}
            {currStat == "violence_during" && "Violence during collation"}
            {currStat == "violence_after" &&
              "Violence after result announcement"}
            {currStat == "stat4" &&
              "Violence interrupts collation or announcement"}
          </p>

          <Map data={coordinates} />
        </div>
      </div>
    </div>
  );
}
