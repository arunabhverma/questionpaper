import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import _ from "lodash";

const Questions = () => {
  const {
    query: { questionId },
  } = useRouter();
  const [state, setState] = useState({
    fullData: [],
    setQues: "",
    setData: {},
  });

  useEffect(() => {
    if (typeof window !== "undefined" && questionId !== undefined) {
      let fullData = localStorage.getItem("Sets");
      let parseFullData = JSON.parse(fullData);
      let data = parseFullData?.filter((item, index) => index == questionId)[0];
      setState((prev) => ({
        ...prev,
        setData: {
          ...data,
          questions: data?.questions?.length > 0 ? data?.questions : [],
        },
        fullData: parseFullData,
      }));
    }
  }, [questionId]);

  console.log("parse", state.fullData);

  const saveQues = () => {
    if (state.setQues !== "" && typeof window !== "undefined") {
      let condition = [
        ...state.setData.questions,
        { ques: state.setQues, options: {} },
      ];
      setState((prev) => ({
        ...prev,
        setData: { ...state.setData, questions: condition },
      }));
      let storeData = state.fullData;
      _.assign(storeData, [
        { setName: state.setData.setName, questions: condition },
      ]);
      localStorage.setItem("Sets", JSON.stringify(storeData));
    }
  };

  const deleteSets = (index) => {
    if (typeof window !== "undefined") {
      let questions = state.setData.questions;
      questions.splice(index, 1);
      let condition = { ...state.setData, questions: questions };
      setState((prev) => ({ ...prev, setData: condition }));

      let storeData = state.fullData;
      _.assign(storeData, [condition]);
      localStorage.setItem("Sets", JSON.stringify(storeData));
    }
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-center align-center, bg-slate-500 p-10">
        <div className="flex justify-center items-center flex-col">
          <div>{state?.setData?.setName}</div>
          <div className="mt-12 flex">
            <input
              type={"text"}
              className={"w-[300px]"}
              value={state.setQues}
              onChange={(e) =>
                setState((prev) => ({ ...prev, setQues: e.target.value }))
              }
            />
            <button
              onClick={() => saveQues()}
              className="w-10 rounded-sm bg-slate-400"
            >
              +
            </button>
          </div>
        </div>
      </div>
      {state.setData?.questions?.map((item, index) => (
        <div key={`${index}`} className="flex p-5 rounded-sm mt-10 justify-between self-center items-center bg-purple-300 w-[80%]">
          {item.ques}
          <button onClick={() => deleteSets(index)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default Questions;
