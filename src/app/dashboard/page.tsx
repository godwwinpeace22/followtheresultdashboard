"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { StatesAndLGA } from "@/lib/states-and-lga";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { uniqBy } from "lodash";
import { supabase } from "@/lib/superbase";
import HeaderTabs from "@/components/HeaderTabs";
import StatBoxes from "@/components/StatBoxes";
import { calcData } from "@/lib/helpers";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Page() {
  // const [currTab, setCurrTab] = useState("home");
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

  // Function to plot a bar chart
  function plotBarChart(times: string[]): {
    counts: number[];
    labels: string[];
    percentages: string[];
  } {
    // Create an array to store the counts for each time interval
    const counts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Count the occurrences of each time interval
    times.forEach((time) => {
      const hour = parseInt(time?.split(":")[0], 10);

      if (hour >= 7 && hour < 8) counts[0]++;
      else if (hour >= 8 && hour < 9) counts[1]++;
      else if (hour >= 9 && hour < 10) counts[2]++;
      else if (hour >= 10 && hour < 11) counts[3]++;
      else if (hour >= 11 && hour < 12) counts[4]++;
      else if (hour >= 12 && hour < 13) counts[5]++;
      else if (hour >= 13 && hour < 14) counts[6]++;
      else if (hour >= 14 && hour < 15) counts[7]++;
      else if (hour >= 15 && hour < 16) counts[8]++;
      else if (hour >= 16 && hour <= 17) counts[9]++;
      else counts[10]++;
      // Add more conditions for additional time intervals as needed
    });

    // Calculate the total count
    const totalCount = counts.reduce((acc, count) => acc + count, 0);

    // Calculate percentages
    const percentages = counts.map((count) =>
      ((count / totalCount) * 100).toFixed(1)
    );

    // Create labels for the chart
    const labels: string[] = [
      "7-8am",
      "8-9am",
      "9-10am",
      "10-11am",
      "11am-12pm",
      "12-1pm",
      "1-2pm",
      "2-3pm",
      "3-4pm",
      "4-5pm",
      "no show",
    ]; // Add more labels as needed

    return { counts, labels, percentages };
  }

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
      level: "polling_unit",
    });

    setChartData(chartData);
    setCoordinates(coord);
  }

  function calcBarChartData({
    positiveText,
    negativeText,
    label,
    value,
    swapColors,
    level,
  }: {
    positiveText: string;
    negativeText: string;
    label: string;
    value: string;
    swapColors?: boolean;
    level: string;
  }) {
    const parsed = data
      ?.filter(
        (d) =>
          d.level === level &&
          (!!state ? d.state == state : true) &&
          (!!lga ? d.lga == lga : true)
      )
      // ?.filter((d) => d.level === level)
      .map((d) => ({ ...d, data: JSON.parse(d.data) }));

    const bg = [
      "rgba(54, 235, 163, 0.2)",
      "rgba(54, 235, 163, 0.2)",
      "rgba(54, 235, 163, 0.2)",
      "rgba(255, 99, 132, 0.2)",
    ];

    const borderColors = [
      "#36ebb5",
      "#36ebb5",
      "#36ebb5",
      "rgba(255, 99, 132, 1)",
    ];

    // Define colors for different time intervals
    const colors = {
      morning: {
        background: "rgba(0, 128, 0, 0.8)", // Green
        border: "rgba(0, 128, 0, 1)",
      },
      afternoon: {
        background: "rgba(255, 165, 0, 0.8)", // Orange
        border: "rgba(255, 165, 0, 1)",
      },
      evening: {
        background: "rgba(255, 0, 0, 0.8)", // Red
        border: "rgba(255, 0, 0, 1)",
      },
    };

    const times: string[] = parsed.map((p) => p.data[value]);
    const { counts, labels, percentages } = plotBarChart(times);
    // console.log({ times, parsed });

    const datasetColors = labels.map((label) => {
      const timeRange = label.split("-")[0].trim(); // Extract the start time
      const hour = parseInt(timeRange.split(":")[0], 10);

      if (hour >= 7 && hour < 10) {
        return colors.morning;
      } else if (hour >= 10 && hour < 14) {
        return colors.afternoon;
      } else {
        return colors.evening;
      }
    });
    // console.log({ times, counts, percentages });

    setChartData({
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: percentages,
            backgroundColor: datasetColors.map((color) => color.background),
            borderColor: datasetColors.map((color) => color.border),
            borderWidth: 1,
          },
        ],
      },
      options: {
        // responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value: any) {
                return value + "%";
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const label = context.dataset.label || "";
                const value = (context.parsed.y || 0)?.toFixed(1) + "%";
                return `${label}: ${value}`;
              },
            },
          },
        },
        // maintainAspectRatio: false, // Allow the chart to scale to the specified height
        responsive: true,
        height: 300,
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
      calcBarChartData({
        positiveText: "Yes",
        negativeText: "No",
        label: "Collation center opening time",
        value: "inec_staff_arrival_time",
        level: "lga",
      });
    }

    if (currStat === "stat2") {
      calcBarChartData({
        positiveText: "Yes",
        negativeText: "No",
        label: "Polling unit opening time",
        value: "inec_staff_arrival_time",
        swapColors: true,
        level: "polling_unit",
      });
    }

    if (currStat === "stat3") {
      setChartAndMapData({
        // positiveText: "Yes",
        // negativeText: "No",
        // label: "Vote buying observed",
        value: "open_vote_buying",
        onColor: "red",
        offColor: "green",
      });
    }
    if (currStat == "stat4") {
      setChartAndMapData({
        // positiveText: "Yes",
        // negativeText: "No",
        // label: "Electronic transmission of result",
        value: "process_7",
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
      setData([...data.filter((d) => d.id != newData.id), newData]);
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

    // return () => {
    //   channels.unsubscribe();
    // };
  }, []);

  return (
    <div className="">
      <div className="grid gap-4 grid-cols-2 mt-5">
        <div className="flex-1 borde">
          <HeaderTabs active="" />
          <div className="grid gap-4 grid-cols-3 mt-3 border border-[#063360] px-2 py-2 rounded-md">
            <div className="flex flex-col">
              <label
                htmlFor="input-label"
                className="block text-xs font-medium mb-2 dark:text-white text-gray-500"
              >
                Geopolitical Zone
              </label>
              <select className="py-1 px-3 pe-9 block w-full border-gray-100 rounded-sm text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
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
                className="py-1 px-3 pe-9 block w-full border-gray-100 rounded-sm text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
                className="py-1 px-3 pe-9 block w-full border-gray-100 rounded-sm text-xs focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
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
              Collation center opening time
            </span>
            <span
              className={`text-xs cursor-pointer ${
                currStat == "stat2" ? "text-[#604606]" : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("stat2")}
            >
              Polling unit opening time
            </span>
            <span
              className={`text-xs cursor-pointer ${
                currStat === "stat3" ? "text-[#604606]" : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("stat3")}
            >
              Vote buying observed
            </span>
            {/* <span
              className={`text-xs cursor-pointer ${
                currStat === "stat3" ? "text-[#604606]" : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("stat3")}
            >
              BVAS timing to accredit
            </span> */}
            <span
              className={`text-xs cursor-pointer ${
                currStat === "stat4" ? "text-[#604606]" : "text-[#063360]"
              }`}
              onClick={() => setCurrStat("stat4")}
            >
              Electronically transmit result
            </span>
          </div>

          <div className="grid gap-5 grid-cols-[1fr_2fr] mt-5 borde">
            <StatBoxes state={state} lga={lga} data={data} />
            <div
              className="border flex-1 justify-end flex flex-col pt-1 border-[#063360] rounded-md shadow-md"
              // style={{ height: 300 }}
            >
              {currStat === "stat1" || currStat === "stat2" ? (
                // <Bar options={chartData.options} data={chartData.data} />
                chartData?.data?.datasets?.[0]?.data && (
                  <Chart
                    series={[
                      {
                        name: "",
                        data: chartData?.data?.datasets?.[0]?.data,
                      },
                    ]}
                    options={{
                      chart: {
                        id: "basic-bar",
                        type: "bar",
                        height: 350,
                      },

                      plotOptions: {
                        bar: {
                          horizontal: false,
                          columnWidth: 20, // You can also control the width using columnWidth
                          // barWidth: 20, // Set the width of the bars in pixels
                        },
                      },
                      dataLabels: {
                        enabled: true,
                        // formatter: function (val) {
                        //   return val + "%"; // Add '%' as a suffix
                        // },
                        style: {
                          fontSize: "8px", // Set the font size of the data labels
                        },
                      },
                      xaxis: {
                        categories: chartData?.data?.labels,
                      },
                      colors: [
                        function ({
                          value,
                          seriesIndex,
                          dataPointIndex,
                          w,
                        }: any) {
                          if (dataPointIndex <= 3) {
                            return "#0fe665";
                          } else if (dataPointIndex <= 6) {
                            return "#d9a90d";
                          } else {
                            return "#ea1109";
                          }
                        },
                      ],
                    }}
                    type="bar"
                  />
                )
              ) : (
                <Pie data={chartData.data} />
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-md border-t-8 border-b-2 border-x-4 border-[#063360]">
          <p className="bg-[#063360] px-4 text-white text-xs pb-1">
            {currStat == "stat1" && "Collation center opening time"}
            {currStat == "stat2" && "Polling unit opening time"}
            {currStat == "stat3" && "Vote buying observed"}
            {currStat == "stat4" && "Electronic transmission of results"}
          </p>

          <Map data={coordinates} />
        </div>
      </div>
    </div>
  );
}
