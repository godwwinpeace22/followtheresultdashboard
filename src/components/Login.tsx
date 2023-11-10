import React, { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { StatesAndLGA } from "@/lib/states-and-lga";

type Inputs = {
  name: string;
  state: string;
  lga: string;
  location: boolean;
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

  const saveUser = async (data: Inputs) => {
    // console.log(data);

    if (!data.state || !data?.lga || !data?.name) return;

    const { latitude, longitude } = await getLocation();

    localStorage.setItem("name", data.name);
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
            <div className="flex items-center">
              <div className="flex">
                <input
                  id="location"
                  // name="remember-me"
                  type="checkbox"
                  onInput={getLocation}
                  className="shrink-0 mt-0.5 border-gray-200 rounded text-[#063360] pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  {...register("location", { required: true })}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="location" className="text-sm dark:text-white">
                  Use my location
                </label>
              </div>
            </div>
            {errors.lga && (
              <small className="text-red-500">This field is required</small>
            )}
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
