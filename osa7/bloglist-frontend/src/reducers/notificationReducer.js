import { CREATE_NOTIFICATION, DESTROY_NOTIFICATION } from '../actions'

const nullNotification = { message: '', isError: true }

const reducer = (state = nullNotification, action) => {
  switch (action.type) {
    case CREATE_NOTIFICATION:
      return { message: action.message, isError: action.isError }
    case DESTROY_NOTIFICATION:
      return nullNotification
    default:
      return state
  }
}

export default reducer