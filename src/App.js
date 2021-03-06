import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import {useState, useEffect} from "react"
import Confetti from 'react-confetti'

export default function App() {
//put dots on the dice 
//track the number of rolls
//track the time it took to win 
//save best time to local storage

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
       const allHeld = dice.every(die => die.isHeld)
       const firstValue = dice[0].value 
       const allSameValue = dice.every(die => die.value === firstValue)
       if(allHeld && allSameValue){
           setTenzies(true)
           console.log("You won")
       }
    }, [dice])
   
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    function rollDice() {
        if(!tenzies){
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        }else{
            setTenzies(false)
            setDice(allNewDice())
        }
       
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
            {tenzies && <Confetti /> }
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all the dice are the same. Click each die to freese it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}