// import { useState, useEffect } from "react";
// import "./App.css";
// import FlashCard from "./components/flashCard.jsx";
// import soccerCards from "./api/soccerCards.jsx";
// import tennisCards from "./api/tennisCards.jsx";
// import soccerBackground from "./assets/soccerBackground.jpg";
// import tennisBackground from "./assets/tennisBackground.jpg";


// const soccerArrLenght = soccerCards.length;
// const tennisArrLength = tennisCards.length;
// function App() {
//   const [isflipping, setIsFlipping] = useState(false);
//   const [currentCard, setCurrentCard] = useState(0);
//   const handleNext = () => {
//     if (
//       currentCard < soccerArrLenght - 1 ||
//       currentCard < tennisArrLength - 1
//     ) {
//       setCurrentCard(currentCard + 1);
//       setIsFlipping(true);
//       setTimeout(() => {
//         setIsFlipping(false);
//       }, 700);
//     }
//     clearInputField();
//   };
//   const handleBack = () => {
//     if (currentCard > 0) {
//       setCurrentCard(currentCard - 1);
//       setIsFlipping(true);
//       setTimeout(() => {
//         setIsFlipping(false);
//       }, 700);
//     }
//     clearInputField();
//   };

//   const [isflipped, updateFlipState] = useState(false);
//   const handleClick = () => {
//     updateFlipState(!isflipped);
//   };

//   useEffect(() => {
//     updateFlipState(false); //reset the flip state when the card changes
//   }, [currentCard]);

//   const [showSoccerCards, setShowSoccerCards] = useState(true);
//   const [showTennisCards, setShowTennisCards] = useState(false);
//   const displaySoccerCards = () => {
//     if (showSoccerCards === false && showTennisCards === true) {
//       setShowSoccerCards(true);
//       setShowTennisCards(false);
//       setCurrentStreak(0);
//       setLongestStreak(0);
//       clearInputField();
//     }
//   };
//   const displayTennisCards = () => {
//     if (showTennisCards === false && showSoccerCards === true) {
//       setShowTennisCards(true);
//       setShowSoccerCards(false);
//       setCurrentStreak(0);
//       setLongestStreak(0);
//       clearInputField();
//     }
//   };

//   useEffect(() => {
//     setCurrentCard(0);
//   }, [showSoccerCards] || [showTennisCards] || [renderGame]);

//   document.body.style.backgroundImage = `url(${
//     showSoccerCards ? soccerBackground : tennisBackground
//   })`;

//   const preventD = (e) => {
//     e.preventDefault();
//   };
//   const [answer, setAnswer] = useState("");
//   const [prevAnswer, setPrevAnswer] = useState("");

//   const handleInputChange = (e) => {
//     setAnswer(e.target.value);
//   };

//   const clearInputField = () => {
//     setAnswer("");
//   };

//   const checkAnswer = () => {
//     setPrevAnswer(answer);
//     if (showSoccerCards) {
//       if (
//         soccerCards[currentCard].answer
//           .toLocaleLowerCase()
//           .includes(answer.toLocaleLowerCase()) &&
//         answer !== "" &&
//         prevAnswer !== answer
//       ) {
//         setCurrentStreak(currentStreak + 1);
//         showGreen();
//       } else {
//         if (prevAnswer != answer && answer !== "") {
//           if (currentStreak > longestStreak) {
//             setLongestStreak(currentStreak);
//           }
//           setCurrentStreak(0);
//           showRed();
//         }
//       }
//     } else if (showTennisCards) {
//       if (
//         tennisCards[currentCard].answer
//           .toLocaleLowerCase()
//           .includes(answer.toLocaleLowerCase()) &&
//         answer !== "" &&
//         prevAnswer !== answer
//       ) {
//         setCurrentStreak(currentStreak + 1);
//         showGreen();
//       } else {
//         if (prevAnswer != answer && answer !== "") {
//           if (currentStreak > longestStreak) {
//             setLongestStreak(currentStreak);
//           }
//           setCurrentStreak(0);
//           showRed();
//         }
//       }
//     }else if (renderGame){
//       if (
//         renderGame[currentCard].answer
//           .toLocaleLowerCase()
//           .includes(answer.toLocaleLowerCase()) &&
//         answer !== "" &&
//         prevAnswer !== answer
//       ) {
//         setCurrentStreak(currentStreak + 1);
//         showGreen();
//       } else {
//         if (prevAnswer != answer && answer !== "") {
//           if (currentStreak > longestStreak) {
//             setLongestStreak(currentStreak);
//           }
//           setCurrentStreak(0);
//           showRed();
//         }
//       }
//     }
//   };

