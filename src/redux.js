import React, { useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { configureStore, createReducer, combineReducers } from '@reduxjs/toolkit'

function App() {  
  const [input, setInput] = useState('')

  /* useSelector allows you to retrieve the state that you'd like to work with, in our case the notes array */
  const notes = useSelector(state => state.notes)

  /* dispatch allows us to send updates to the store */
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

/* Here we create a reducer that will update the notes array when the `CREATE_NOTE` action is called */
const notesReducer = createReducer([], {
  'CREATE_NOTE': (state, action) => [...state, action.note]
})

/* Here we create the store using the reducers in the app */
const reducers = combineReducers({ notes: notesReducer })
const store = configureStore({ reducer: reducers })

function Main() {
  return (
    /* Here we configure the Provider with the store */
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Main