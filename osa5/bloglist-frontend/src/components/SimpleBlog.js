import React from 'react'

const SimpleBlog = ({ blog, onClick }) => {
  return (
    <div>
      <div className="nameDiv">
        {blog.title} {blog.author}
      </div>
      <div className="likeDiv">
        Blog has {blog.likes} likes
        <button onClick={onClick}>Like</button>
      </div>
    </div>
  )
}

export default SimpleBlog