//   const [currentStreak, setCurrentStreak] = useState(0);
//   const [longestStreak, setLongestStreak] = useState(0);
//   const [color, setColor] = useState("#ffffff");
//   const showGreen = () => {
//     setColor("#00ff00");
//     const timer = setTimeout(() => {
//       setColor("#ffffff");
//     }, 500);
//     return () => clearTimeout(timer);
//   };
//   const showRed = () => {
//     setColor("#ff0000");
//     const timer = setTimeout(() => {
//       setColor("#ffffff"); // Return the background color to white after 5ms
//       // setCorrect(''); // Reset the state variable to trigger the effect again
//     }, 500);
//     return () => clearTimeout(timer);
//   };

//   // impelementing Fisher-Yates shuffle algorithm
//   const shuffle = (array) => {
//     let currentIndex = array.length,
//       randomIndex;
//     while (0 !== currentIndex) {
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
//       //destructuring
//       [array[currentIndex], array[randomIndex]] = [
//         array[randomIndex],
//         array[currentIndex],
//       ];
//     }
//     return array;
//   };
//   const handleShuffle = () => {
//     if (showSoccerCards) {
//       shuffle(soccerCards);
//     } else if (showTennisCards) {
//       shuffle(tennisCards);
//     }
//   };

//   const [createOwn, setCreateOwn] = useState(false);
//   const handleCreateOwn = () => {
//     setCreateOwn(!createOwn);
//   };

//   const [NewQuestion, setQuestion] = useState("");
//   const [NewAnswer, setNewAnswer] = useState("");
//   const [renderGame, setRender] = useState(false);
//   const [arrayInput, setArrayInput] = useState([]);
//   const [numberOfCards, setNumberOfCards] = useState(0);
//   const[cardsCreated, setCardsCreated] = useState(0);
//   const handleCreateNewCard = (e) => {
//     e.preventDefault();
//     // setAddNewCard(!addNewCard);
//     if(numberOfCards> cardsCreated){
//       createCard();
//     }
//   };


//   const createCard = () => {
//     if (NewQuestion !== "" && NewAnswer !== "") {
//       let newInput = { question: NewQuestion, answer: NewAnswer };
//       setArrayInput((prevInputs) => [...prevInputs, newInput]);
//       setCardsCreated(cardsCreated + 1);
//     }

//     setQuestion("");
//     setNewAnswer("");
//   };

//   useEffect(() => {
//     console.log("cards created: " + cardsCreated);
//     console.log("number of cards: " + numberOfCards);
//     if(numberOfCards > 0){
//     const checker = cardsCreated - numberOfCards;
//     if (checker === 0) {
//       setRender(!renderGame);
//     }
//   }
//   }, [cardsCreated]);

//   const handleNumberOfCards = (e) => {
//     //prevent negative numbers
//     if (e.target.value < 0) {
//       e.target.value = 0;
//     }else if(e.target.value > 50){
//       e.target.value = 50;
//     }
//     setNumberOfCards(e.target.value);
//   };


//     if (createOwn) {
//       return (
//         <div className="createOwn">
//           <h1>Create your own cards</h1>
//           <form onSubmit={preventD} className="createOwn-form">
//             <label>Number of Cards</label>
//             <input
//               type="number"
//               onChange={handleNumberOfCards}
//               id="numberOfCards"
              
//             />
//             <h3># Cards created: {cardsCreated}</h3>
  
//             <span className="cardsContent">
//             <input
//               onChange={(e) => setQuestion(e.target.value)}
//               value={NewQuestion}
//               placeholder="Question"
//             />
//             <input
//               onChange={(e) => setNewAnswer(e.target.value)}
//               value={NewAnswer}
//               placeholder="Answer"
//             />
//             </span>
//             <span className="creator-btns">
//             <button id="cancelBtn" onClick={handleCreateOwn}>Cancel</button>
//             <button id="addBtn" onClick={handleCreateNewCard}>Add</button>
//             </span>
           
//           </form>
//         </div>
//       );
//     } else if(renderGame) {
//       return (
//         <div className="App">
//           <div className="title" style={{ backgroundColor: color }}>
//             <h1>My Quizz!</h1>
//             <h2>
//               It is time to test my knowledge!
//             </h2>
//             <h3>
//               Number of cards:{" " + arrayInput.length}
              
//             </h3>
//             <div className="stats">
//               <h3>Current Streak: {currentStreak}</h3>
//               <h3>Longest Streak: {longestStreak}</h3>
//             </div>
//           </div>
//           <FlashCard
//             data={arrayInput}
//             currentCard={currentCard}
//             isflipped={isflipped}
//             handleClick={handleClick}
//             isflipping={isflipping}
//           />
//           <div className="form-container">
//             <form onSubmit={preventD}>
//               <input
//                 onChange={handleInputChange}
//                 type="text"
//                 placeholder="Enter your answer"
//                 value={answer}
//               />
//             </form>
//             <button className="checkBtn" onClick={checkAnswer}>
//               Check
//             </button>
//           </div>
  
