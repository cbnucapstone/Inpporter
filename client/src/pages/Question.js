import React, { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import QuestionItemList from "../components/QuestionItemList";
import axios from "axios";
import "../styles/Question.css";
import { useSelector } from "react-redux";

import {
  FcDatabase,
  FcGraduationCap,
  FcVoicePresentation,
  FcOrganization,
  FcIdea,
} from "react-icons/fc";

const Question = () => {
  const userid = useSelector((state) => state.User.id); //userid 받기
  const [btnActive, setbtnActive] = useState("0");
  const [selected, setSelected] = useState("전체");  
  const [questionList, setQuestionList] = useState([]); //useState 훅을 사용하여 item을 담을 리스트와 setter함수 생성


  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get(
        `http://localhost:5001/question/${userid}`,userid);
      makeData(res.data.list);
    };

    const makeData = (items) => {
      setQuestionList(items);
    };
    
    callApi();
  }, []);

   // 질문 리스트 받아오기
   useEffect(() => {
    const callApi = async () => {
      if (selected === "전체") {
        const res = await axios.get(
          `http://localhost:5001/question/${userid}`,
          userid
        );
        makeData(res.data.list);
      } else {
        const res = await axios.get(
          `http://localhost:5001/question/${userid}/${selected}`,
          userid,
          selected
        );
        makeData(res.data.list);
      }
    };

    const makeData = (items) => {
      setQuestionList(items);
    };

    callApi();
  }, [selected]);

  useEffect(() => {
    if (btnActive === "0") {
      setSelected("전체");
    }
      else if (btnActive === "1") {
        setSelected("역량");
    } else if (btnActive === "2") {
      setSelected("지원동기");
    } else if (btnActive === "3") {
      setSelected("직무");
    } else if (btnActive === "4") {
      setSelected("기초인성");
    }
  }, [btnActive]);

  return (
    <div
      className="Question"
      style={{ backgroundImage: "url(./background-img.jpg)" }}
    >
      <div className="question__container">
        {/* 아이템을 추가할 수 있는 inputbox */}
        <h2 className="QuestionHeader">연습할 면접 질문을 관리하세요</h2>
        <InputBox //InputBox component 불러오기
          questionList={questionList}
          setQuestionList={setQuestionList}
        />
        <div className="category_contatiner">
          <p className="cateheader">면접 유형 카테고리</p>
          <div className="catediv">
            <button className={"cate" + ("0" == btnActive ? "active" : "")} id="cate1" onClick={()=>setbtnActive("0")} >
              <FcDatabase size="25" />
              <br></br>
              전체
            </button>
            <button className={"cate" + ("1" == btnActive ? "active" : "")} id="cate2" onClick={()=>setbtnActive("1")}>
              <FcGraduationCap size="25" />
              <br></br>
              역량
            </button>
            <button className={"cate" + ("2" == btnActive ? "active" : "")} id="cate3" onClick={()=>setbtnActive("2")} >
              <FcVoicePresentation size="25" />
              <br></br>
              지원동기
            </button>
            <button className={"cate" + ("3" == btnActive ? "active" : "")} id="cate4" onClick={()=>setbtnActive("3")}>
              <FcOrganization size="25" />
              <br></br>
              직무
            </button>
            <button className={"cate" + ("4" == btnActive ? "active" : "")} id="cate5" onClick={()=>setbtnActive("4")}>
              <FcIdea size="25" />
              <br></br>
              기초 인성
            </button>
          </div>
        </div>

        {/* 면접질문 Item 리스트 */}
        <QuestionItemList //QuestionItemList component 불러오기
          title={"면접 질문 리스트"}
          questionList={questionList}
        />
      </div>
    </div>
  );
  
};

export default Question;