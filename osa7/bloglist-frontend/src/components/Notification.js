import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message, isError }) => {
  if (message === '' || isError === null) {
    return null
  }

  let className = null

  isError
    ? className = 'error'
    : className = 'info'

  return (
    <div className={className}>
      {message}
    </div>
  )
}

const mapStateToProps = (state) => ({
  message: state.notification.message,
  isError: state.notification.isError
})

export default connect(mapStateToProps)(Notification)