//           <div className="btnS">
//             <button onClick={handleBack} className="nextBtn">
//               Back
//             </button>
//             <button onClick={handleNext} className="nextBtn">
//               Next
//             </button>
//           </div>
//           <button onClick={handleShuffle} className="shuffleBtn">
//             Shuffle
//           </button>
  
//           <div className="dropdown">
//             <button className="dropbtn">Select Topic</button>
//             <div className="dropdown-content">
//               <span onClick={displaySoccerCards}>Soccer</span>
//               <span onClick={displayTennisCards}>Tennis</span>
//               <span onClick={handleCreateOwn}>Create your own</span>
//             </div>
//           </div>
//           <p className="copyRight">&copy; Jassem Toumi</p>
//         </div>
//       );
//     }else if(showSoccerCards){
//       return (
//         <div className="App">
//           <div className="title" style={{ backgroundColor: color }}>
//             <h1>Guess Who?</h1>
//             <h2>
//               Test your knowledge in soccer
//             </h2>
//             <h3>
//               Number of cards:{" " + soccerArrLenght}
//             </h3>
//             <div className="stats">
//               <h3>Current Streak: {currentStreak}</h3>
//               <h3>Longest Streak: {longestStreak}</h3>
//             </div>
//           </div>
//           <FlashCard
//             data={soccerCards}
//             currentCard={currentCard}
//             isflipped={isflipped}
//             handleClick={handleClick}
//             isflipping={isflipping}
//           />
//           <div className="form-container">
//             <form onSubmit={preventD}>
//               <input
//                 onChange={handleInputChange}
//                 type="text"
//                 placeholder="Enter your answer"
//                 value={answer}
//               />
//             </form>
//             <button className="checkBtn" onClick={checkAnswer}>
//               Check
//             </button>
//           </div>
  
//           <div className="btnS">
//             <button onClick={handleBack} className="nextBtn">
//               Back
//             </button>
//             <button onClick={handleNext} className="nextBtn">
//               Next
//             </button>
//           </div>
//           <button onClick={handleShuffle} className="shuffleBtn">
//             Shuffle
//           </button>
  
//           <div className="dropdown">
//             <button className="dropbtn">Select Topic</button>
//             <div className="dropdown-content">
//               <span onClick={displaySoccerCards}>Soccer</span>
//               <span onClick={displayTennisCards}>Tennis</span>
//               <span onClick={handleCreateOwn}>Create your own</span>
//             </div>
//           </div>
//           <p className="copyRight">&copy; Jassem Toumi</p>
//         </div>
//       )
//     }else if(showTennisCards){
//       return (
//         <div className="App">
//           <div className="title" style={{ backgroundColor: color }}>
//             <h1>Guess Who?</h1>
//             <h2>
//               Test your knowledge in tennis
//             </h2>
//             <h3>
//               Number of cards:{" " + tennisArrLength}
//             </h3>
//             <div className="stats">
//               <h3>Current Streak: {currentStreak}</h3>
//               <h3>Longest Streak: {longestStreak}</h3>
//             </div>
//           </div>
//           <FlashCard
//             data={tennisCards}
//             currentCard={currentCard}
//             isflipped={isflipped}
//             handleClick={handleClick}
//             isflipping={isflipping}
//           />
//           <div className="form-container">
//             <form onSubmit={preventD}>
//               <input
//                 onChange={handleInputChange}
//                 type="text"
//                 placeholder="Enter your answer"
//                 value={answer}
//               />
//             </form>
//             <button className="checkBtn" onClick={checkAnswer}>
//               Check
//             </button>
//           </div>
  
//           <div className="btnS">
//             <button onClick={handleBack} className="nextBtn">
//               Back
//             </button>
//             <button onClick={handleNext} className="nextBtn">
//               Next
//             </button>
//           </div>
//           <button onClick={handleShuffle} className="shuffleBtn">
//             Shuffle
//           </button>
  
//           <div className="dropdown">
//             <button className="dropbtn">Select Topic</button>
//             <div className="dropdown-content">
//               <span onClick={displaySoccerCards}>Soccer</span>
//               <span onClick={displayTennisCards}>Tennis</span>
//               <span onClick={handleCreateOwn}>Create your own</span>
//             </div>
//           </div>
//           <p className="copyRight">&copy; Jassem Toumi</p>
//         </div>
//       )
//     }


 
// }

// export default App;
