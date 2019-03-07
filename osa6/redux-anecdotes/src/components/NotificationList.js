import React from 'react'
import { connect } from 'react-redux'
import Notification from './Notification'

const NotificationList = (props) => {
  return (
    <div>
      {props.notifications.map(n =>
        <Notification key={n.id} text={n.text} />)}
    </div>
  )
}

const mapStateToProps = state => ({
  notifications: state.notifications
})

export default connect(
  mapStateToProps
)(NotificationList)