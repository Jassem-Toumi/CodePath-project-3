import React from "react";

const DropDown = ({displaySoccerCards, displayTennisCards, showCreateOwn, isGameSaved,displaySavedGame}) => {
  return (
    <div className="dropdown">
      <button className="dropbtn">Select Topic</button>
      <div className="dropdown-content">
        <span onClick={displaySoccerCards}>Soccer</span>
        <span onClick={displayTennisCards}>Tennis</span>
        <span onClick={showCreateOwn}>Create your own</span>
        `{isGameSaved ? <span onClick={displaySavedGame}>My saved game</span> : null}`
      </div>
    </div>
  );
};

export default DropDown;
