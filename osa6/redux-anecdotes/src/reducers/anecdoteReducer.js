import { VOTE_ANECDOTE, NEW_ANECDOTE, INIT_ANECDOTES } from '../actions'

const reducer = (state = [], action) => {
  switch (action.type) {
    case VOTE_ANECDOTE:
      return state.map(anecdote =>
        anecdote.id === action.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    case NEW_ANECDOTE:
      return [...state, action.data]
    case INIT_ANECDOTES:
      return action.data
    default:
      return state
  }
}

export default reducer