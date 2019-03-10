import anecdoteService from '../services/anecdotes'

export const VOTE_ANECDOTE = 'VOTE_ANECDOTE'
export const NEW_ANECDOTE = 'NEW_ANECDOTE'
export const INIT_ANECDOTES = 'INIT_ANECDOTES'
export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
export const DESTROY_NOTIFICATION = 'DESTROY_NOTIFICATION'
export const UPDATE_FILTER = 'UPDATE_FILTER'


export const voteAnecdote = anecdote => {
  return async dispatch => {
    const voted = { ...anecdote, votes: anecdote.votes + 1 }
    const data = await anecdoteService.update(voted)
    dispatch({
      type: VOTE_ANECDOTE,
      data
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: NEW_ANECDOTE,
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: INIT_ANECDOTES,
      data: anecdotes
    })
  }
}

const createId = () => (100000 * Math.random()).toFixed(0)

export const createNotification = (text, time) => {
  const id = createId()
  return dispatch => {
    dispatch({
      type: CREATE_NOTIFICATION,
      id,
      text
    })
    setTimeout(() => {
      dispatch({
        type: DESTROY_NOTIFICATION,
        id,
        text
      })
    }, (time * 1000))
  }
}

export const updateFilter = text => ({
  type: UPDATE_FILTER,
  text
})