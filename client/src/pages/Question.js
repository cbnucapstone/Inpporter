import React, { useState, useEffect } from "react";
import InputBox from "../components/InputBox";
import QuestionItemList from "../components/QuestionItemList";
import axios from "axios";
import "../styles/Question.css";
//import {store} from "../reducer/store";
import { useSelector } from "react-redux";

import {
  FcDatabase,
  FcGraduationCap,
  FcVoicePresentation,
  FcOrganization,
  FcIdea,
} from "react-icons/fc";

const Question = () => {
  const [selected, setSelected] = useState();
  const userid = useSelector((state) => state.User.id); //userid 받아쓰기 나즁에 수졍
  console.log("받아진다아이딧");
  console.log("userid : " + userid);
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


  class changeCate extends React.Component{
    constructor() {
      super();
        this.state = {
          cate : "역량"
        }
    }

    onClick1 = async () => {
      setSelected("역량")
      console.log("온클릭들어옴", selected)
      const res = await axios.get(`http://localhost:5001/question/${userid}/${selected}`, userid, selected);
      console.log("백을 못들어감") 
      this.makeData(res.data.list); 
    };

    onClick2 = async () => {
      setSelected("지원동기")
      console.log("온클릭들어옴", selected)
      const res = await axios.get(`http://localhost:5001/question/${userid}/${selected}`, userid, selected);
      console.log("백을 못들어감") 
      this.makeData(res.data.list); 
    };

    onClick3 = async () => {
      setSelected("직무")
      console.log("온클릭들어옴", selected)
      const res = await axios.get(`http://localhost:5001/question/${userid}/${selected}`, userid, selected);
      console.log("백을 못들어감") 
      this.makeData(res.data.list); 
    };

    onClick4 = async () => {
      setSelected("기초인성")
      console.log("온클릭들어옴", selected)
      const res = await axios.get(`http://localhost:5001/question/${userid}/${selected}`, userid, selected);
      console.log("백을 못들어감") 
      this.makeData(res.data.list); 
    };

    makeData = (items) => {
      
        setQuestionList(items);
        console.log("기초인성" + items.userid)
      
    };

    
  }

  const category = new changeCate();

  const onClickCate4 = () => {
  };
  const onClickCate5 = () => {
  };

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
            <button className="cate" id="cate1" >
              <FcDatabase size="25" />
              <br></br>
              전체
            </button>
            <button className="cate" id="cate2" onClick={()=>category.onClick1()}>
              <FcGraduationCap size="25" />
              <br></br>
              역량
            </button>
            <button
              className="cate" id="cate3" onClick={()=>category.onClick2()} >
              <FcVoicePresentation size="25" />
              <br></br>
              지원동기
            </button>
            <button className="cate" id="cate4" onClick={()=>category.onClick3()}>
              <FcOrganization size="25" />
              <br></br>
              직무
            </button>
            <button className="cate" id="cate5" onClick={()=>category.onClick4()}>
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
          setQuestionList={setQuestionList}
        />
      </div>
    </div>
  );
};

export default Question;
