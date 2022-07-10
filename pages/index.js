import _ from "lodash";
import React, { useState } from "react";
import { ChevronDownIcon, PlusIcon, TrashIcon } from "@heroicons/react/solid";
import { OutsideAlerter   } from "../components";
import Image from "next/image";

const array = [
  { mcq: ["Yes", "No", "N/A"] },
  { mcq: ["Good", "Fair", "Poor", "N/A"] },
  { mcq: ["Safe", "At Risk", "N/A"] },
  { mcq: ["Pass", "Fail", "N/A"] },
  { mcq: ["Compliant", "Non-Compliant", "N/A"] },
];

const App = () => {
  const [state, setState] = useState({
    questionsSet: [{ id: 0, question: "", options: array[0] }],
    text: "",
    activeIndex: 0,
    modal: false,
    selectedMcq: array[0]?.mcq,
  });

  const addQues = () => {
    setState((prev) => ({
      ...prev,
      questionsSet: [
        ...prev.questionsSet,
        {
          id: prev.questionsSet[prev.questionsSet.length - 1].id + 1,
          question: "",
          options: prev.questionsSet[prev.questionsSet.length - 1].options,
        },
      ],
    }));
  };

  const deleteQues = (item, index) => {
    setState((prev) => ({ ...prev, activeIndex: prev.activeIndex - 1 }));
    let data = state.questionsSet?.filter((val, id) => item.id !== val.id);
    console.log("previous index", state.activeIndex, state.activeIndex - 1);
    setState((prev) => ({ ...prev, questionsSet: data }));
  };

  console.log("active index", state.activeIndex);

  const getOptionsColor = (index, length) => {
    let color = "";
    switch (index) {
      case 0:
        color = "#128561";
        break;
      case 1:
        color = length === 4 ? "#ffb000" : "#c40021";
        break;
      case 2:
        color = length === 4 ? "#c40021" : "#707070";
        break;
      default:
        color = "#707070";
    }
    return color;
  };

  const getOptionsBgColor = (index, length) => {
    let color = "";
    switch (index) {
      case 0:
        color = "#e9f2ef";
        break;
      case 1:
        color = length === 4 ? "#fff7eb" : "#fae8e9";
        break;
      case 2:
        color = length === 4 ? "#fae8e9" : "#f0f0f0";
        break;
      default:
        color = "#f0f0f0";
    }
    return color;
  };

  const Header = () => {
    return (
      <div className=" w-[80%] rounded-t-sm flex">
        <div
          style={{ border: "1px solid #d0d7e1" }}
          className="bg-[#f4f6fa] w-[70%] text-[#505f7a] text-[12px] pl-3 py-2 "
        >
          Question
        </div>
        <div
          style={{ border: "1px solid #d0d7e1" }}
          className="bg-[#f4f6fa] w-[30%] text-[#505f7a] text-[12px] pl-3 py-2 "
        >
          Type of response
        </div>
      </div>
    );
  };

  const closeModal = () => {
    console.log("state.selected", state.selectedMcq);
    let activeIndex = state.activeIndex;
    let fullData = state.questionsSet;
    let assignedData = fullData.map((val, id) => {
      if (id === activeIndex) {
        return { ...val, options: { mcq: state.selectedMcq } };
      } else {
        return val;
      }
    });
    setState((prev) => ({
      ...prev,
      modal: !prev.modal,
      questionsSet: assignedData,
    }));
  };

  const Modal = () => {
    return (
      <div
        className={
          " absolute z-40 right-0 top-10 flex justify-center items-center"
        }
      >
        <OutsideAlerter
          close={() => closeModal()}
          className={"bg-white shadow-2xl rounded-md p-8"}
        >
          <div className="flex justify-between mb-8 items-center">
            <div className="text-sm">Multiple choices Questions</div>
          </div>
          {array.map((item, index, array) => {
            return (
              <div
                key={`${index}`}
                onClick={() => {
                  setState((prev) => ({ ...prev, selectedMcq: item?.mcq }))
                }
                }
                style={
                  _.isEqual(state.selectedMcq, item?.mcq)
                    ? { border: "1px solid #d0d7e1" }
                    : {}
                }
                className="flex text-[#505f7a] text-[11px] pl-3 h-12 items-center overflow-scroll bg-[#f4f6fa]/75 rounded-md my-2"
              >
                {item?.mcq?.map((item, index, array) => (
                  <div
                    key={`${index}`}
                    style={{
                      color: getOptionsColor(index, array?.length),
                      backgroundColor: getOptionsBgColor(index, array.length),
                    }}
                    className={"px-3 py-1 rounded-full mr-2 whitespace-nowrap"}
                  >
                    {item}
                  </div>
                ))}
              </div>
            );
          })}
        </OutsideAlerter>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full h-screen overflow-y-scroll pt-80 pb-48 bg-[#e9eef6] flex flex-col items-center">
        {state?.questionsSet?.map((item, index, array) => {
          return (
            <button
              key={`${index}`}
              onClick={() =>
                typeof window !== "undefined" &&
                setState((prev) => ({
                  ...prev,
                  activeIndex: index,
                }))
              }
              className=" w-[80%] my-3 flex relative cursor-default p-2 bg-white rounded-lg items-center"
            >
              <div className="cursor-pointer absolute text-[10px] md:top-auto  bg-white rounded-md right-[-35px] md:right-[-70px] shadow-lg flex justify-center items-center flex-col">
                {state?.activeIndex === index && <div onClick={() => addQues()} className="min-h-[30px] px-1 py-2 flex flex-col justify-center items-center">
                <PlusIcon className="w-4 h-4 text-[#4740d5]" />
                  <div className="hidden md:flex">Question</div>
                </div>}
                {state?.activeIndex === index && array.length > 1 && <div onClick={() => deleteQues(item, index)} className="min-h-[30px] px-1 py-2 flex flex-col justify-center items-center">
                <TrashIcon className="w-4 h-4 text-[#505f7a]" />
                  <div className="hidden md:flex">Delete</div>
                </div>}
              </div>
              {/* {state?.activeIndex === index && (
                <div
                  onClick={() => addQues()}
                  className="cursor-pointer absolute text-[10px] top-2 md:top-auto md:w-[50px] md:h-[50px] w-[30px] h-[30px] bg-white rounded-md left-[-35px] md:left-[-70px] shadow-lg flex justify-center items-center flex-col"
                >
                  +
                  Question
                </div>
              )}
              {state?.activeIndex === index && array.length > 1 && (
                <div
                  onClick={() => deleteQues(item, index)}
                  className="cursor-pointer absolute top-2 md:top-auto md:w-[50px] md:h-[50px] w-[30px] h-[30px] right-[-35px] md:right-[-70px] flex justify-center items-center flex-col"
                >
                  <TrashIcon className="w-5 h-5" />
                </div>
              )} */}
              <div
                // style={{ border: "1px solid #d0d7e1" }}
                className="bg-white w-[70%] text-[#505f7a] text-[15px] pl-3 py-3 flex"
              >
                {array.length > 1 ? (
                  <Image alt="drag" src={"/drag.png"} width={25} height={10} />
                ) : (
                  <div className="w-[25]" />
                )}
                <input
                  type={"text"}
                  value={item.question}
                  onChange={(e) => {
                    let fullData = state.questionsSet;
                    let data = fullData.map((val) =>
                      val.id === item.id
                        ? { ...val, question: e.target.value }
                        : val
                    );
                    setState((prev) => ({ ...prev, questionsSet: data }));
                  }}
                  className={"flex w-full outline-none ml-5"}
                  placeholder={"Type question"}
                />
              </div>
              <div
                style={{ transition: "0.2s" }}
                className="flex cursor-pointer bg-white overflow-scroll w-[30%] text-[#505f7a] text-[11px] pl-3 h-12 items-center justify-between"
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    modal: !prev.modal,
                    selectedMcq: item.options?.mcq,
                  }))
                }
              >
                <div className="flex">
                  {item.options?.mcq?.map((item, index, array) => (
                    <div
                      key={`${index}`}
                      style={{
                        color: getOptionsColor(index, array?.length),
                        backgroundColor: getOptionsBgColor(index, array.length),
                      }}
                      className={
                        "px-3 py-1 rounded-full mr-2 whitespace-nowrap"
                      }
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mr-2 p-2 rounded-full">
                  <ChevronDownIcon className="h-5 w-5 text-[#505f7a] " />
                </div>
              </div>
                {state.modal && state.activeIndex === index && <Modal />}
            </button>
          );
        })}
      </div>
      <div
        style={{ borderLeft: "1px solid #d0d7e1" }}
        className="w-[100%] md:w-[40%] bg-[#f4f6fa] h-screen overflow-y-scroll"
      >
        <div
          style={{ borderBottom: "1px solid #d0d7e1" }}
          className={"p-5 font-bold text-xl bg-white"}
        >
          Preview
        </div>
        <div className="overflow-hidden">
          {state.questionsSet?.length === 1 &&
          state.questionsSet[0]?.question === "" ? (
            <div className="p-10 flex flex-col justify-evenly items-center text-[#100e20]">
              <Image alt={'mobile'} src={"/mobile.png"} width={240} height={400} />
              <div className="mt-10">Nothing to preview yet!</div>
              <div className="text-center text-[#505f79] mt-5">
                Add questions on the left and see how they look on a mobile
                device.
              </div>
            </div>
          ) : (
            state.questionsSet?.map((item, index) => {
              return (
                <div key={`${index}`} style={{border: '1px solid #d0d7e1'}} className="bg-white rounded-lg m-5 p-4">
                  <p>
                  {item.question}
                  </p>
                  <div>
                    {
                      item.options?.mcq?.map((item, index) => 
                        <div key={`${index}`} style={{border: '1px solid #d0d7e1', transition: '.2s'}} className={'rounded-md p-2 mt-3 text-[#4740d5] text-center hover:bg-[#f4f6fa]'}>{item}</div>
                      )
                    }
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
