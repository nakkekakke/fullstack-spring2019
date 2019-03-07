import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import NotificationList from './components/NotificationList'
import Filter from './components/Filter'
import { initializeAnecdotes, createNotification } from './actions'

const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
    props.createNotification('Welcome!', 5)
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <NotificationList />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(
  null,
  { initializeAnecdotes, createNotification }
)(App)
