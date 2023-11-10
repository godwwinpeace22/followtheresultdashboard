import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createReport } from "./server-actions";
import Completed from "./completed";
import { supabase } from "@/lib/superbase";

type Inputs = {
  arrival_time: string;
  collation_center_name: string;
  collation_center_location: string;
  collation_center_code: string;
  inec_staff_arrival_time: string;
  permitted_to_observe: string;
  inec_staff_count: string;
  women_inec_staff_count: string;
  security_officials_count: string;
  party_agents_count: string;
  easy_access_to_collation_center: string;
  many_young_people: string;
  open_vote_buying: string;

  process_1: string;
  process_2: string;
  process_3: string;
  process_4: string;
  process_5: string;
  process_6: string;
  process_7: string;
  process_8: string;

  A: string;
  AA: string;
  AAC: string;
  ADC: string;
  ADP: string;
  APC: string;
  APGA: string;
  APM: string;
  APP: string;
  BP: string;
  LP: string;
  NNPP: string;
  NRM: string;
  PDP: string;
  PRP: string;
  SDP: string;
  YPP: string;
  ZLP: string;

  violence_1: string;
  violence_2: string;
  violence_3: string;
  violence_4: string;
  violence_5: string;
  violence_6: string;
  violence_7: string;
  violence_8: string;
};

