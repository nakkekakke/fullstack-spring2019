const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({}).populate('user', { username: 1, name: 1 })
    .then(blogs => {
      res.json(blogs)
    })
})

blogsRouter.post('/', async (req, res) => {
  console.log('postataan', req.body)
  const body = req.body
  try {
    if (!req.token) {
      return res.status(401).json({ error: 'No token present in request!' })
    }
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    console.log('user', user)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog.toJSON())
  } catch (exception) {
    res.status(401).json({ error: exception.message })
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid' })
    }

    const blog = await Blog.findById(req.params.id)

    if (blog.user.toString() === decodedToken.id) {
      await Blog.findByIdAndDelete(req.params.id)
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (exception) {
    res.status(401).send(exception.message)
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }

  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog.toJSON())
  } catch (exception) {
    console.error(exception)
    res.status(404).end()
  }
})

module.exports = blogsRouter