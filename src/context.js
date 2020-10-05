import React, { useState, createContext, useContext } from 'react';

const NotesContext = createContext();

export default function Main() {
  const [notes, setNotes] = useState([])
  function createNote(note) {
    const notesArray = [...notes, note]
    setNotes(notesArray)
  }
  return (
    <NotesContext.Provider value={{ notes, createNote }}>
      <App />
    </NotesContext.Provider>
  );
}

function App() {
  const { notes, createNote } = useContext(NotesContext);
  const [input, setInput] = useState('')
  function onCreateNote() {
    createNote(input)
    setInput('')
  }
  console.log('notes: ', notes)
  return (
    <div>
      <h1>My notes app</h1>
      <button onClick={onCreateNote}>Create Note</button>
      <input value={input} onChange={e => setInput(e.target.value)} />
      { notes.map(note => <p key={note}>Note: {note}</p>) }
    </div>
  );
}