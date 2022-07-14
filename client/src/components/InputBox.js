import React, { useRef, useState } from "react";
//import PropTypes from "prop-types"; //npm install -save prop-types!!!
import axios from "axios";

const InputBox = () => {
  //부모로부터 props로 두개 받아오기
  const selectList = ["역량", "지원동기", "직무", "기초인성"];
  const [text, setText] = useState("");
  const [selected, setSelected] = useState("역량");
  const inputRef = useRef(null); //useref Hook으로 ref생성

  //input값 가져오기
  const onChangeInput = (e) => {setText(e.target.value);};
  const onSelectBox = (e) => {setSelected(e.target.value);};


  const onPressSubmitBtn = (e) => {
    //버튼 눌렀을 때 실행되는 부분
    e.preventDefault(); //창이 새로고침 되는거 방지

    if (!text) {
      alert("추가할 질문을 입력하세요");
      return false;
    } else {
      let body={
        userid:"1",
        text:text,
        selected:selected,
      };
      axios
      .post("http://localhost:5001/question/write",body)
      .then((res)=>{
        console.log(res);        
      })
      setText("");
      inputRef.current.focus();
    }
    window.location.reload();
  };

  return (
    <div className="inputbox">
      <form onSubmit={onPressSubmitBtn} className="inputbox">
        {/* Item 내용 입력하는 input */}
        {/* 질문 카테고리 입력 */}
        <select className="selectbox" onChange={onSelectBox} value={selected}>
          {selectList.map((item)=>(
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        {/* 질문 입력창 */}
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

export default InputBox;
