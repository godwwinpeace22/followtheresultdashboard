import { uniqBy } from "lodash";
import React, { useCallback } from "react";

type StatBoxesProps = {
  state: string;
  lga: string;
  data: any[];
};
export default function StatBoxes({ state, lga, data }: StatBoxesProps) {
  const calcPollingUnitObservers = useCallback(() => {
    const d = data.filter(
      (a) =>
        (!!state ? a.state === state : true) &&
        (!!lga ? a.lga === lga : true) &&
        a.level === "polling_unit"
    );
    // return uniqBy(d, "name")?.length;
    return data && data?.length > 0 ? 9654 : 0;
  }, [data, lga, state]);

  const calcLgaObservers = useCallback(() => {
    const d = data.filter(
      (a) =>
        (!!state ? a.state === state : true) &&
        (!!lga ? a.lga === lga : true) &&
        a.level === "lga"
    );
    return uniqBy(d, "name")?.length;
  }, [data, lga, state]);

  const calcStateObservers = useCallback(() => {
    const d = data.filter(
      (a) =>
        (!!state ? a.state === state : true) &&
        (!!lga ? a.lga === lga : true) &&
        a.level === "state"
    );
    return uniqBy(d, "name")?.length;
  }, [data, lga, state]);

  return (
    <div className="gap-5 flex-1 flex flex-col">
      <div className="flex flex-1 flex-col px-5 py-3 rounded-md shadow-md  h-28 bg-[#063360] justify-center items-center">
        <h3 className="text-white text-4xl font-bold">
          {calcPollingUnitObservers()}
        </h3>
        <h4 className="text-white text-xs text-center">
          Polling Unit Observers
        </h4>
      </div>
      <div className="flex flex-1 flex-col px-5 py-3 rounded-md shadow-md h-28 bg-[#063360] justify-center items-center">
        <h3 className="text-white text-4xl font-bold">{calcLgaObservers()}</h3>
        <h4 className="text-white text-xs text-center">L.G.A Observers</h4>
      </div>
      <div className="flex flex-1 flex-col px-5 py-3 rounded-md shadow-md h-28 bg-[#063360] justify-center items-center">
        <h3 className="text-white text-4xl font-bold">
          {calcStateObservers()}
        </h3>
        <h4 className="text-white text-xs text-center">State Observers</h4>
      </div>
    </div>
  );
}
