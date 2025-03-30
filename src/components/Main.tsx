import Die from "@/types/die";
import { Karla } from "next/font/google";
import { useEffect, useState } from "react";

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
      <div key={die.id} className={`dice ${karla700.className} ${die.isFrozen && 'frozen'}`}>{ die.value }</div>
    )
  })

  function log() {
    console.log(dice)
  }

  return (
    <main className={karla400.className}>
      <h2 className={karla700.className}>Tenzies</h2>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className="dice-container">{diceButtons}</div>
      <button className={`btn-roll ${karla700.className}`}>Roll</button>
    </main>
  )
}
