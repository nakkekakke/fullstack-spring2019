import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const BlogForm = ({
  user,
  handleNewBlog,
  handleNewBlogFail
}) => {
  const title = useField('text').getAllButReset
  const author = useField('text').getAllButReset
  const url = useField('text').getAllButReset

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      user
    }

    try {
      await handleNewBlog(newBlog)
      title.reset()
      author.reset()
      url.reset()
    } catch (exception) {
      handleNewBlogFail()
    }
  }

  return (
    <div>
      <h2>Luo uusi blogi</h2>
      <form onSubmit={addBlog}>
        <div>
          Blogin nimi:
          <input
            {...title}
            name="Title"
          />
        </div>
        <div>
          Kirjoittaja:
          <input
            {...author}
            name="Author"
          />
        </div>
        <div>
          Url:
          <input
            {...url}
            name="Url"
          />
        </div>
        <button type="submit">Lisää</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  user: PropTypes.object.isRequired,
  handleNewBlog: PropTypes.func.isRequired,
  handleNewBlogFail: PropTypes.func.isRequired
}

export default BlogForm