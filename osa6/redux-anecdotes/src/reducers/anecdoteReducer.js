import { VOTE_ANECDOTE, NEW_ANECDOTE, INIT_ANECDOTES } from '../actions'

const reducer = (state = [], action) => {
  switch (action.type) {
    case VOTE_ANECDOTE:
      return state.map(anecdote =>
        anecdote.id === action.data.id
          ? action.data
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