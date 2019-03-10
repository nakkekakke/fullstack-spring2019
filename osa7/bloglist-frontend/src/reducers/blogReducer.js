import { CREATE_BLOG, INITIALIZE_BLOGS } from '../actions'

const reducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_BLOG:
      return [...state, action.data]
    case INITIALIZE_BLOGS:
      return action.data
    default:
      return state
  }
}

export default reducer