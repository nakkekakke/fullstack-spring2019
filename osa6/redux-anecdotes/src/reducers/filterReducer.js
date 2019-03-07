import { UPDATE_FILTER } from '../actions'

const reducer = (state = '', action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return action.text
    default:
      return state
  }
}

export default reducer