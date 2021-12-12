import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"

export default function App() {


    const [dice, setDice] = React.useState(allNewDice())
    
   
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
    }
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie() )
        }
        return newDice
    }
    function holdDie(id) {
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? {...die, isHeld: !die.isHeld} : die
      }))
    }
    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDie(die.id)} />
    ))
    
    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all the dice are the same. Click each die to freese it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}