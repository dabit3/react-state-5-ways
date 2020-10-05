import React, { useState } from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'

function App({ notes, createNote }) {  
  const [input, setInput] = useState('')
  function onCreateNote() {
    createNote(input)
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

const mapStateToProps =  state => ({ notes: state.notes })

const createNoteAction = note => ({
  type: 'CREATE_NOTE',
  note
})

const mapDispatchToProps = {
  createNote: note => createNoteAction(note)
}

const AppWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

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
      <AppWithRedux />
    </Provider>
  )
}

export default Main