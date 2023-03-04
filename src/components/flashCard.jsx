import React from "react";

const FlashCard = (props) => {
  return (
    <div className="flash-card">
        <div className="frontCard">
        <h2 className="question">{props.question}</h2>
        </div>
        <dir className="backCard">
        <h2 className="answer">{props.answer}</h2>
        </dir>
    </div>
  );
};

export default FlashCard;
