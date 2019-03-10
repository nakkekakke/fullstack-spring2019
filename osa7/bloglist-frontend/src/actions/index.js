import blogService from '../services/blogs'

export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
export const DESTROY_NOTIFICATION = 'DESTROY_NOTIFICATION'
export const CREATE_BLOG = 'CREATE_BLOG'
export const INITIALIZE_BLOGS = 'INITIALIZE_BLOGS'

export const createTimedNotification = ({ message, isError }) => {
  return dispatch => {
    dispatch({
      type: CREATE_NOTIFICATION,
      message,
      isError
    })
    setTimeout(() => {
      dispatch({
        type: DESTROY_NOTIFICATION
      })
    }, 5000)
  }
}

export const createBlog = (title, author, url, user) => {
  const toBeAdded = {
    title,
    author,
    url,
    user
  }
  return async dispatch => {
    const newBlog = await blogService.create(toBeAdded)
    console.log('vastaanotettu blogi:', newBlog)
    dispatch({
      type: CREATE_BLOG,
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    data.sort((blog1, blog2) => blog2.likes - blog1.likes)
    dispatch({
      type: INITIALIZE_BLOGS,
      data
    })
  }
}

