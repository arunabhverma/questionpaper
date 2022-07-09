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
      let data = [...state.setData, { setName: state.setName }];
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

          <div className="mt-12">
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
        <Link
          href={`/questions/${index}`}
          className="flex p-5 cursor-pointer rounded-sm mt-10 justify-between self-center items-center bg-purple-300 w-[80%]"
        >
          <div className="flex p-5 rounded-sm mt-10 justify-between self-center items-center bg-purple-300 w-[80%]">
          <div>
            {item.setName}
          </div>
            <button onClick={() => deleteSets()}>X</button>
            </div>
        </Link>
      ))}
    </div>
  );
};

export default App;
