import React from "react";
import PropTypes from "prop-types";
import QuestionItem from "./QuestionItem";

const QuestionItemList = ({ title, questionList, setQuestionList }) => (
  <div className="list">
    {/* props로부터 title 값을 전달 받음 */}
    <p className="list-title">{title}</p>
    <ul className="list-ul">
      {questionList && //questionlist가 있을 때만 출력
        questionList.map((questionItem) => {
          //삭제한 질문인 경우 출력하지 않음(deleted가 true)
          if (questionItem.deleted) return null;

          return (
            //map을 이용하여 QuestionItem 출력
            <QuestionItem
              key={questionItem.id} //빠르게 렌더링 하기 위해 key값 사용
              questionItem={questionItem}
              questionList={questionList}
              setQuestionList={setQuestionList}
            />
          );
        })}
    </ul>
  </div>
);

QuestionItemList.propTypes = {
  title: PropTypes.string.isRequired,
  questionList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  setQuestionList: PropTypes.func.isRequired,
};

export default QuestionItemList;
