import React from 'react'
import { useService } from '@xstate/react'
import { Machine, assign, interpret } from 'xstate'

const notesMachine = Machine({
  id: 'notes',
  initial: 'ready',
  context: {
    notes: [],
    note: ''
  },
  states: {
    ready: {},
  },
  on: {
    "CHANGE": {
      actions: [
        assign({
          note: (_, event) => event.value
        })
      ]
    },
    "CREATE_NOTE": {
      actions: [
        assign({
          note: "",
          notes: context => [...context.notes, context.note]
        })
      ]
    }
  }
})

const service = interpret(notesMachine).start()

export default function App() {
  const [state, send] = useService(service)
  const { context: { note, notes} } = state
  
  return (
    <div>
      <h1>My notes app</h1>
      <button onClick={() => send({ type: 'CREATE_NOTE' })}>Create Note</button>
      <input value={note} onChange={e => send({ type: 'CHANGE', value: e.target.value})} />
      { notes.map(note => <p key={note}>Note: {note}</p>) }
    </div>
  )
}