export default function PolingUnitForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submitReport = (data: Inputs) => {
    if (loading) return;

    setLoading(true);

    const name = localStorage.getItem("name");
    const state = localStorage.getItem("state");
    const lga = localStorage.getItem("lga");
    const lat = localStorage.getItem("lat");
    const lon = localStorage.getItem("lon");

    supabase
      .from("collations")
      .insert({
        name: name || "",
        data: JSON.stringify(data),
        level: "polling_unit",
        state: state || "",
        lga: lga || "",
        date: new Date().toDateString(),
        lat: lat || "0",
        lon: lon || "0",
      })
      .then((res) => {
        if (res.error) {
          alert("An error occured. Please try again later");
        } else {
          setDone(true);
          // setLoading(false)
        }
      });

    // createReport({
    //   name: name || "",
    //   data: JSON.stringify(data),
    //   level: "polling_unit",
    //   state: state || "",
    //   lga: lga || "",
    //   date: new Date().toDateString(),
    //   lat: lat || "0",
    //   lon: lon || "0",
    // })
    //   .then((res) => {
    //     if (res.error) {
    //       alert("An error occured. Please try again later");
    //     } else {
    //       setDone(true);
    //       // setLoading(false)
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => submitReport(data);

  const RadioButtonGroup = ({
    name,
    options,
  }: {
    name: keyof Inputs;
    options: { label: string; value: string }[];
  }) => {
    return (
      <div className="flex gap-x-6">
        {options.map((option: any) => (
          <div className="flex">
            <input
              type="radio"
              className="shrink-0 mt-0.5 border-gray-200 rounded-full text-[#063360] focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-[#063360] dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              value={option.value}
              {...register(name, {
                required: true,
              })}
            />

            <label
              htmlFor="hs-radio-group-1"
              className="text-sm text-gray-500 ml-2 dark:text-gray-400"
            >
              {option.label}
            </label>
          </div>
        ))}
        {errors[name] && (
          <small className="text-red-500">This field is required</small>
        )}
      </div>
    );
  };

  return (
    <form
      className="flex flex-col w-full max-w-xl pt-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      {done ? (
        <Completed />
      ) : (
        <div className="hs-accordion-group">
          <div
            className="hs-accordion active bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700"
            id="hs-bordered-heading-one"
          >
            <button
              className="hs-accordion-toggle hs-accordion-active:text-[#063360] inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition py-4 px-5 hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-collapse-one"
            >
              <div>
                <svg
                  className="hs-accordion-active:hidden hs-accordion-active:text-[#063360] hs-accordion-active:group-hover:text-[#063360] block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
                <svg
                  className="hs-accordion-active:block hs-accordion-active:text-[#063360] hs-accordion-active:group-hover:text-[#063360] hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              Arrival
            </button>
            <div
              id="hs-basic-collapse-one"
              className="hs-accordion-content px-5 w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-heading-one"
            >
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  What is the name of the polling unit?
                </label>
                <input
                  type="text"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("collation_center_name", { required: true })}
                />
                {errors.collation_center_name && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  What is the location of the polling unit where you are voting?
                </label>
                <input
                  type="text"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("collation_center_location", { required: true })}
                />
                {errors.collation_center_location && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  What is the code or polling unit number?
                </label>
                <input
                  type="text"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("collation_center_code", { required: true })}
                />
                {errors.collation_center_code && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div className="mb-10 w-full">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  What time did you arrive the polling unit?
                </label>
                <input
                  type="time"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("arrival_time", { required: true })}
                />
                {errors.arrival_time && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  What time did the INEC ad-hoc staff arrive at the polling
                  unit?
                </label>
                <input
                  type="time"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("inec_staff_arrival_time", { required: true })}
                />
                {errors.inec_staff_arrival_time && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Were you permitted to observe?
                </label>

                <RadioButtonGroup
                  name="permitted_to_observe"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  How many INEC staff were present?
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("inec_staff_count", { required: true })}
                />
                {errors.inec_staff_count && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  How many women were ad-hoc or polling unit staff?
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("women_inec_staff_count", { required: true })}
                />
                {errors.women_inec_staff_count && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  How many security officials were at the polling unit?
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("security_officials_count", { required: true })}
                />
                {errors.security_officials_count && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  How many party agents were at the polling unit?
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("party_agents_count", { required: true })}
                />
                {errors.party_agents_count && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Was the access to the polling unit easy for PWDs?
                </label>
                <div className="flex gap-x-6">
                  <RadioButtonGroup
                    name="easy_access_to_collation_center"
                    options={[
                      { value: "on", label: "Yes" },
                      { value: "off", label: "No" },
                    ]}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Was there a lot of young people aged between the ages of 18-35
                  at the polling unit?
                </label>
                <div className="">
                  <RadioButtonGroup
                    name="many_young_people"
                    options={[
                      { value: "on", label: "Yes" },
                      { value: "off", label: "No" },
                    ]}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Was there incidence of open vote buying either near or at the
                  polling unit where you were assigned?
                </label>
                <RadioButtonGroup
                  name="open_vote_buying"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div
            className="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700"
            id="hs-basic-heading-two"
          >
            <button
              className="hs-accordion-toggle hs-accordion-active:text-[#063360] inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition py-4 px-5 hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-collapse-two"
            >
              <svg
                className="hs-accordion-active:hidden hs-accordion-active:text-[#063360] hs-accordion-active:group-hover:text-[#063360] block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="hs-accordion-active:block hs-accordion-active:text-[#063360] hs-accordion-active:group-hover:text-[#063360] hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
              Process Setup Checklist
            </button>
            <div
              id="hs-basic-collapse-two"
              className="hs-accordion-content px-5 hidden w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-heading-two"
            >
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the INEC Presiding Officer (PO) take delivery of all the
                  original copies of Forms EC8A from the Polling unit together
                  with other materials and reports relating to the election,
                  including Form EC8B?
                </label>
                <RadioButtonGroup
                  name="process_1"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the Presiding Officer (PO) entered the results for the
                  Governorship election by entering the votes scored by each
                  Political Party in the original copy of Forms EC8C in figures
                  and words?
                </label>
                <RadioButtonGroup
                  name="process_2"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the Presiding Officer (PO) cross-check the totals and
                  entries in the form EC8C with the Collation Support and Result
                  Verification System (CSRVS) Secretariat?
                </label>
                <RadioButtonGroup
                  name="process_3"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the Presiding Officer (PO) announce loudly the votes
                  scored by each Political Party?
                </label>
                <RadioButtonGroup
                  name="process_4"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the Presiding Officer (PO) sign, date and stamp the forms
                  and request the polling agents to countersign?
                </label>
                <RadioButtonGroup
                  name="process_5"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the Presiding Officer (PO) distribute copies of the forms
                  to the polling agents and the Police?
                </label>
                <RadioButtonGroup
                  name="process_6"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the Presiding Officer (PO) electronically transmit or
                  transfer the result directly to the IREV Portal as prescribed
                  by the Commission?
                </label>
                <RadioButtonGroup
                  name="process_7"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the Presiding Officer (PO) paste the results in an open
                  place for public review?
                </label>
                <RadioButtonGroup
                  name="process_8"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div
            className="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700"
            id="hs-basic-heading-three"
          >
            <button
              className="hs-accordion-toggle hs-accordion-active:text-[#063360] inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition py-4 px-5 hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-collapse-three"
            >
              <svg
                className="hs-accordion-active:hidden hs-accordion-active:text-[#063360] hs-accordion-active:group-hover:text-[#063360] block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="hs-accordion-active:block hs-accordion-active:text-[#063360] hs-accordion-active:group-hover:text-[#063360] hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
              Result checklist
            </button>
            <div
              id="hs-basic-collapse-three"
              className="hs-accordion-content hidden px-5 w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-heading-three"
            >
              <h2 className="mb-10 text-gray-500">Enter party results</h2>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  A
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("A", { required: true })}
                />
                {errors.A && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  AA
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("AA", { required: true })}
                />
                {errors.AA && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  AAC
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("AAC", { required: true })}
                />
                {errors.AAC && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  ADC
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("ADC", { required: true })}
                />
                {errors.ADC && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  ADP
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("ADP", { required: true })}
                />
                {errors.ADP && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  APC
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("APC", { required: true })}
                />
                {errors.APC && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  APGA
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("APGA", { required: true })}
                />
                {errors.APGA && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  APM
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("APM", { required: true })}
                />
                {errors.APM && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  APP
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("APP", { required: true })}
                />
                {errors.APP && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  BP
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("BP", { required: true })}
                />
                {errors.BP && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  LP
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("LP", { required: true })}
                />
                {errors.LP && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  NNPP
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("NNPP", { required: true })}
                />
                {errors.NNPP && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  NRM
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("NRM", { required: true })}
                />
                {errors.NRM && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  PDP
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("PDP", { required: true })}
                />
                {errors.PDP && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  PRP
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("PRP", { required: true })}
                />
                {errors.PRP && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  SDP
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("SDP", { required: true })}
                />
                {errors.SDP && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  YPP
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("YPP", { required: true })}
                />
                {errors.YPP && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  ZLP
                </label>
                <input
                  type="number"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("ZLP", { required: true })}
                />
                {errors.ZLP && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
            </div>
          </div>

          <div
            className="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700"
            id="hs-basic-heading-three"
          >
            <button
              className="hs-accordion-toggle hs-accordion-active:text-[#063360] inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition py-4 px-5 hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-collapse-three"
            >
              <svg
                className="hs-accordion-active:hidden hs-accordion-active:text-[#063360] hs-accordion-active:group-hover:text-[#063360] block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
              <svg
                className="hs-accordion-active:block hs-accordion-active:text-[#063360] hs-accordion-active:group-hover:text-[#063360] hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
              Voilence Tracking
            </button>
            <div
              id="hs-basic-collapse-three"
              className="hs-accordion-content hidden px-5 w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-heading-three"
            >
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Was there any occurrence of intimidation by political party
                  supporters at the polling unit where you observed?
                </label>
                <RadioButtonGroup
                  name="violence_1"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  If yes, which party supporters carried out such acts?
                </label>

                <input
                  type="text"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("violence_2", { required: true })}
                />
                {errors.violence_2 && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Was there any issue of election related violence at the
                  polling unit?
                </label>
                <RadioButtonGroup
                  name="violence_3"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  If yes, why did it happen?
                </label>
                <input
                  type="text"
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("violence_4", { required: true })}
                />
                {errors.violence_4 && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the Police and security agencies step in to stop the
                  violence erupting?
                </label>
                <RadioButtonGroup
                  name="violence_5"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Was there any issue of election related violence after the
                  election
                </label>
                <RadioButtonGroup
                  name="violence_6"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Were there any casualties?
                </label>
                <RadioButtonGroup
                  name="violence_7"
                  options={[
                    { value: "on", label: "Yes" },
                    { value: "off", label: "No" },
                  ]}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  If yes, how many number of casualties did you record or count?
                </label>
                <input
                  type="number"
                  min={0}
                  id="input-label"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  placeholder=""
                  {...register("violence_8", { required: true })}
                />
                {errors.violence_8 && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>

              <div className="flex justify-center items-center mt-20 mb-10">
                <button
                  type="submit"
                  className="mx-auto w-60 self-center py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-[#063360] text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  {loading && (
                    <div>
                      <span className="sr-only">Loading...</span>
                      <span
                        className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                        role="status"
                        aria-label="loading"
                      >
                        <span className="sr-only">Loading...</span>
                      </span>
                    </div>
                  )}
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
