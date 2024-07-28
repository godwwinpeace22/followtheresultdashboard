import React, { useMemo, useState } from "react";
import { StatesAndLGA } from "@/lib/states-and-lga";

type Inputs = {
  name: string;
  email: string;
  state: string;
  lga: string;
  location: boolean;
};
export default function Login({ login }: { login: any }) {
  const [state, setState] = useState("");

  const lgas = useMemo(() => {
    return StatesAndLGA.find((s) => s.state === state)?.lgas || [];
  }, [state]);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const values: any = {};
    formData.forEach((value, key) => {
      values[key] = value;
    });

    const data = {
      name: values.name,
      email: values.email,
      state: values.state,
      lga: values.lga,
      location: values.location,
    };

    // console.log(data);

    if (!data.state || !data?.lga || !data?.name || !data?.email) return;

    const { latitude, longitude } = await getLocation();

    localStorage.setItem("name", data.name);
    localStorage.setItem("email", data.email);
    localStorage.setItem("state", data.state);
    localStorage.setItem("lga", data.lga);
    localStorage.setItem("lat", latitude?.toString());
    localStorage.setItem("lon", longitude?.toString());

    login();
  };

  async function getLocation(): Promise<{
    latitude: number;
    longitude: number;
  }> {
    const promise: any = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    try {
      const position = await promise;
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (error) {
      return {
        latitude: 0,
        longitude: 0,
      };
    }
  }

  return (
    <div className="bg-white borde flex flex-col w-full max-w-xl pt-20 border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 mt-5">
        {/* Form */}
        <form onSubmit={onSubmit}>
          <div className="grid gap-y-4">
            {/* Form Group */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm mb-2 dark:text-white"
              >
                Your Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  aria-describedby="name-error"
                  name="name"
                  required
                  // {...register("name", { required: true })}
                />
                {/* {errors.name && (
                  <small className="text-red-500">This field is required</small>
                )} */}
              </div>
              <p className="hidden text-xs text-red-600 mt-2" id="name-error">
                This field is required
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-2 dark:text-white"
              >
                Your Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  aria-describedby="email-error"
                  required
                  name="email"
                  // {...register("email", { required: true })}
                />
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
                defaultValue={"Edo"}
                required
                name="state"
                // {...register("state", { required: true })}
                onChange={(e) => setState(e.target.value)}
              >
                {/* <option value={0}>Select state</option> */}
                <option value={"Edo"}>Edo</option>
                <option value={"Ondo"}>Ondo</option>
              </select>
              {/* {errors.state && (
                <small className="text-red-500">This field is required</small>
              )} */}
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
                // {...register("lga", { required: true })}
                defaultValue={"Adavi"}
                required
                name="lga"
              >
                {/* <option value={0}>Select LGA</option> */}
                {lgas.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* End Form Group */}
            {/* Checkbox */}
            <div className="flex items-center">
              <div className="flex">
                <input
                  id="location"
                  // name="remember-me"
                  type="checkbox"
                  required
                  name="location"
                  onInput={getLocation}
                  className="shrink-0 mt-0.5 border-gray-200 rounded text-[#063360] pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  // {...register("location", { required: true })}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="location" className="text-sm dark:text-white">
                  Use my location
                </label>
              </div>
            </div>
            {/* {errors.lga && (
              <small className="text-red-500">This field is required</small>
            )} */}
            {/* End Checkbox */}
            <button
              type="submit"
              className="py-3 px-4 mt-5 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#063360] text-white  focus:outline-none focus:ring-2  focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
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
