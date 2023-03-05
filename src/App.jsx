import { useState, useEffect } from "react";
import "./App.css";
import FlashCard from "./components/flashCard.jsx";
import data from "./api/data.jsx";

const arrayLength = data.length;
function App() {
  const [isflipping, setIsFlipping] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const handleNext = () => {
    if (currentCard < arrayLength - 1) {
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

  useEffect(()=>{
    updateFlipState(false); //reset the flip state when the card changes
  }, [currentCard])

  return (
    <div className="App">
      <div className="title">
        <h1>Guess Who?</h1>
        <h2>Test your knowledge in soccer</h2>
        <h3>Number of cards: {arrayLength}</h3>
      </div>

      <FlashCard 
      data={data} 
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
      <p className="copyRight">&copy; Jassem Toumi</p>
    </div>
  );
}

export default App;
