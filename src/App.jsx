import { useState, useEffect } from "react";
import "./App.css";
import FlashCard from "./components/flashCard.jsx";
import soccerCards from "./api/soccerCards.jsx";
import tennisCards from "./api/tennisCards.jsx";
import soccerBackground from "./assets/soccerBackground.jpg";
import tennisBackground from "./assets/tennisBackground.jpg";

const soccerArrLenght = soccerCards.length;
const tennisArrLength = tennisCards.length;
function App() {
  const [isflipping, setIsFlipping] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const handleNext = () => {
    if (
      currentCard < soccerArrLenght - 1 ||
      currentCard < tennisArrLength - 1
    ) {
      setCurrentCard(currentCard + 1);
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipping(false);
      }, 700);
    }
  };
  const handleBack = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipping(false);
      }, 700);
    }
  };

  const [isflipped, updateFlipState] = useState(false);
  const handleClick = () => {
    updateFlipState(!isflipped);
  };

  useEffect(() => {
    updateFlipState(false); //reset the flip state when the card changes
  }, [currentCard]);

  const [showSoccerCards, setShowSoccerCards] = useState(true);
  const [showTennisCards, setShowTennisCards] = useState(false);
  const displaySoccerCards = () => {
    if (showSoccerCards === false && showTennisCards === true) {
      setShowSoccerCards(true);
      setShowTennisCards(false);
    }
  };
  const displayTennisCards = () => {
    if (showTennisCards === false && showSoccerCards === true) {
      setShowTennisCards(true);
      setShowSoccerCards(false);
    }
  };

  useEffect(() => {
    setCurrentCard(0);
  }, [showSoccerCards] || [showTennisCards]);

  document.body.style.backgroundImage= `url(${showSoccerCards ? soccerBackground : tennisBackground})`;
  
  return (
    <div className="App">
      <div className="title">
        <h1>Guess Who?</h1>
        <h2>Test your knowledge in {showSoccerCards ? "soccer" : "tennis"}</h2>
        <h3>
          Number of cards: {showSoccerCards ? soccerArrLenght : tennisArrLength}
        </h3>
      </div>

      <FlashCard
        data={showSoccerCards ? soccerCards : tennisCards}
        currentCard={currentCard}
        isflipped={isflipped}
        handleClick={handleClick}
        isflipping={isflipping}
      />
      <button onClick={handleBack} className="nextBtn">
        Back
      </button>
      <button onClick={handleNext} className="nextBtn">
        Next
      </button>
      <div class="dropdown">
        <button class="dropbtn">Select Topic</button>
        <div class="dropdown-content">
          <span onClick={displaySoccerCards}>Soccer</span>
          <span onClick={displayTennisCards}>Tennis</span>
        </div>
      </div>
      <p className="copyRight">&copy; Jassem Toumi</p>
    </div>
  );
}

export default App;
