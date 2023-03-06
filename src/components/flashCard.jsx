import React from "react";
// import {useState}  from "react";


const FlashCard = ({data, currentCard, isflipped, handleClick, isflipping}) => {

  return (
    //flash-card
    <div className={`flash-card ${isflipped? "isFlipped" : ""}`} onClick={handleClick}>
        <div className="frontCard">
        <h2 className="question">{data[currentCard].question}</h2>
        </div>
        <div className={`backCard ${isflipping ? "is-flipping" : ""}`}>
        <h2 className="answer">{data[currentCard].answer}</h2>
        </div>
    </div>
  );
};

export default FlashCard;
