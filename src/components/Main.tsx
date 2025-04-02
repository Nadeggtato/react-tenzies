import Die from "@/types/die";
import { Karla } from "next/font/google";
import React, { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "@react-hook/window-size";
import ReactConfetti from "react-confetti";
import { count } from "console";

const karla700 = Karla({ subsets: ['latin'], weight: '700' })
const karla400 = Karla({ subsets: ['latin'], weight: '400' })
const DIE_COUNT = 10

export default function Main() {
  const [ width, height ] = useWindowSize()
  const [ dice, setDice ] = useState<Array<Die>>([])
  const [ rollCount, setRollCount ] = useState<number>(0)

  const isClear = useMemo(() => {
    let isSame = false
    let isFrozen = false

    for (let x = 1; x < dice.length; x++) {
      isSame = (dice[x].value === dice[x - 1].value)

      if (x === 1) {
        isFrozen = dice[x-1].isFrozen && dice[x].isFrozen
      } else {
        isFrozen = dice[x].isFrozen
      }

      if (!isSame || !isFrozen) {
        break
      }
    }

    return rollCount > 0 && isSame && isFrozen
  }, [dice])

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
    if (rollCount <= 0) {
      return
    }

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
    setRollCount(prevRollCount => prevRollCount + 1)
  }

  function reinitialize() {
    const updatedDice = dice.map((die) => {
      return { ...die, value: 1, isFrozen: false }
    })

    setDice(updatedDice)
    setRollCount(0)
  }

  return (
    <main className={karla400.className}>
      { rollCount > 0 && isClear && <ReactConfetti width={width} height={height}/> }
      <h2 className={karla700.className}>Tenzies</h2>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className="dice-container">{diceButtons}</div>
      <button className={`btn-roll ${karla700.className}`} onClick={isClear ? reinitialize : roll}>
        { isClear ? 'New Game' : 'Roll' }
      </button>
    </main>
  )
}
