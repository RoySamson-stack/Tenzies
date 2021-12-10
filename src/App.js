import React from "react";
import Die from "./Die";
import {nanoid} from "nanoid";


export default function App(){
  
  const [dice, setDice] = React.useState(allNewDice);

 function allNewDice(){
   const newDice = [];
  for (let i = 0; i < 10; i++) {
    newDice.push({
      value: Math.ceil(Math.random() * 6),
       isHeld: false,
       id: nanoid()
      })
  }
  return newDice;
  }
  const diceElements = dice.map(die => <Die value={die} />);

   return(
    //map over the array of dice and return a Die component for each one  
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="rolldice" onClick={() => setDice(allNewDice())}>Roll Dice</button>
    </main>
  )
}