import { useState } from 'react'
import './App.css'
import FlashCard from './components/flashCard.jsx'
import data from './api/data.jsx'

function App() {

  return (
    <div className="App">
      <div className='title'>
      <h1>Guess Who?</h1>
      <h2>Test your knowledge in soccer</h2>
      </div>

      {data.map((data)=>(
        <FlashCard
         question={data.question}
         answer={data.answer}
          />
      ))}
      
    </div>
  )
}

export default App
