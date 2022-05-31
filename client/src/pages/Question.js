import React, { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import QuestionItemList from "../components/QuestionItemList";
import axios from "axios";
import "../styles/Question.css";
import {
  FcDatabase,
  FcGraduationCap,
  FcVoicePresentation,
  FcOrganization,
  FcIdea,
} from "react-icons/fc";

const Question = () => {
   const [questionList,setQuestionList] = useState([]); //useState 훅을 사용하여 item을 담을 리스트와 setter함수 생성
 
  useEffect(()=> {
    const callApi = async () => {
      const res = await axios.get("http://localhost:5001/question");
      makeData(res.data.list);
    }

    const makeData = (items) => {
      setQuestionList(items);
    }

    callApi();
  },[]);

  return (
    <div
      className="Question"
      style={{ backgroundImage: "url(./background-img.jpg)" }}
    >
      <div className="question__container">
        {/* 아이템을 추가할 수 있는 inputbox */}
        <h2 className="QuestionHeader">연습할 면접 질문을 관리하세요</h2>
        <InputBox
          questionList={questionList}
          setQuestionList={setQuestionList}
        />
        <div className="category_contatiner">
          <p className="cateheader">면접 유형 카테고리</p>
          <div className="catediv">
            <button className="cate" id="cate1">
              <FcDatabase size="25" />
              <br></br>
              전체
            </button>
            <button className="cate" id="cate2">
              <FcGraduationCap size="25" />
              <br></br>
              역량
            </button>
            <button className="cate" id="cate3">
              <FcVoicePresentation size="25" />
              <br></br>
              지원동기
            </button>
            <button className="cate" id="cate4">
              <FcOrganization size="25" />
              <br></br>
              직무
            </button>
            <button className="cate" id="cate5">
              <FcIdea size="25" />
              <br></br>
              기초 인성
            </button>
          </div>
        </div>

        {/* 면접질문 Item 리스트 */}
        <QuestionItemList
          title={"면접 질문 리스트"}
          questionList={questionList}
          setQuestionList={setQuestionList}
        />

      </div>
    </div>
  );
};

export default Question;
