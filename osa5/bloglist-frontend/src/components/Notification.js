import React from 'react'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
  message: PropTypes.string.isRequired
}

export default Notification