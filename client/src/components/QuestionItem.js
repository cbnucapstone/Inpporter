import React, { useEffect, useRef, useState } from "react";
//import PropTypes from "prop-types";
import { FcOk, FcSettings, FcFullTrash } from "react-icons/fc";
import axios from "axios";
import $ from "jquery";

const QuestionItem = ({ questionItem }) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(questionItem.text);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (edited) {
      editInputRef.current.focus(); // edit 모드일때 포커싱
    }
  }, [edited]);

  const onClickDeleteBtn = (e) => {
    console.log(e);

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios.post(`http://localhost:5001/question/delete/${e}`, e);
    }
    window.location.reload();
  };

  const onClickEditBtn = (e) => {
    setEdited(true);
    console.log("온클릭");
    console.log(e);
    let body = {
      text: newText,
    };
    axios.get(`http://localhost:5001/question/edit/${e}`, body);
    console.log(body);
  };

  //수정된 input값 가져오기
  const onChangeEditInput = (e) => {
    setNewText(e.target.value);
    console.log("온체인지" + newText);
  };

  const onClickSubmitBtn = (e) => {
    console.log(e);
    let body = {
      id:e,
      text: newText,
    };
    console.log(newText);
    axios
      .post(`http://localhost:5001/question/update/${e}`, body)
      .then((res) => {
        console.log("수정성공" + res);
        setEdited(false);
      })
      .catch((err) => {
        console.log("수정실패");
      });
    setEdited(false);
    window.location.reload();
  };

  return (
    <li className="item">
      {
        //item 내용
        edited ? (
          <div className="item-edit-input">
          <input
            type="text"
            className="item-edit-input"
            value={newText}
            ref={editInputRef}
            onChange={onChangeEditInput}
            
          />
          <div id="editnone" > 
            <span className={`item-ctx`}>
              {questionItem.text}
              <span id={questionItem._id} className="sxsx">
                {questionItem._id}
              </span>
            </span>
          </div>
        </div>
        ) : (
          <span className={`item-ctx`}>
            {questionItem.text}
            <span id={questionItem._id} className="sxsx">
              {questionItem._id}
            </span>
          </span>
        )
      }
      {
        //수정버튼
        edited ? (
          // 수정완료버튼
          <button
            type="button"
            className="item-edit-btn"
            onClick={() => onClickSubmitBtn($(`#${questionItem._id}`).text())}
          >
            <FcOk size="20" />
          </button>
        ) : (
          //수정버튼
          <button
            type="button"
            className="item-edit-btn"
            onClick={() => onClickEditBtn($(`#${questionItem._id}`).text())}
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

export default QuestionItem;
