import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router, Route, Link
} from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import './app.css'
import { createTimedNotification } from './actions'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

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

  useEffect(() => {
    userService.getAll().then(u => setUsers(u))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('username', username)
    console.log('password', password)
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
      props.createTimedNotification({
        message: `Tervetuloa, ${user.name}`,
        isError: false
      })
    } catch (exception) {
      props.createTimedNotification({
        message: 'Väärä käyttäjätunnus tai salasana',
        isError: true
      })
    }
  }

  const handleNewBlog = async blog => {
    const newBlog = await blogService.create(blog)
    setBlogs(blogs.concat(newBlog))
    props.createTimedNotification({
      message: `Blogi ${blog.title} lisätty onnistuneesti`,
      isError: false
    })
  }

  const handleNewBlogFail = () => {
    props.createTimedNotification({
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
      props.createTimedNotification({
        message: `Tykkäsit blogista ${blog.title}`,
        isError: false
      })
      return updatedBlog
    } catch (exception) {
      props.createTimedNotification({
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
      props.createTimedNotification({
        message: `Blogi ${blog.title} poistettu`,
        isError: false
      })
    } catch (exception) {
      props.createTimedNotification({
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
      <>
        <button onClick={() => {
          props.createTimedNotification({
            message: 'Kirjauduit ulos',
            isError: false
          })
          setUser(null)
          blogService.setToken(null)
          window.localStorage.removeItem('loggedBlogappUser')

        }}>Kirjaudu ulos</button>
      </>
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

  const userById = (id) => users.find(user => user.id === id)

  const blogById = (id) => blogs.find(blog => blog.id === id)

  if (user === null) {
    return (
      <div>
        <Notification />
        {loginForm()}
      </div>
    )
  } else {
    return (
      <div>

        <Notification />

        <Router>
          <div>
            <NavBar logoutButton={logoutButton} />
            {greeting()}
            <Togglable buttonLabel='Luo uusi blogi'>
              <BlogForm
                user={user}
                handleNewBlog={handleNewBlog}
                handleNewBlogFail={handleNewBlogFail}
              />
            </Togglable>
            <Route exact path="/" render={() => blogList()} />
            <Route exact path="/users" render={() => <Users users={users} />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={userById(match.params.id)} />} />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <BlogView blog={blogById(match.params.id)} />} />
          </div>
        </Router>
      </div>
    )
  }
}

const NavBar = ({ logoutButton }) => {
  const padding = { padding: 5 }
  return (
    <div className={'navbar'}>
      <Link style={padding} to="/" >Blogit</Link>
      <Link style={padding} to="/users" >Käyttäjät</Link>
      {logoutButton()}
    </div>
  )
}

const Users = ({ users }) => {
  return (
    <div>
      <h2>Käyttäjät</h2>
      <ul>
        {users.map(user =>
          <li key={user.id}>
            <ul>
              <Link to={`/users/${user.id}`}>
                {user.name}
              </Link>, blogeja: {user.blogs.length}
            </ul>
          </li>
        )}
      </ul>
    </div>
  )
}

const User = (userData) => {
  if (userData.user === undefined){
    return null
  }
  const user = userData.user
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Lisätyt blogit</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}> {blog.title} </li>
        )}
      </ul>
    </div>
  )
}

const BlogView = ({ blog }) => {
  if (blog === undefined) {
    return null
  }
  return (
    <div>
      <h2>{blog.title} tekijältä {blog.author}</h2>
      <div> <a href={blog.url}>{blog.url}</a> </div>
      <div> {blog.likes} tykkäystä </div>
      <div> Lisännyt {blog.user.name} </div>
    </div>
  )
}

export default connect(
  null,
  { createTimedNotification }
)(App)