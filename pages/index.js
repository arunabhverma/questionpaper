import React, { useEffect, useState } from "react";
import Link from "next/link";

const App = () => {
  const [state, setState] = useState({
    setName: "",
    setData: [],
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      let data = localStorage.getItem("Sets");
      let parseData = JSON.parse(data);

      setState((prev) => ({ ...prev, setData: parseData }));
    }
  }, []);

  const saveSets = () => {
    if (state.setName !== "" && typeof window !== "undefined") {
      let data =
        state.setData?.length > 0
          ? [...state.setData, { setName: state.setName }]
          : [{ setName: state.setName }];
      setState((prev) => ({ ...prev, setData: data, setName: "" }));
      localStorage.setItem("Sets", JSON.stringify(data));
    }
  };

  const deleteSets = (index) => {
    if (typeof window !== "undefined") {
      let storeData = state.setData;
      storeData.splice(index, 1);
      setState((prev) => ({ ...prev, setData: storeData }));
      localStorage.setItem("Sets", JSON.stringify(storeData));
    }
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center align-center, bg-red-500 p-10">
        <div className="flex justify-center items-center flex-col">
          <div>Paper Sets</div>

          <div className="mt-12 flex">
            <input
              type={"text"}
              className={"w-[300px]"}
              value={state.setName}
              onChange={(e) =>
                setState((prev) => ({ ...prev, setName: e.target.value }))
              }
            />
            <button
              onClick={() => saveSets()}
              className="w-10 rounded-sm bg-slate-400"
            >
              +
            </button>
          </div>
        </div>
      </div>
      {state.setData?.map((item, index) => (
        <div key={`${index}`} className="flex self-center w-[80%] mt-10">
          <Link href={`/questions/${index}`}>
            <div className="flex p-5 self-center items-center bg-purple-300 w-[100%]">
              {item.setName}
            </div>
          </Link>
          <button className="flex p-5 justify-center items-center bg-purple-200 w-[5%]" onClick={() => deleteSets()}>X</button>
        </div>
      ))}
    </div>
  );
};

export default App;
