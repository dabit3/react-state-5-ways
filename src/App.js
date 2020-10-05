import React, { useState } from 'react';
import { RecoilRoot, atom, useRecoilState } from 'recoil';

const notesState = atom({
  key: 'notesState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default function Main() {
  console.log('main')
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

function App() {
  const [notes, setNotes] = useRecoilState(notesState);
  const [input, setInput] = useState('')
  function createNote() {
    const notesArray = [...notes, input]
    setNotes(notesArray)
    setInput('')
  }
  return (
    <div>
      <h1>My notes app</h1>
      <button onClick={createNote}>Create Note</button>
      <input value={input} onChange={e => setInput(e.target.value)} />
      { notes.map(note => <p key={note}>Note: {note}</p>) }
    </div>
  );
}