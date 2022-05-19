import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FcOk, FcSettings, FcFullTrash } from "react-icons/fc";

const QuestionItem = ({ questionItem, questionList, setQuestionList }) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(questionItem.text);

  const editInputRef = useRef(null);

  useEffect(() => {
    //useEffect를 사용해 출력
    //edit모드일때 포커싱
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);
  
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
      if (e.key === "Enter") {//엔터키로 수정
      const nextQuestionList = questionList.map((item) => ({
        ...item,
        text: item.id === questionItem.id ? newText : item.text, //새로운 아이템 내용 넣기
      }));      
    }
    setQuestionList(nextQuestionList);
    setEdited(false);
  };
  const onClickDeleteBtn = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const nextQuestionList = questionList.map((item) => ({
        ...item,
        deleted: item.id === questionItem.id ? true : item.deleted,
      }));
      setQuestionList(nextQuestionList);
    }
  };

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
          />
        ) : (
          <span
            className={`item-ctx ${
              questionItem.checked ? "item-ctx-checked" : ""
            }`}
          >
            {questionItem.text}
          </span>
        )
      }
      {
        //수정버튼
        //완료한 일인 경우에는 null을 반환하여 보이지 않도록 함
        !questionItem.checked ? (
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
        ) : null
      }
      {/* {삭제버튼} */}
      <button
        type="button"
        className="item-delete-btn"
        onClick={onClickDeleteBtn}
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
