import Die from "@/types/die";
import { Karla } from "next/font/google";
import React, { useEffect, useState } from "react";

const karla700 = Karla({ subsets: ['latin'], weight: '700' })
const karla400 = Karla({ subsets: ['latin'], weight: '400' })
const DIE_COUNT = 10

export default function Main() {
  const [dice, setDice] = useState<Array<Die>>([])

  useEffect(() => {
    for (let x = 0; x < DIE_COUNT; x++) {
      const newDie = { id: x, value: 1, isFrozen: false }
      setDice(prevDice => ([...prevDice, newDie]))
    }
  }, [])

  const diceButtons = dice.map((die: Die) => {
    return (
      <button key={die.id}
        className={`dice ${karla700.className} ${die.isFrozen && 'frozen'}`}
        data-key={die.id}
        onClick={toggleFreeze}>
        { die.value }
      </button>
    )
  })


  function toggleFreeze(event: React.MouseEvent<HTMLButtonElement>) {
    const index = Number(event.currentTarget.getAttribute('data-key'))
    const updatedDice = dice.map((die) => {
      if (die.id !== index) {
        return die
      }

      return { ...die, isFrozen: !die.isFrozen }
    })

    setDice(updatedDice)
  }

  function roll() {
    const updatedDice = dice.map((die) => {
      if (die.isFrozen) {
        return die
      }

      const newValue = Math.floor(Math.random() * 6) + 1
      return { ...die, value: newValue }
    })

    setDice(updatedDice)
  }

  return (
    <main className={karla400.className}>
      <h2 className={karla700.className}>Tenzies</h2>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className="dice-container">{diceButtons}</div>
      <button className={`btn-roll ${karla700.className}`} onClick={roll}>Roll</button>
    </main>
  )
}
