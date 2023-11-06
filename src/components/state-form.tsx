import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createReport } from "./server-actions";
import Completed from "./completed";

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

export default function StateForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submitReport = (data: Inputs) => {
    if (loading) return;

    setLoading(true);

    const name = localStorage.getItem("name");
    const state = localStorage.getItem("state");
    const lga = localStorage.getItem("lga");

    createReport({
      name: name || "",
      data: JSON.stringify(data),
      level: "state",
      state: state || "",
      lga: lga || "",
      date: new Date().toDateString(),
    })
      .then((res) => {
        if (res.error) {
          alert("An error occured. Please try again later");
        } else {
          setDone(true);
          // setLoading(false)
        }
      })
      .catch((err) => console.log(err));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => submitReport(data);

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
              className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition py-4 px-5 hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-collapse-one"
            >
              <div>
                <svg
                  className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
                  className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
                  What is the name of the collation center?
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
                  What is the location of the collation center?
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
                  What is the code or collation center number?
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
                  What time did you arrive the collation center?
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
                  What time did the INEC staff arrive at the collation center?
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
                  Were you permitted to observe? Yes, No
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="permitted_to_observe"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("permitted_to_observe", { required: true })}
                    />
                    {errors.permitted_to_observe && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      name="permitted_to_observe"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                    />
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
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
                  How many women were INEC staff?
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
                  How many security officials were at the collation center?
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
                  How many party agents were at the collation center?
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
                  Was the access to the collation center easy for PWDs? Yes, No
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("easy_access_to_collation_center", {
                        required: true,
                      })}
                    />
                    {errors.easy_access_to_collation_center && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("easy_access_to_collation_center", {
                        required: true,
                      })}
                    />
                    {errors.easy_access_to_collation_center && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Was there a lot of young people aged between the ages of 18-35
                  at the collation center?
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("many_young_people", { required: true })}
                    />
                    {errors.many_young_people && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("many_young_people", { required: true })}
                    />
                    {errors.many_young_people && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Was there incidence of open vote buying either near or at the
                  collation center where you were assigned?
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("open_vote_buying", { required: true })}
                    />
                    {errors.open_vote_buying && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("open_vote_buying", { required: true })}
                    />
                    {errors.open_vote_buying && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700"
            id="hs-basic-heading-two"
          >
            <button
              className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition py-4 px-5 hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-collapse-two"
            >
              <svg
                className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
                className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
                  Did the INEC staff take delivery of all the original copies of
                  Forms EC8A from the lga collation center together with other
                  materials and reports relating to the election, including Form
                  EC8B?
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("process_1", { required: true })}
                    />
                    {errors.process_1 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("process_1", { required: true })}
                    />
                    {errors.process_1 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the INEC staff entered the results for the Governorship
                  election by entering the votes scored by each Political Party
                  in the original copy of Forms EC60H in figures and words?
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("process_2", { required: true })}
                    />
                    {errors.process_2 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("process_2", { required: true })}
                    />
                    {errors.process_2 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the INEC staff cross-check the totals and entries in the
                  form EC60H with the Collation Support and Result Verification
                  System (CSRVS) Secretariat?
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("process_3", { required: true })}
                    />
                    {errors.process_3 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("process_3", { required: true })}
                    />
                    {errors.process_3 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the Inec staff announce loudly the votes scored by each
                  Political Party?
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("process_4", { required: true })}
                    />
                    {errors.process_4 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("process_4", { required: true })}
                    />
                    {errors.process_4 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the inec staff sign, date and stamp the forms and request
                  the political parties agents at the collation center to
                  countersign?
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("process_5", { required: true })}
                    />
                    {errors.process_5 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("process_5", { required: true })}
                    />
                    {errors.process_5 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the inec staff distribute copies of the forms political
                  parties agents and the Police?
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("process_6", { required: true })}
                    />
                    {errors.process_6 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("process_6", { required: true })}
                    />
                    {errors.process_6 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the inec staff) electronically transmit or transfer the
                  result directly to the IREV Portal as prescribed by the
                  Commission?
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("process_7", { required: true })}
                    />
                    {errors.process_7 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("process_7", { required: true })}
                    />
                    {errors.process_7 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Did the inec staff paste the results in an open place for
                  public review at collation center? Choose: Yes or No
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("process_8", { required: true })}
                    />
                    {errors.process_8 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("process_8", { required: true })}
                    />
                    {errors.process_8 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700"
            id="hs-basic-heading-three"
          >
            <button
              className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition py-4 px-5 hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-collapse-three"
            >
              <svg
                className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
                className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="text"
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
              className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition py-4 px-5 hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-collapse-three"
            >
              <svg
                className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
                className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
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
                  supporters at the collation center where you observed?
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("violence_1", { required: true })}
                    />
                    {errors.violence_1 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("violence_1", { required: true })}
                    />
                    {errors.violence_1 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
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
                  collation center?
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("violence_3", { required: true })}
                    />
                    {errors.violence_3 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("violence_3", { required: true })}
                    />
                    {errors.violence_3 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
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
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("violence_5", { required: true })}
                    />
                    {errors.violence_5 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("violence_5", { required: true })}
                    />
                    {errors.violence_5 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Was there any issue of election related violence after the
                  election
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("violence_6", { required: true })}
                    />
                    {errors.violence_6 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("violence_6", { required: true })}
                    />
                    {errors.violence_6 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="input-label"
                  className="block text-sm font-medium mb-2 dark:text-white"
                >
                  Were there any casualties?
                </label>
                <div className="flex gap-x-6">
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-1"
                      defaultChecked
                      {...register("violence_7", { required: true })}
                    />
                    {errors.violence_7 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-1"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex">
                    <input
                      type="radio"
                      // name="hs-radio-group"
                      className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      id="hs-radio-group-2"
                      {...register("violence_7", { required: true })}
                    />
                    {errors.violence_7 && (
                      <small className="text-red-500">
                        This field is required
                      </small>
                    )}
                    <label
                      htmlFor="hs-radio-group-2"
                      className="text-sm text-gray-500 ml-2 dark:text-gray-400"
                    >
                      No
                    </label>
                  </div>
                </div>
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
                  className="mx-auto w-60 self-center py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
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
