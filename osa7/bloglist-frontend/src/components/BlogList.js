import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { createTimedNotification } from '../actions'

const BlogList = (props) => {
  return (
    <div>
      <h2>Blogit</h2>
      {props.blogsToShow.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleBlogLike={props.handleBlogLike}
          handleBlogDeletion={props.handleBlogDeletion}
          loggedInUser={props.user}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const blogsToShow = state.blogs
  return blogsToShow
}

export default connect(mapStateToProps,
  { createTimedNotification }
)(BlogList)