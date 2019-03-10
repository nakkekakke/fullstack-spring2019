import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({
  blog,
  handleBlogLike,
  handleBlogDeletion,
  loggedInUser
}) => {
  const [showFullBlog, setShowFullBlog] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const extraInfo = () => {
    return (
      <>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {likes} tykkäystä
          <button onClick={() => {
            if (handleBlogLike(blog)) {
              setLikes(likes + 1)
            }
          }}>Tykkää</button>
        </div>
        {blog.user ?
          <div>
          Lisännyt {blog.user.name}
          </div> :
          <div>
            Lisätty anonyymisti
          </div>
        }
        {conditionalDelButton()}
        <Link to={`/blogs/${blog.id}`}>Lisätietoja</Link>
      </>
    )
  }

  const conditionalDelButton = () => {
    if (loggedInUser.username === blog.user.username) {
      return (
        <button onClick={() => handleBlogDeletion(blog)}>Poista</button>
      )
    }
    return null
  }

  const toggleShowExtraInfo = () => {
    setShowFullBlog(!showFullBlog)
  }

  return (
    <div style={blogStyle} className={'allInfoDiv'}>
      <div onClick={toggleShowExtraInfo} className={'nameInfoDiv'}>
        {blog.title} {blog.author}
      </div>
      {showFullBlog !== false && extraInfo()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleBlogLike: PropTypes.func.isRequired,
  handleBlogDeletion: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired
}

export default Blog