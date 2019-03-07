import { CREATE_NOTIFICATION, DESTROY_NOTIFICATION } from '../actions'

const reducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_NOTIFICATION:
      return state.concat({ id: action.id, text: action.text })
    case DESTROY_NOTIFICATION:
      return state.filter(n => n.id !== action.id)
    default:
      return state
  }
}

export default reducer