import { useState, useEffect } from "react";
import "./App.css";
import FlashCard from "./components/flashCard.jsx";
import Controls from "./components/controls.jsx";
import DropDown from "./components/DropDown.jsx";
import StatsDashboard from "./components/statsDashboard.jsx";
import soccerCards from "./api/soccerCards.jsx";
import tennisCards from "./api/tennisCards.jsx";
import soccerBackground from "./assets/soccerBackground.jpg";
import tennisBackground from "./assets/tennisBackground.jpg";
import creatorBackground from "./assets/creatorBG.jpg";

const soccerArrLenght = soccerCards.length;
const tennisArrLength = tennisCards.length;
function App() {
  const [isflipped, updateFlipState] = useState(false);
  const [isflipping, setIsFlipping] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const handleClick = () => {
    updateFlipState(!isflipped);
  };

  useEffect(() => {
    updateFlipState(false); //reset the flip state when the card changes
  }, [currentCard]);

  const [showSoccerCards, setShowSoccerCards] = useState(true);
  const [showTennisCards, setShowTennisCards] = useState(false);
  const displaySoccerCards = () => {
    if (
      (showSoccerCards === false && showTennisCards === true) ||
      renderGame === true || showSavedGame === true 
    ) {
      setShowSoccerCards(true);
      setShowTennisCards(false);
      setRender(false);
      setCreateOwn(false);
      setShowSavedGame(false);
      setCurrentStreak(0);
      setLongestStreak(0);
      clearInputField();
      setArrayInput([]);
      setCardsCreated(0);
      setPrevAnswer("");
    }
  };
  const displayTennisCards = () => {
    if (
      (showTennisCards === false && showSoccerCards === true) ||
      renderGame === true || showSavedGame === true
    ) {
      setShowTennisCards(true);
      setShowSoccerCards(false);
      setRender(false);
      setCreateOwn(false);
      setShowSavedGame(false);
      setCurrentStreak(0);
      setLongestStreak(0);
      clearInputField();
      setArrayInput([]);
      setCardsCreated(0);
      setPrevAnswer("");
    }
  };

  useEffect(() => {
    setCurrentCard(0);
  }, [showSoccerCards] || [showTennisCards] || [renderGame] || [displaySavedGame]);

  const preventD = (e) => {
    e.preventDefault();
  };
  const [answer, setAnswer] = useState("");
  const [prevAnswer, setPrevAnswer] = useState("");

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  };

  const clearInputField = () => {
    setAnswer("");
  };



  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [color, setColor] = useState("#ffffff");
  const showGreen = () => {
    setColor("#00ff00");
    const timer = setTimeout(() => {
      setColor("#ffffff");
    }, 500);
    return () => clearTimeout(timer);
  };
  const showRed = () => {
    setColor("#ff0000");
    const timer = setTimeout(() => {
      setColor("#ffffff"); // Return the background color to white after 5ms
      // setCorrect(''); // Reset the state variable to trigger the effect again
    }, 500);
    return () => clearTimeout(timer);
  };

  // impelementing Fisher-Yates shuffle algorithm
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      //destructuring
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };
  const handleShuffle = () => {
    if (showSoccerCards) {
      shuffle(soccerCards);
    } else if (showTennisCards) {
      shuffle(tennisCards);
    } else if (renderGame) {
      shuffle(arrayInput);
    }
  };

  const [createOwn, setCreateOwn] = useState(false);
  const showCreateOwn = () => {
    if (
      (createOwn === false && showSoccerCards === true) ||
      showTennisCards === true || renderGame === true || showSavedGame === true
    ) {
      setCreateOwn(true);
      setShowSoccerCards(false);
      setShowTennisCards(false);
      setShowSavedGame(false);
      setRender(false);
      setCurrentStreak(0);
      setLongestStreak(0);
      clearInputField();

    }
  };

  const handleCreateOwn = () => {
    if (createOwn === true && renderGame === false) {
      setShowSoccerCards(false);
      setShowTennisCards(false);
      setCreateOwn(false);
      setRender(true);
      setCurrentStreak(0);
      setLongestStreak(0);
      clearInputField();
      setCardsCreated(0);
      setCurrentCard(0);
      setPrevAnswer("");
      setSavedGame(false);
      localStorage.removeItem("savedGame");
    }
  };

  const [NewQuestion, setNewQuestion] = useState("");
  const [NewAnswer, setNewAnswer] = useState("");
  const [renderGame, setRender] = useState(false);
  const [arrayInput, setArrayInput] = useState([]);
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [cardsCreated, setCardsCreated] = useState(0);
  const arrayLength = arrayInput.length;
  const handleCreateNewCard = (e) => {
    e.preventDefault();
    // setAddNewCard(!addNewCard);
    if (numberOfCards > cardsCreated) {
      createCard();
    }
  };

  const createCard = () => {
    if (
      NewQuestion !== "" &&
      NewQuestion != null &&
      NewAnswer !== "" &&
      NewAnswer != null
    ) {
      let newInput = { question: NewQuestion, answer: NewAnswer };
      setArrayInput((prevInputs) => [...prevInputs, newInput]);
      setCardsCreated(cardsCreated + 1);
    }
    setNewQuestion("");
    setNewAnswer("");
  };

  useEffect(() => {
    if (numberOfCards > 0) {
      const checker = cardsCreated - numberOfCards;
      if (checker === 0) {
        handleCreateOwn();
      }
    }
  }, [cardsCreated]);

  const handleNumberOfCards = (e) => {
    //prevent negative numbers
    if (e.target.value < 0) {
      e.target.value = 0;
    } else if (e.target.value > 50) {
      e.target.value = 50;
    }
    setNumberOfCards(e.target.value);
  };

  const handleCancel = () => {
    setCreateOwn(false);
    setRender(false);
    setShowSoccerCards(true);
    setNewQuestion("");
    setNewAnswer("");
    setCurrentStreak(0);
    setLongestStreak(0);
    clearInputField();
    setCardsCreated(0);
    setArrayInput([]);
    setNumberOfCards(0);
  };

  const [gameSaved, setSavedGame] = useState(false);
  const [savedGameArrLength, setSavedGameArrLength] = useState(0);
  const handleSaveGame = () => {
    //save the created cards (arrayInput) to local storage
    localStorage.setItem("savedGame", JSON.stringify(arrayInput));
    const savedGameArray = JSON.parse(localStorage.getItem("savedGame"));
    setSavedGameArray(savedGameArray);
    setSavedGameArrLength(savedGameArray.length);
    setSavedGame(true);
  };

  const [showSavedGame, setShowSavedGame] = useState(false);
  const [savedGameArray, setSavedGameArray] = useState([]);

  const displaySavedGame = () => {
    setShowSavedGame(true);
    setShowSoccerCards(false);
    setShowTennisCards(false);
    setCreateOwn(false);
    setRender(false);
    setCurrentStreak(0);
    setLongestStreak(0);
    clearInputField();
    setCardsCreated(0);
    setCurrentCard(0);
    setPrevAnswer("");
    // console.log(savedGameArray);
  };

  //settting Background image of the app
  if (showSoccerCards) {
    document.body.style.backgroundImage = `url(${soccerBackground})`;
  } else if (showTennisCards) {
    document.body.style.backgroundImage = `url(${tennisBackground})`;
  } else if (renderGame || createOwn || showSavedGame) {
    document.body.style.backgroundImage = `url(${creatorBackground})`;
  }

  //Checking if the answer is correct
  const checkAnswer = () => {
    setPrevAnswer(answer);
    if (showSoccerCards) {
      if (
        soccerCards[currentCard].answer
          .toLocaleLowerCase()
          .includes(answer.toLocaleLowerCase()) &&
        answer !== "" &&
        prevAnswer !== answer
      ) {
        setCurrentStreak(currentStreak + 1);
        showGreen();
      } else {
        if (prevAnswer != answer && answer !== "") {
          if (currentStreak > longestStreak) {
            setLongestStreak(currentStreak);
          }
          setCurrentStreak(0);
          showRed();
        }
      }
    } else if (showTennisCards) {
      if (
        tennisCards[currentCard].answer
          .toLocaleLowerCase()
          .includes(answer.toLocaleLowerCase()) &&
        answer !== "" &&
        prevAnswer !== answer
      ) {
        setCurrentStreak(currentStreak + 1);
        showGreen();
      } else {
        if (prevAnswer != answer && answer !== "") {
          if (currentStreak > longestStreak) {
            setLongestStreak(currentStreak);
          }
          setCurrentStreak(0);
          showRed();
        }
      }
    } else if (renderGame) {
      if (
        arrayInput[currentCard].answer
          .toLocaleLowerCase()
          .includes(answer.toLocaleLowerCase()) &&
        answer !== "" &&
        prevAnswer !== answer
      ) {
        setCurrentStreak(currentStreak + 1);
        showGreen();
      } else {
        if (prevAnswer != answer && answer !== "") {
          if (currentStreak > longestStreak) {
            setLongestStreak(currentStreak);
          }
          setCurrentStreak(0);
          showRed();
        }
      }
    }else if (displaySavedGame) {
      if (
        savedGameArray[currentCard].answer
          .toLocaleLowerCase()
          .includes(answer.toLocaleLowerCase()) &&
        answer !== "" &&
        prevAnswer !== answer
      ) {
        setCurrentStreak(currentStreak + 1);
        showGreen();
      } else {
        if (prevAnswer != answer && answer !== "") {
          if (currentStreak > longestStreak) {
            setLongestStreak(currentStreak);
          }
          setCurrentStreak(0);
          showRed();
        }
      }
    }
  };
 
  const handleNext = () => {
    if (showSoccerCards) {
      if (currentCard < soccerArrLenght - 1) {
        setCurrentCard(currentCard + 1);
        setIsFlipping(true);
        setTimeout(() => {
          setIsFlipping(false);
        }, 700);
      }
    } else if (showTennisCards) {
      if (currentCard < tennisArrLength - 1) {
        setCurrentCard(currentCard + 1);
        setIsFlipping(true);
        setTimeout(() => {
          setIsFlipping(false);
        }, 700);
      }
    } else if (renderGame) {
      if (currentCard < arrayLength - 1) {
        setCurrentCard(currentCard + 1);
        setIsFlipping(true);
        setTimeout(() => {
          setIsFlipping(false);
        }, 700);
      }
    } else if (showSavedGame) {
      if (currentCard < savedGameArrLength - 1) {
        setCurrentCard(currentCard + 1);
        setIsFlipping(true);
        setTimeout(() => {
          setIsFlipping(false);
        }, 700);
      }
    }

    clearInputField();
  };
  const handleBack = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipping(false);
      }, 700);
    }
    clearInputField();
  };

  if (createOwn) {
    return (
      <div className="createOwn">
        <h1>Create your own cards</h1>
        <form onSubmit={preventD} className="createOwn-form">
          <label>Number of Cards</label>
          <input
            type="number"
            onChange={handleNumberOfCards}
            id="numberOfCards"
          />
          <h3># Cards created: {cardsCreated}</h3>

          <span className="cardsContent">
            <input
              onChange={(e) => setNewQuestion(e.target.value)}
              value={NewQuestion}
              placeholder="Question"
            />
            <input
              onChange={(e) => setNewAnswer(e.target.value)}
              value={NewAnswer}
              placeholder="Answer"
            />
          </span>
          <span className="creator-btns">
            <button id="cancelBtn" onClick={handleCancel}>
              Cancel
            </button>
            <button id="addBtn" onClick={handleCreateNewCard}>
              Add
            </button>
          </span>
        </form>
      </div>
    );
  } else if (renderGame) {
    return (
      <div className="App">
        <StatsDashboard
          color={color}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          numOfCard={arrayInput.length}
        />

        <FlashCard
          data={arrayInput}
          currentCard={currentCard}
          isflipped={isflipped}
          handleClick={handleClick}
          isflipping={isflipping}
        />

        <Controls
          preventD={preventD}
          handleInputChange={handleInputChange}
          answer={answer}
          checkAnswer={checkAnswer}
          handleBack={handleBack}
          handleNext={handleNext}
          handleShuffle={handleShuffle}
        />

        <DropDown
          displaySoccerCards={displaySoccerCards}
          displayTennisCards={displayTennisCards}
          showCreateOwn={showCreateOwn}
          isGameSaved={gameSaved}
          displaySavedGame={displaySavedGame}
        />
        <button className="saveQuizzBtn dropbtn" onClick={handleSaveGame}>
          Save Quiz
        </button>

        <p className="copyRight">&copy; Jassem Toumi</p>
      </div>
    );
  } else if (showSoccerCards) {
    return (
      <div className="App">
        <StatsDashboard
          color={color}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          numOfCard={soccerArrLenght}
        />

        <FlashCard
          data={soccerCards}
          currentCard={currentCard}
          isflipped={isflipped}
          handleClick={handleClick}
          isflipping={isflipping}
        />

        <Controls
          preventD={preventD}
          handleInputChange={handleInputChange}
          answer={answer}
          checkAnswer={checkAnswer}
          handleBack={handleBack}
          handleNext={handleNext}
          handleShuffle={handleShuffle}
        />

        <DropDown
          displaySoccerCards={displaySoccerCards}
          displayTennisCards={displayTennisCards}
          showCreateOwn={showCreateOwn}
          isGameSaved={gameSaved}
          displaySavedGame={displaySavedGame}
        />

        <p className="copyRight">&copy; Jassem Toumi</p>
      </div>
    );
  } else if (showTennisCards) {
    return (
      <div className="App">
        <StatsDashboard
          color={color}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          numOfCard={tennisArrLength}
        />
        <FlashCard
          data={tennisCards}
          currentCard={currentCard}
          isflipped={isflipped}
          handleClick={handleClick}
          isflipping={isflipping}
        />
        <Controls
          preventD={preventD}
          handleInputChange={handleInputChange}
          answer={answer}
          checkAnswer={checkAnswer}
          handleBack={handleBack}
          handleNext={handleNext}
          handleShuffle={handleShuffle}
        />

        <DropDown
          displaySoccerCards={displaySoccerCards}
          displayTennisCards={displayTennisCards}
          showCreateOwn={showCreateOwn}
          isGameSaved={gameSaved}
          displaySavedGame={displaySavedGame}
        />

        <p className="copyRight">&copy; Jassem Toumi</p>
      </div>
    );
  } else if (showSavedGame) {
    return (
      <div className="App">
        <StatsDashboard
          color={color}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          numOfCard={savedGameArray.length}
        />
        <FlashCard
          data={savedGameArray}
          currentCard={currentCard}
          isflipped={isflipped}
          handleClick={handleClick}
          isflipping={isflipping}
        />
        <Controls
          preventD={preventD}
          handleInputChange={handleInputChange}
          answer={answer}
          checkAnswer={checkAnswer}
          handleBack={handleBack}
          handleNext={handleNext}
          handleShuffle={handleShuffle}
        />

        <DropDown
          displaySoccerCards={displaySoccerCards}
          displayTennisCards={displayTennisCards}
          showCreateOwn={showCreateOwn}
          isGameSaved={gameSaved}
          displaySavedGame={displaySavedGame}
        />

        <p className="copyRight">&copy; Jassem Toumi</p>
      </div>
    );
  }
}

export default App;
