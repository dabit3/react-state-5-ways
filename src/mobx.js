import React, { useState } from 'react'
import { observer } from "mobx-react-lite"
import { makeAutoObservable } from 'mobx'

class NoteStore {
  notes = []
  createNote(note) {
    this.notes = [...this.notes, note]
  }
  constructor() {
    makeAutoObservable(this)
  }
}

const Notes = new NoteStore()

const App = observer(() => {
  const [input, setInput] = useState('')
  const { notes } = Notes
  function onCreateNote() {
    Notes.createNote(input)
    setInput('')
  }
  return (
    <div>
      <h1>My notes app</h1>
      <button onClick={onCreateNote}>Create Note</button>
      <input value={input} onChange={e => setInput(e.target.value)} />
      { notes.map(note => <p key={note}>Note: {note}</p>) }
    </div>
  )
})

const Main = () => (
  <div>
    <App />
    <Listener />
  </div>
)

const Listener = observer(() => (<h1>{Notes.notes[0] || "No note"}</h1>))

export default Main