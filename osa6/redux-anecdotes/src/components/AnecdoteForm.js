import React from 'react'
import { connect } from 'react-redux'
import { 
  createAnecdote,
  createNotification,
  destroyNotification
} from '../actions'

const AnecdoteForm = (props) => {

  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.createAnecdote(content)
    props.createNotification(`You created '${content}'`, 5)
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="content" /></div>
        <button>Create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  createNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)