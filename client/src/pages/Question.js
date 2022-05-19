import React, { useState } from "react";
import InputBox from "../components/InputBox";
import QuestionItemList from "../components/QuestionItemList";
import "../styles/Question.css";
import { FcDatabase, FcList,FcGraduationCap, FcVoicePresentation, FcOrganization, FcIdea} from "react-icons/fc";

const Question = () => {
  const [questionList, setQuestionList] = useState([]); //useState 훅을 사용하여 item을 담을 리스트와 setter함수 생성

  return (
    <div
      className="Question"
      style={{ backgroundImage: "url(./background-img.jpg)" }}
    >
      <div className="question__container">
        {/* 아이템을 추가할 수 있는 inputbox */}
        <h2 class="QuestionHeader">연습할 면접 질문을 관리하세요</h2>
        <InputBox
          questionList={questionList}
          setQuestionList={setQuestionList}
        />
        <div class="category_contatiner">
          <p class="cateheader">면접 유형 카테고리</p>
          <div class="catediv">
          {/* <button
              type="button"
              className="item-edit-btn"
              onClick={onClickEditBtn}
            >
              <FcSettings size="20" />
            </button> */}
          <button class="cate" id="cate1" >
            <FcDatabase size="25" /><br></br>
            전체
          </button>
          <button class="cate" id="cate2">
            <FcGraduationCap size="25" /><br></br>
            역량
          </button>
          <button class="cate" id="cate3">
            <FcVoicePresentation size="25" /><br></br>
            지원동기
          </button>
          <button class="cate" id="cate4">
            <FcOrganization size="25" /><br></br>
            직무
          </button>
          <button class="cate" id="cate5">
            <FcIdea size="25" /><br></br>
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
