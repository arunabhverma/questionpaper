import _ from "lodash";
import React, { useEffect, useState } from "react";
import { DotsVerticalIcon, XCircleIcon } from '@heroicons/react/solid'
import { OutsideAlerter } from "../components";

const array = [
  {mcq: ['Yes', 'No', 'N/A']},
  {mcq: ['Good', 'Fair', 'Poor', 'N/A']},
  {mcq: ['Safe', 'At Risk', 'N/A']},
  {mcq: ['Pass', 'Fail', 'N/A']},
  {mcq: ['Compliant', 'Non-Compliant', 'N/A']},

]

const App = () => {
  const [state, setState] = useState({
    questionsSet: [{ id:0, question: "", options: array[0] }],
    text: "",
    activeIndex: 0,
    modal: false,
    selectedMcq: array[0]?.mcq
  });

 useEffect(() => {
  if(state.questionsSet?.length > 1){
    setState(prev => ({...prev, activeIndex: state.questionsSet.length - 1, text:''}))
  } else {
    setState(prev => ({...prev, activeIndex: 0, text:''}))
  }

  },[state.questionsSet?.length])

  const addQues = () => {
    setState((prev) => ({
      ...prev,
      text:'',
      questionsSet: [...prev.questionsSet, { id:prev.questionsSet[prev.questionsSet.length - 1].id + 1,question: "", options: prev.questionsSet[prev.questionsSet.length - 1].options  }],
    }));
  };
  
  const deleteQues = (index) => {
    let allQues = state.questionsSet
    allQues.splice(index, 1)
    setState((prev) => ({
      ...prev,
      activeIndex: 1,
      questionsSet: allQues,
      text:'',
    }));
  };

 const setInputData = (index) => {
  let fullQuestionData = state.questionsSet
  let questionData = fullQuestionData?.filter((_,id) => index === id)[0]
  let updateData = {...questionData, question: state.text}

  _.assign(questionData, {question: state.text})
  setState(prev => ({...prev, questionsSet: fullQuestionData,}))
 }

 const getOptionsColor = (index, length) => {
  console.log('sdfsdf');
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

       console.log('color', color);
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
 }

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

  const Modal = () => {
    console.log('state', state.selectedMcq);
    return(
      <div className={'w-screen h-screen absolute top-0 left-0 right-0 bottom-0 bg-black/30 flex justify-center items-center'}>
      <OutsideAlerter close={() => setState(prev => ({...prev, modal:!prev.modal}))} className={'bg-white w-[80%] md:w-[50%] shadow-md rounded-md p-8'}>
        <div className="flex justify-between mb-8 items-center">
        <div>
          Multiple choices Questions
        </div>
        <XCircleIcon onClick={() => setState(prev => ({...prev, modal:!prev.modal}))} className="h-7 w-7 text-purple-400"/>
        </div>
        {
          array.map((item, index, array) => {
            console.log('state adn item', _.isEqual(state.selectedMcq, item?.mcq))
            return(
              <div
              key={`${index}`}
              onClick={() => setState(prev => ({...prev, selectedMcq: item?.mcq }))}
              style={_.isEqual(state.selectedMcq, item?.mcq) ? { border: "1px solid #d0d7e1" }: {}}
              className="flex text-[#505f7a] text-[11px] pl-3 h-12 items-center overflow-scroll bg-[#f4f6fa]/75 rounded-md my-2"
            >
              {item?.mcq?.map((item, index, array) => <div key={`${index}`} style={{color: getOptionsColor(index, array?.length), backgroundColor: getOptionsBgColor(index, array.length)}} className={'px-3 py-1 rounded-full mr-2 whitespace-nowrap'}>{item}</div>)}
            </div>
            );
          })
        }
      </OutsideAlerter>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen pt-28 pb-48 bg-[#e9eef6] flex flex-col justify-center items-center">
      <Header />
      {state?.questionsSet?.map((item, index, array) => {
        return (
          <button
            key={`${index}`}
            onClick={() =>
              typeof window !== "undefined" &&
              setState((prev) => ({ ...prev, activeIndex: index, text: item.question }))
            }
            className=" w-[80%] rounded-t-sm flex relative cursor-default"
          >
            {state?.activeIndex === index && (
              <div
                onClick={() => addQues()}
                style={{ border: "1px solid #d0d7e1" }}
                className="absolute w-[50px] h-[50px] rounded-full bg-green-400 left-[-70px] shadow-lg flex justify-center items-center flex-col"
              >
                +
              </div>
            )}
            {(state?.activeIndex === index && array.length>1) && (
              <div
                onClick={() => deleteQues(index)}
                style={{ border: "1px solid #d0d7e1" }}
                className="absolute w-[50px] h-[50px] rounded-full bg-red-400 right-[-70px] shadow-lg flex justify-center items-center flex-col"
              >
                -
              </div>
            )}
            <div
              style={{ border: "1px solid #d0d7e1" }}
              className="bg-white w-[70%] text-[#505f7a] text-[15px] pl-3 py-3 "
            >
              <input
                onBlur={() => setInputData(index)}
                type={"text"}
                value={state.activeIndex === index ? state.text : item.question}
                onChange={(e) =>setState(prev => ({...prev, text: e.target.value}))}
                className={"flex w-full outline-none"}
                placeholder={"Type question"}
              />
            </div>
            <div
              style={{ border: "1px solid #d0d7e1" }}
              className="flex bg-white overflow-scroll w-[30%] text-[#505f7a] text-[11px] pl-3 h-12 items-center justify-between"
            >
              <div className="flex">
              {item.options?.mcq?.map((item, index, array) => <div key={`${index}`} style={{color: getOptionsColor(index, array?.length), backgroundColor: getOptionsBgColor(index, array.length)}} className={'px-3 py-1 rounded-full mr-2'}>{item}</div>)}
              </div>
              <div onClick={() => setState(prev => ({...prev, modal: !prev.modal, selectedMcq: item.options?.mcq}))} className="mr-2 bg-purple-100 p-2 rounded-full">
              <DotsVerticalIcon className="h-3 w-3 text-purple-900 "/>
              </div>
            </div>
          </button>
        );
      })}
      { state.modal && <Modal />}
    </div>
  );
};

export default App;
