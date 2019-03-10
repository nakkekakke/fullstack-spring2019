const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  res.json(users.map(user => user.toJSON()))
  console.log('users', users)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body
  const saltRounds = 10
  try {
    if (body.password.length < 3) {
      throw { message: "Password is shorter than the minimum allowed length of 3 characters" }
    }

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    res.status(400).json({ error: exception.message })
  }
})

module.exports = usersRouter