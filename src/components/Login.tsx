import React, { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { StatesAndLGA } from "@/lib/states-and-lga";

type Inputs = {
  name: string;
  state: string;
  lga: string;
};
export default function Login({ login }: { login: any }) {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");

  const lgas = useMemo(() => {
    return StatesAndLGA.find((s) => s.state === state)?.lgas || [];
  }, [state]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => saveUser(data);

  const saveUser = (data: Inputs) => {
    // console.log(data);

    if (!data.state || !data?.lga || !data?.name) return;

    localStorage.setItem("name", data.name);
    localStorage.setItem("state", data.state);
    localStorage.setItem("lga", data.lga);

    login();
  };

  return (
    <div className="bg-white borde flex flex-col w-full max-w-xl pt-20 border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 mt-5">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-y-4">
            {/* Form Group */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm mb-2 dark:text-white"
              >
                Your Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  aria-describedby="email-error"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <small className="text-red-500">This field is required</small>
                )}
              </div>
              <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                This field is required
              </p>
            </div>

            <div>
              <label
                htmlFor="hs-select-label"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                State
              </label>
              <select
                id="hs-select-label"
                className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                defaultValue={"Kogi"}
                // required
                {...register("state", { required: true })}
                onChange={(e) => setState(e.target.value)}
              >
                <option value={0}>Select state</option>
                <option value={"Kogi"}>Kogi</option>
                <option value={"Imo"}>Imo</option>
                <option value={"Bayelsa"}>Bayelsa</option>
              </select>
              {errors.state && (
                <small className="text-red-500">This field is required</small>
              )}
            </div>

            <div>
              <label
                htmlFor="hs-select-label"
                className="block text-sm font-medium mb-2 dark:text-white"
              >
                LGA
              </label>
              <select
                id="hs-select-label"
                className="py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                {...register("lga", { required: true })}
                defaultValue={"Adavi"}
                // required
              >
                {/* <option value={0}>Select LGA</option> */}
                {lgas.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.lga && (
                <small className="text-red-500">This field is required</small>
              )}
            </div>

            {/* End Form Group */}
            {/* Checkbox */}
            {/* <div className="flex items-center">
                <div className="flex">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3">
                  <label
                    htmlFor="remember-me"
                    className="text-sm dark:text-white"
                  >
                    I accept the{" "}
                    <a
                      className="text-blue-600 decoration-2 hover:underline font-medium"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div> */}
            {/* End Checkbox */}
            <button
              type="submit"
              className="py-3 px-4 mt-5 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              Continue
            </button>
          </div>
        </form>
        {/* End Form */}
      </div>
    </div>
  );
}
