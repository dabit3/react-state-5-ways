import React, { useState } from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux'

function App() {  
  const [input, setInput] = useState('')
  const notes = useSelector(state => state.notes)
  const dispatch = useDispatch()
  function onCreateNote() {
    dispatch({ type: 'CREATE_NOTE', note: input })
    setInput('')
  }
  return (
    <div>
      <h1>My notes app</h1>
      <button onClick={onCreateNote}>Create Note</button>
      <input value={input} onChange={e => setInput(e.target.value)} />
      { notes.map(note => <p key={note}>Note: {note}</p>) }
    </div>
  );
}

function notesReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_NOTE':
      return [...state, action.note]
    default:
      return state
  }
}

const reducers = combineReducers({ notes: notesReducer })
const store = createStore(reducers)

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Main