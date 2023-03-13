import React from "react";


const controls = ({preventD, handleInputChange, answer,checkAnswer ,handleBack, handleNext, handleShuffle}) => {

  return (
    <div className="controls">
    <div className="form-container">
    <form onSubmit={preventD}>
      <input
        onChange={handleInputChange}
        type="text"
        placeholder="Enter your answer"
        value={answer}
      />
    </form>
    <button className="checkBtn" onClick={checkAnswer}>
      Check
    </button>
  </div>

  <div className="btnS">
    <button onClick={handleBack} className="nextBtn">
      Back
    </button>
    <button onClick={handleNext} className="nextBtn">
      Next
    </button>
  </div>
  <button onClick={handleShuffle} className="shuffleBtn">
    Shuffle
  </button>
    </div>
  );
};

export default controls;