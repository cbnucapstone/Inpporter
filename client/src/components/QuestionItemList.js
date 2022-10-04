import React from "react";
// import {VirtualizedList as List} from "./VirtualListClass";
import QuestionItem from "./QuestionItem";

const QuestionItemList = ({ title, questionList, listdata }) => {
  return (
    <div className="list">
      {/* props로부터 title 값을 전달 받음 */}
      <p className="list-title">{title}</p>
      <ul className="list-ul">
        {questionList && //questionlist가 있을 때만 출력
          questionList
            .slice(0)
            .reverse()
            .map((questionItem) => {
              return (
                // <List QuestionItem />
                //map을 이용하여 QuestionItem 출력
                <QuestionItem questionItem={questionItem} listdata={listdata} />
              );
            })}
      </ul>
    </div>
  );
};

export default QuestionItemList;
