import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './app.css'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(
    { message: '', isError: null }
  )

  useEffect(() => {
    blogService.getAll().then(blogs => {
      let blogsToSort = blogs
      setBlogs(blogsToSort.sort((blog1, blog2) => blog2.likes - blog1.likes))
    })
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(
        { username: username.value, password: password.value })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      createNotification({
        message: `Tervetuloa, ${user.name}`,
        isError: false
      })
    } catch (exception) {
      createNotification({
        message: 'Väärä käyttäjätunnus tai salasana',
        isError: true
      })
    }
  }

  const notificationTimeout = () => {
    setTimeout(() => {
      setNotification({
        message: '',
        isError: null
      })
    }, 5000)
  }

  const createNotification = ({ message, isError }) => {
    setNotification({
      message,
      isError
    })
    notificationTimeout()
  }

  const handleNewBlog = async blog => {
    const newBlog = await blogService.create(blog)
    setBlogs(blogs.concat(newBlog))
    createNotification({
      message: `Blogi ${blog.title} lisätty onnistuneesti`,
      isError: false
    })
  }

  const handleNewBlogFail = () => {
    createNotification({
      message: 'Blogin lisäys epäonnistui',
      isError: true
    })
  }


  const handleBlogLike = async (blog) => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null
    }
    try {
      const updatedBlog = await blogService.update(blog.id, blogToUpdate)
      createNotification({
        message: `Tykkäsit blogista ${blog.title}`,
        isError: false
      })
      return updatedBlog
    } catch (exception) {
      createNotification({
        message: 'Tykkäys epäonnistui',
        isError: true
      })
    }
  }

  const handleBlogDeletion = async (blog) => {
    try {
      await blogService.destroy(blog.id)
      const filteredBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(filteredBlogs)
      createNotification({
        message: `Blogi ${blog.title} poistettu`,
        isError: false
      })
    } catch (exception) {
      createNotification({
        message: `Blogin ${blog.title} poisto epäonnistui`,
        isError: true
      })
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='Kirjaudu sisään'>
        <LoginForm
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const greeting = () => {
    return <p>{user.name} kirjautunut sisään</p>
  }

  const logoutButton = () => {
    return (
      <div>
        <button onClick={() => {
          createNotification({
            message: 'Kirjauduit ulos',
            isError: false
          })
          setUser(null)
          blogService.setToken(null)
          window.localStorage.removeItem('loggedBlogappUser')

        }}>Kirjaudu ulos</button>
      </div>
    )
  }

  const blogList = () => {
    return (
      <div>
        <h2>Blogit</h2>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleBlogLike={handleBlogLike}
            handleBlogDeletion={handleBlogDeletion}
            loggedInUser={user}
          />
        )}
      </div>
    )
  }


  if (user === null) {
    return (
      <div>
        <Notification
          message={notification.message}
          isError={notification.isError}
        />
        {loginForm()}
      </div>
    )
  } else {
    return (
      <div>
        {greeting()}

        <Notification
          message={notification.message}
          isError={notification.isError}
        />

        {logoutButton()}

        <Togglable buttonLabel='Luo uusi blogi'>
          <BlogForm
            user={user}
            handleNewBlog={handleNewBlog}
            handleNewBlogFail={handleNewBlogFail}
          />
        </Togglable>

        {blogList()}
      </div>
    )
  }

}


export default App