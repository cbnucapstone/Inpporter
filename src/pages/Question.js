import React, { useState } from "react";
import InputBox from "../components/InputBox";
import QuestionItemList from "../components/QuestionItemList";
//import { Link } from "react-router-dom";
import "../styles/Question.css";

const Question = () => {
    const [questionList, setQuestionList] = useState([]);

    return (
        <div className="Question"  style={{ backgroundImage: "url(./background-img.jpg)"}}>
            <div className="question__container">
                {/* 아이템을 추가할 수 있는 inputbox */}
                <h2 class="QuestionHeader">연습할 면접 질문을 관리하세요</h2>
                <InputBox questionList={questionList} setQuestionList={setQuestionList}/>

                {/* 면접질문 Item 리스트 */}
                <QuestionItemList 
                    title={"면접 질문 리스트"}
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    checkedList={false} //체크되지 않은 할 일 목록
                />
            </div>
        </div>
    );
};


export default Question;