import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FcOk, FcSettings, FcFullTrash, FcCdLogo } from "react-icons/fc";
import axios from "axios";
import $ from 'jquery';
import jquery from "jquery";

const QuestionItem = ({
  questionItem,
  questionList,
  setQuestionList,
}) => {
  
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(questionItem.text);
  
  const editInputRef = useRef(null);

  useEffect(() => {
    if (edited) {
      editInputRef.current.focus();
    }

  }, []);

  const onClickEditBtn = () => {
    setEdited(true);
  };
  const onChangeEditInput = (e) => {
    setNewText(e.target.value);
  };
  
  const onClickSubmitBtn = (e) => {
    const nextQuestionList = questionList.map((item) => ({
      ...item,
      text: item.id === questionItem.id ? newText : item.text, //새로운 아이템 내용 넣기
    }));
    if (e.key === "Enter") {
      //엔터키로 수정
      const nextQuestionList = questionList.map((item) => ({
        ...item,
        text: item._id === questionItem._id ? newText : item.text, //새로운 아이템 내용 넣기
      }));
    }
    setQuestionList(nextQuestionList);
    setEdited(false);
  };
  
  // axios.post(
  //   '/login', 
  //   {id : user.id,password : user.password})
  //   .then(function (response) {console.log(response);})
  //   .catch(error => {console.log('error : ',error.response)});

  // axios
  // .post("http://localhost:5001/question/write",body)
  // .then((res)=>{
  //   console.log(res);
    
  // })


  const onClickDeleteBtn = (e) => {
    console.log(e);

    if(window.confirm("정말로 삭제하시겠습니까?")) {
      sendID(e);
    }

    async function sendID(id){
      try{
        await axios.post("http://localhost:5001/remove",{
          data : id
        })
      }catch{
        console.log("실패 ㅅㅂ");
      }
    }
  }

  

    //   // const nextQuestionList = () => ({
    //   //   ...item,
    //   //   deleted: item.id === questionItem.id ? true : item.deleted,

        
    //   // });

    //   //삭제가 끝난 후에 리스트를 다시 map
    //   //맵 돌린 리스트를 set안에
    // }

  return (
    <li className="item">
      {
        //item 내용
        edited ? (
          <input
            type="text"
            className="item-edit-input"
            value={newText}
            ref={editInputRef}
            onChange={onChangeEditInput}
            onKeyPress={onClickSubmitBtn}
            id={questionItem._id}
          />
          
        ) : (
          <span className={`item-ctx`}>{questionItem.text}<span id={questionItem._id} className="sxsx">{questionItem._id}</span></span>
        )
      }
      {
        //수정버튼
        edited ? (
          // 수정완료버튼
          <button
            type="button"
            className="item-edit-btn"
            onClick={onClickSubmitBtn}
          >
            <FcOk size="20" />
          </button>
        ) : (
          //수정버튼
          <button
            type="button"
            className="item-edit-btn"
            onClick={onClickEditBtn}
          >
            <FcSettings size="20" />
          </button>
        )
      }
      {/* {삭제버튼} */}
      <button
        type="button"
        className="item-delete-btn"
        onClick={() => onClickDeleteBtn($(`#${questionItem._id}`).text())}
      >
        <FcFullTrash size="20" />
      </button>
    </li>
  );
};

QuestionItem.propTypes = {
  questionItem: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string.isRequired,
  }),
  questionList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  setQuestionList: PropTypes.func.isRequired,
};

export default QuestionItem;
