import React, { useState, useEffect } from "react"
import "./App.css" // Import the CSS file

const NoteCalculator = () => {
  const [notes, setNotes] = useState({
    20: 0,
    10: 0,
    5: 0,
    2: 0,
    1: 0,
    0.5: 0,
    0.2: 0,
    0.1: 0,
    0.05: 0,
  })
  const [total, setTotal] = useState(0)
  const [exceedsThreshold, setExceedsThreshold] = useState(false)
  const [notesToTakeOut, setNotesToTakeOut] = useState({})
  const [totalAfterDrop, setTotalAfterDrop] = useState(0)

  useEffect(() => {
    document.title = "Note Calculator" // Change the title when the component mounts
  }, [])

  const calculateTotal = () => {
    let sum = 0
    for (const [note, count] of Object.entries(notes)) {
      sum += parseFloat(note) * count
    }
    setTotal(sum)
    if (sum > 300) {
      setExceedsThreshold(true)
      calculateNotesToTakeOut(sum - 300)
    } else {
      setExceedsThreshold(false)
      setNotesToTakeOut({})
      setTotalAfterDrop(sum)
    }
  }

  const calculateNotesToTakeOut = (amount) => {
    const notesToTakeOut = {}
    const allowedNotes = [
      { note: 20, minRemaining: 2 },
      { note: 10, minRemaining: 5 },
      { note: 5, minRemaining: 5 },
    ]
    let remainingAmount = amount

    allowedNotes.forEach(({ note, minRemaining }) => {
      const availableToTakeOut = notes[note] - minRemaining
      if (availableToTakeOut > 0) {
        const noteCount = Math.min(
          Math.floor(remainingAmount / note),
          availableToTakeOut
        )
        if (noteCount > 0) {
          notesToTakeOut[note] = noteCount
          remainingAmount -= noteCount * note
        }
      }
    })

    setNotesToTakeOut(notesToTakeOut)

    // Calculate the new total after taking out the necessary notes
    let newTotal = total
    for (const [note, count] of Object.entries(notesToTakeOut)) {
      newTotal -= parseFloat(note) * count
    }

    // Ensure the new total is less than 300
    if (newTotal >= 300) {
      const sortedNotes = allowedNotes.sort((a, b) => b.note - a.note)
      sortedNotes.forEach(({ note }) => {
        while (newTotal >= 300 && notesToTakeOut[note] > 0) {
          notesToTakeOut[note]--
          newTotal -= note
        }
      })
    }

    setTotalAfterDrop(newTotal)
  }

  const handleNoteChange = (e) => {
    const { name, value } = e.target
    const newNotes = { ...notes, [name]: parseInt(value) || 0 }
    setNotes(newNotes)
    calculateTotal()
  }

  return (
    <div>
      <h1>Note Calculator</h1>
      <div className="container notes-container">
        <div>
          <span>$20:</span>
          <input
            type="number"
            name="20"
            value={notes["20"]}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          <span>$10:</span>
          <input
            type="number"
            name="10"
            value={notes["10"]}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          <span>$5:</span>
          <input
            type="number"
            name="5"
            value={notes["5"]}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          <span>$2:</span>
          <input
            type="number"
            name="2"
            value={notes["2"]}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          <span>$1:</span>
          <input
            type="number"
            name="1"
            value={notes["1"]}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          <span>$0.5:</span>
          <input
            type="number"
            name="0.5"
            value={notes["0.5"]}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          <span>$0.2:</span>
          <input
            type="number"
            name="0.2"
            value={notes["0.2"]}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          <span>$0.1:</span>
          <input
            type="number"
            name="0.1"
            value={notes["0.1"]}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          <span>$0.05:</span>
          <input
            type="number"
            name="0.05"
            value={notes["0.05"]}
            onChange={handleNoteChange}
          />
        </div>
      </div>
      <div className="total">Total: ${total.toFixed(2)}</div>
      {exceedsThreshold && (
        <div className="notes-to-take-out container ">
          <h2>To make less than 300:</h2>
          {Object.entries(notesToTakeOut).map(([note, count]) => (
            <div key={note}>{`${count} notes of $${note}`}</div>
          ))}
          <div className="total-after-drop">
            Total after Drop: ${totalAfterDrop.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteCalculator
