import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote, createNotification } from '../actions'

const AnecdoteList = (props) => {
  const vote = (id) => {
    const anecdote = props.visibleAnecdotes.find(a => a.id === id)
    props.voteAnecdote(anecdote)
    props.createNotification(`You voted '${anecdote.content}'`, 5)
  }

  return (
    props.visibleAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} votes
          <button onClick={() => vote(anecdote.id)}>Vote</button>
        </div>
      </div>
    )
  )
}

const filteredAnecdotes = ({ anecdotes, filter }) => {
  return anecdotes
    .filter(a => a.content.toLowerCase()
    .includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => ({
  visibleAnecdotes: filteredAnecdotes(state)
})

const mapDispatchToProps = {
  voteAnecdote,
  createNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)