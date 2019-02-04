import React from 'react'

const Notification = ({ message, value }) => {
  if (message == null) {
    return null
  }

  const warningStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const notifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }


  return (
    <div style={value ? notifStyle : warningStyle}>
      {message}
    </div>
  )
}

export default Notification