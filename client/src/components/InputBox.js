import React, { useRef, useState } from "react";
import PropTypes from "prop-types"; //npm install -save prop-types!!!
import { set } from "mongoose";

const InputBox = ({ questionList, setQuestionList }) => {
  //부모로부터 props로 두개 받아오기
  const [text, setText] = useState("");
  const inputRef = useRef(null); //useref Hook으로 ref생성
  //input값 가져오기
  const onChangeInput = (e) => {
    setText(e.target.value);
  };

  const onPressSubmitBtn = (e) => {
    //버튼 눌렀을 때 실행되는 부분
    e.preventDefault(); //창이 새로고침 되는거 방지

    if (!text) {
      alert("추가할 질문을 입력하세요");
      return false;
    } else {
      //질문리스트에 값 추가
      const nextQuestionList = questionList.concat({
        //input으로 받은 값을 setQuestionList()로 questionList에 추가
        id: questionList.length, //각 question item마다 id라는 식별자를 추가
        text, //각 question item 내용
        deleted: false,
      });
      setQuestionList(nextQuestionList);
      //input값 초기화 및 포커싱
      setText("");
      inputRef.current.focus();
    }
  };

  return (
    <div className="inputbox">
      <form onSubmit={onPressSubmitBtn} className="inputbox">
        {/* Item 내용 입력하는 input */}
        <input
          type="text"
          name="questionItem"
          value={text}
          ref={inputRef} //위에서 생성한 ref를 할당
          placeholder="연습할 면접 질문을 입력해주세요"
          className="inputbox-input"
          onChange={onChangeInput}
        />
        {/* 입력 후 아이템 추가 버튼 */}
        <button type="submit" className="inputbox-submit-btn">
          질문 추가하기
        </button>
      </form>
    </div>
  );
};

//props 값 검증
InputBox.propTypes = {
  questionList: PropTypes.arrayOf(
    //props의 타입을 배열로 강제.
    PropTypes.shape({
      //리스트의 원소는 객체여야 한다는 정의
      id: PropTypes.number.isRequired, //id는 숫자여야함
      text: PropTypes.string.isRequired, //text는 문자열
    }).isRequired
  ),
  setQuestionList: PropTypes.func.isRequired, //setquestionList는 함수
};

export default InputBox;
