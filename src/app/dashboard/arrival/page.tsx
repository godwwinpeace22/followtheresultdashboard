"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { StatesAndLGA } from "@/lib/states-and-lga";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { uniqBy } from "lodash";
import { supabase } from "@/lib/superbase";
import HeaderTabs from "@/components/HeaderTabs";
import StatBoxes from "@/components/StatBoxes";

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

  const calcObservers = useCallback(() => {
    const d = data.filter((a) => (state ? a.state === state : true));
    const count = uniqBy(d, "name")?.length;

    return count;
  }, [data, lga, state]);

  const calcLgas = useCallback(() => {
    // const d = data.filter(a => a.state === state);
    return uniqBy(data, "lga")?.length;
  }, [data, lga, state]);

  const calcPollingUnits = useCallback(() => {
    const d = data.filter((a) =>
      !state ? true : a.state === state && a.lga === lga
    );
    return uniqBy(d, "lga")?.length;
  }, [data, lga, state]);

  function calcData({
    positiveText,
    negativeText,
    label,
    value,
  }: {
    positiveText: string;
    negativeText: string;
    label: string;
    value: string;
  }) {
    const parsed = data
      ?.filter(
        (d) =>
          (!!state ? d.state == state : true) && (!!lga ? d.lga == lga : true)
      )
      //   ?.filter((d) => d.lat && d?.lon)
      .map((d) => ({ ...d, data: JSON.parse(d.data) }));

    const yes = parsed.filter((d) => d.data[value] == "on")?.length;
    const no = parsed.filter((d) => d.data[value] == "off")?.length;

    setChartData({
      data: {
        labels: [negativeText, positiveText],
        datasets: [
          {
            label: label,
            data: [no, yes],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 235, 163, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "#36ebb5"],
            borderWidth: 1,
          },
        ],
      },
    });

    setCoordinates([
      ...parsed
        .filter((d) => d.data[value] == "on")
        .map((i) => ({
          lat: i?.lat,
          lon: i?.lon,
          icon: "RedIcon",
          popupText: negativeText,
        })),
      ...parsed
        .filter((d) => d.data[value] == "off")
        .map((i) => ({
          lat: i?.lat,
          lon: i?.lon,
          icon: "BlackIcon",
          popupText: positiveText,
        })),
    ]);
  }

  function calChartData() {
    if (currStat === "stat1") {
      calcData({
        positiveText: "Yes",
        negativeText: "No",
        label: "Permission to observers",
        value: "permitted_to_observe",
      });
    }
    if (currStat === "stat2") {
      calcData({
        positiveText: "Yes",
        negativeText: "No",
        label: "Youth participation",
        value: "many_young_people",
      });
    }

    if (currStat === "stat3") {
      calcData({
        positiveText: "Yes",
        negativeText: "No",
        label: "Easy access to collation center for PWDs",
        value: "easy_access_to_collation_center",
      });
    }
    if (currStat === "stat4") {
      calcData({
        positiveText: "Yes",
        negativeText: "No",
        label: "Open vote buying",
        value: "open_vote_buying",
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
      setData([...data, newData]);
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
      <div className="grid gap-4 grid-cols-2 mt-5">
        <div className="flex-1 borde">
          <HeaderTabs active="arrival" />

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
              Permitted to observe
            </span>
            <span
              className={`text-xs cursor-pointer ${
                currStat === "stat2" ? "text-[#604606]" : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("stat2")}
            >
              Easy access for PWDs
            </span>
            <span
              className={`text-xs cursor-pointer ${
                currStat === "stat3" ? "text-[#604606]" : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("stat3")}
            >
              Youth participation
            </span>
            <span
              className={`text-xs cursor-pointer ${
                currStat === "stat4" ? "text-[#604606]" : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("stat4")}
            >
              Incidence of vote buying
            </span>
          </div>

          <div className="grid gap-5 grid-cols-[1fr_2fr] mt-5 borde">
            <StatBoxes state={state} lga={lga} data={data} />
            <div
              className="border flex-1 py-2 flex flex-col pt-1 border-[#063360] rounded-md shadow-md"
              style={{ height: 280 }}
            >
              <Pie options={chartData.options} data={chartData.data} />
            </div>
          </div>
        </div>

        <div
          className="flex-1 rounded-md border-t-8 border-b-2 border-x-4 border-[#063360]"
          //   style={{ height: 602 }}
        >
          <p className="bg-[#063360] px-4 text-white text-xs pb-1">
            {currStat == "stat1" && "Permitted to observe"}
            {currStat == "stat2" && "Easy access for PWDs"}
            {currStat == "stat3" && "Youth participation"}
            {currStat == "stat4" && "Incidence of vote buying"}
          </p>

          <Map data={coordinates} />
        </div>
      </div>
    </div>
  );
}
