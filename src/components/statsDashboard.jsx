import React from "react";

const StatsDashboard = ({color, currentStreak, longestStreak, numOfCard}) => {
  return (
    <div className="title" style={{ backgroundColor: color }}>
    <h1>Guess Who?</h1>
    <h2>Test your knowledge in tennis</h2>
    <h3>Number of cards:{" " + numOfCard}</h3>
    <div className="stats">
      <h3>Current Streak: {currentStreak}</h3>
      <h3>Longest Streak: {longestStreak}</h3>
    </div>
  </div>
  );
};

export default StatsDashboard;
