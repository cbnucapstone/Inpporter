import React from "react";
import PropTypes from 'prop-types';
import QuestionItem from "./QuestionItem";


const QuestionItemList = ({title,questionList,setQuestionList, checkedList}) =>(
    <div className="list">
        {/* {props로부터 title 값을 전달 받음} */}
        <p className="list-title">{title}</p>    

        <ul className="list-ul">
            {questionList && //questionlist가 있을 때만 출력
            questionList.map((questionItem) => {
                //삭제한 질문인 경우 출력하지 않음(deleted가 true)
                if(questionItem.deleted) return null;

                //checkedList값에 따라 할일 목록 또는 완료한 목록을 출력
                if(checkedList !== questionItem.checked) return null;

                return(
                    //map을 이용하여 QuesrionItem 출력
                    <QuestionItem
                    key={questionItem.id}
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
    checkedList: PropTypes.bool.isRequired,
};

export default QuestionItemList