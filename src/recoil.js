import React, { useState } from 'react';
import { RecoilRoot, atom, useRecoilState, selector, useRecoilValue } from 'recoil';

const notesState = atom({
  key: 'notesState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const todosState = atom({
  key: 'todosState', // unique ID (with respect to other atoms/selectors)
  default: [{ name: "todo1", completed: true}, {name: "todo2", completed: false}], // default value (aka initial value)
});

const completedTodosState = selector({
  key: 'completedTodosState',
  get: ({get}) => {
    const todos = get(todosState);
    return todos.filter(todo => todo.completed)
  }
});

export default function Main() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

function App() {
  const [notes, setNotes] = useRecoilState(notesState);
  const [todos, setTodos] = useRecoilState(todosState);

  const completedTodos = useRecoilValue(completedTodosState)
  
  const [input, setInput] = useState('')
  function createNote() {
    const notesArray = [...notes, input]
    setNotes(notesArray)
    setInput('')
  }
  console.log('completedTodos: ', completedTodos)
  console.log('todos: ', todos)
  return (
    <div>
      <h1>My notes app</h1>
      <button onClick={createNote}>Create Note</button>
      <input value={input} onChange={e => setInput(e.target.value)} />
      { notes.map(note => <p key={note}>Note: {note}</p>) }
    </div>
  );
}