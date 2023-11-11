// import { useForm, SubmitHandler } from "react-hook-form";
// import { createReport, createTable } from "./server-actions";
import { useEffect, useState } from "react";
import Completed from "./completed";
import { supabase } from "@/lib/superbase";

type Inputs = {
  arrival_time: string;
  // acreditation_duration: string;
  electronic_transmission: string;
  collation_center_code: string;
  inec_staff_arrival_time: string;
  permitted_to_observe: string;
  inec_staff_count: string;
  women_inec_staff_count: string;
  security_officials_count: string;
  party_agents_count: string;
  easy_access_to_collation_center: string;
  // many_young_people: string;
  // open_vote_buying: string;

  process_1: string;
  process_2: string;
  process_3: string;
  process_4: string;
  process_5: string;
  process_6: string;
  process_7: string;
  process_8: string;
  process_9: string;

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
  //   violence_8: string;
};

export default function LGAForm() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileList | null>();

  const [completedChecklist, setCompletedChecklist] = useState<string[]>([]);

  async function uploadFile(file: any) {
    const filename = new Date().toISOString();
    const { error, data } = await supabase.storage
      .from("uploads")
      .upload(filename, file, {
        upsert: true,
      });

    console.log({ error, data });

    return { error, data };
  }

  const submitReport = async (e: any, checklistName: string) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    const values: any = {};
    formData.forEach((value, key) => {
      values[key] = value;
    });

    // console.log({ values });

    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const state = localStorage.getItem("state");
    const lga = localStorage.getItem("lga");
    const lat = localStorage.getItem("lat");
    const lon = localStorage.getItem("lon");

    const { data, error } = await supabase
      .from("collations")
      .select()
      .eq("email", email!);
    // console.log({ data, error });

    if (data) {
      // upsert
      const uploaded =
        checklistName === "result"
          ? await uploadFile(files?.[0])
          : { data: { path: "" }, error: null };
      const oldData = data?.[data?.length - 1];
      const j = JSON.parse(oldData?.data || "{}");
      const newJsonData = { ...j, ...values };
      // console.log({ data, oldData, j, newJsonData });

      const { data: d, error: err } = await supabase.from("collations").upsert({
        ...oldData,
        name: name || "",
        email: email || "",
        data: JSON.stringify(newJsonData),
        level: "lga",
        state: state || "",
        lga: lga || "",
        date: new Date().toDateString(),
        lat: lat || "0",
        lon: lon || "0",
        uploaded_img: uploaded.data ? uploaded.data.path : "",
      });

      // console.log({ d, err });

      if (error) {
        alert("An error occured");
        setLoading(false);
      } else {
        alert("Submitted successfully");

        localStorage.setItem(checklistName, "1");
        setCompletedChecklist([...completedChecklist, checklistName]);
        setLoading(false);
      }

      if (err) {
      }
    } else {
      console.log({ error });
      // error
      alert("An error occured");
      setLoading(false);
    }
  };

  useEffect(() => {
    const arr: string[] = [];
    const checklist = ["arrival", "process", "result", "violence"];
    checklist.forEach((item) => {
      const a = localStorage.getItem(item);
      if (a) {
        arr.push(item);
      }
    });

    setCompletedChecklist(arr);
  }, []);

  const RadioButtonGroup = ({
    name,
    options,
  }: {
    name: string;
    options: { label: string; value: string }[];
  }) => {
    return (
      <div className="flex gap-x-6">
        {options.map((option: any) => (
          <div className="flex">
            <input
              type="radio"
              name={name}
              className="shrink-0 mt-0.5 border-gray-200 rounded-full text-[#063360] focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-[#063360] dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              value={option.value}
              required
            />

            <label
              htmlFor="hs-radio-group-1"
              className="text-sm text-gray-500 ml-2 dark:text-gray-400"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  };

  const SubmitButton = () => (
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
  );

  return (
    <div className="flex flex-col w-full max-w-xl pt-20">
      {new Set(completedChecklist)?.size === 4 ? (
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
              {completedChecklist?.includes("arrival") ? (
                <div className="flex gap-2 items-center justify-center  mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="green"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 18 21 6l-1.41-1.41z" />
                  </svg>
                  <span className="text-sm text-center">
                    Checklist completed{" "}
                  </span>
                </div>
              ) : (
                <form className="" onSubmit={(e) => submitReport(e, "arrival")}>
                  <div className="mb-10 w-full">
                    <label
                      htmlFor="input-label"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      What time did you arrive the collation center?
                    </label>
                    <input
                      type="time"
                      id="input-label"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder=""
                      required
                      name="arrival_time"
                      // {...register("arrival_time", { required: true })}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="input-label"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      What time did the LGA Collation Officers arrive the LGA
                      Collation Center?
                    </label>
                    <input
                      type="time"
                      id="input-label"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder=""
                      required
                      name="inec_staff_arrival_time"
                      // {...register("inec_staff_arrival_time", { required: true })}
                    />
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
                      How many Collation Officers were present?
                    </label>
                    <input
                      type="number"
                      id="input-label"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder=""
                      required
                      name="inec_staff_count"
                      // {...register("inec_staff_count", { required: true })}
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="input-label"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      How many women were collation officers?
                    </label>
                    <input
                      type="number"
                      id="input-label"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder=""
                      required
                      name="women_inec_staff_count"
                      // {...register("women_inec_staff_count", { required: true })}
                    />
                    {/* {errors.women_inec_staff_count && (
                  <small className="text-red-500">This field is required</small>
                )} */}
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="input-label"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      How many security officials were at the collation center?
                    </label>
                    <input
                      type="number"
                      id="input-label"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder=""
                      required
                      name="security_officials_count"
                      // {...register("security_officials_count", { required: true })}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="input-label"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      How many party agents were at the collation center?
                    </label>
                    <input
                      type="number"
                      id="input-label"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder=""
                      required
                      name="party_agents_count"
                      // {...register("party_agents_count", { required: true })}
                    />
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="input-label"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      Was the access to the collation center easy for PWDs?
                    </label>
                    <RadioButtonGroup
                      name="easy_access_to_collation_center"
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
                      Was the result transmitted electronically to INEC server
                      in your presence?
                    </label>
                    <RadioButtonGroup
                      name="electronic_transmission"
                      options={[
                        { value: "on", label: "Yes" },
                        { value: "off", label: "No" },
                      ]}
                    />
                  </div>

                  <SubmitButton />
                </form>
              )}
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
              {completedChecklist?.includes("process") ? (
                <div className="flex gap-2 items-center justify-center  mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="green"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 18 21 6l-1.41-1.41z" />
                  </svg>
                  <span className="text-sm text-center">
                    Checklist completed{" "}
                  </span>
                </div>
              ) : (
                <form className="" onSubmit={(e) => submitReport(e, "process")}>
                  <div className="mb-5">
                    <label
                      htmlFor="input-label"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      Did the LGA/AC Collation Officer take delivery of all the
                      original copies of Forms EC8B from the Registration
                      Area/Ward Collation officers together with other materials
                      and reports relating to the election, including Form
                      EC60(H)
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
                      Did the LGA/AC Collation Officer collate the results for
                      the Governorship election by entering the votes scored by
                      each Political Party in the original copy of Forms EC8B
                      into Form EC8C in figures and words?
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
                      Did the LGA/AC Collation Officer cross-check the totals
                      and entries in the EC8C with the Collation Support and
                      Result Verification System (CSRVS) Secretariat?
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
                      Did the LGA/AC Collation Officer announce loudly the votes
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
                      Did the LGA/AC Collation Officer sign, date and stamp the
                      forms and request the collation center agents to
                      countersign?
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
                      Did the LGA/AC Collation Officer hand over the Electoral
                      Operations copy (top copy) of Form EC8C to the INEC LGA
                      Supervisor?
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
                      Did the LGA/AC Collation Officer distribute copies of the
                      forms to the collation center agents and the Police?
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
                      Did the LGA/AC Collation Officer electronically transmit
                      or transfer the result directly to the next level of
                      collation, as prescribed by the Commission?
                    </label>
                    <RadioButtonGroup
                      name="process_8"
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
                      Did the LGA/AC Collation Officer paste the results in an
                      open place for public review?
                    </label>
                    <RadioButtonGroup
                      name="process_9"
                      options={[
                        { value: "on", label: "Yes" },
                        { value: "off", label: "No" },
                      ]}
                    />
                  </div>

                  <SubmitButton />
                </form>
              )}
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
              {completedChecklist?.includes("result") ? (
                <div className="flex gap-2 items-center justify-center  mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="green"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 18 21 6l-1.41-1.41z" />
                  </svg>
                  <span className="text-sm text-center">
                    Checklist completed{" "}
                  </span>
                </div>
              ) : (
                <form onSubmit={(e) => submitReport(e, "result")}>
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
                      required
                      name="A"
                      // {...register("A", { required: true })}
                    />
                    {/* {errors.A && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      name="AA"
                      required
                      // {...register("AA", { required: true })}
                    />
                    {/* {errors.AA && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="AAC"
                      // {...register("AAC", { required: true })}
                    />
                    {/* {errors.AAC && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="ADC"
                      // {...register("ADC", { required: true })}
                    />
                    {/* {errors.ADC && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="ADP"
                      // {...register("ADP", { required: true })}
                    />
                    {/* {errors.ADP && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="APC"
                      // {...register("APC", { required: true })}
                    />
                    {/* {errors.APC && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      name="APGA"
                      required
                      // {...register("APGA", { required: true })}
                    />
                    {/* {errors.APGA && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="APM"
                      // {...register("APM", { required: true })}
                    />
                    {/* {errors.APM && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="APP"
                      // {...register("APP", { required: true })}
                    />
                    {/* {errors.APP && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="BP"
                      // {...register("BP", { required: true })}
                    />
                    {/* {errors.BP && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="LP"
                      // {...register("LP", { required: true })}
                    />
                    {/* {errors.LP && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="NNPP"
                      // {...register("NNPP", { required: true })}
                    />
                    {/* {errors.NNPP && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="NRM"
                      // {...register("NRM", { required: true })}
                    />
                    {/* {errors.NRM && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="PDP"
                      // {...register("PDP", { required: true })}
                    />
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
                      required
                      name="PRP"
                      // {...register("PRP", { required: true })}
                    />
                    {/* {errors.PRP && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="SDP"
                      // {...register("SDP", { required: true })}
                    />
                    {/* {errors.SDP && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="YPP"
                      // {...register("YPP", { required: true })}
                    />
                    {/* {errors.YPP && (
                  <small className="text-red-500">This field is required</small>
                )} */}
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
                      required
                      name="ZLP"
                      // {...register("ZLP", { required: true })}
                    />
                    {/* {errors.ZLP && (
                  <small className="text-red-500">This field is required</small>
                )} */}
                  </div>
                  <div className="mb-5">
                    <div>
                      <label htmlFor="file-input" className="sr-only">
                        Upload result
                      </label>
                      <input
                        type="file"
                        name="file-input"
                        accept="image/*"
                        id="file-input"
                        onChange={(e) => setFiles(e.target.files)}
                        className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
                    file:border-0
                    file:bg-gray-100 file:me-4
                    file:py-3 file:px-4
                    dark:file:bg-gray-700 dark:file:text-gray-400"
                        required
                      />
                    </div>
                  </div>
                  <SubmitButton />
                </form>
              )}
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
              {completedChecklist?.includes("violence") ? (
                <div className="flex gap-2 items-center justify-center  mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="green"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 18 21 6l-1.41-1.41z" />
                  </svg>
                  <span className="text-sm text-center">
                    Checklist completed{" "}
                  </span>
                </div>
              ) : (
                <form
                  className=""
                  onSubmit={(e) => submitReport(e, "violence")}
                >
                  <div className="mb-5">
                    <label
                      htmlFor="input-label"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      Was there any incident of election-related violence upon
                      your arrival at your LGA Collation Center?
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
                      Was there any incident of election-related violence during
                      the process of collation of results at your LGA Collation
                      Center?
                    </label>
                    <RadioButtonGroup
                      name="violence_2"
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
                      Was there any incident of election-related violence
                      following the announcement of the results at your LGA
                      Collation Center?
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
                      How long did this incident of violence last?
                    </label>
                    <input
                      type="text"
                      id="input-label"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder=""
                      required
                      name="violence_4"
                      // {...register("violence_4", { required: true })}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="input-label"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      Did the violence result in severe injury, loss of life or
                      destruction of electoral materials?
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
                      Did the violence result in the interruption of the
                      collation or announcement of results?
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
                      What was the response of security officials at the LGA
                      Collation Center to the violence?
                    </label>

                    <input
                      type="text"
                      min={0}
                      id="input-label"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder=""
                      required
                      name="violence_7"
                      // {...register("violence_7", { required: true })}
                    />
                  </div>

                  <SubmitButton />
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
