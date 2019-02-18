const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('Blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('All blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toEqual(helper.initialBlogs.length)
})

test('Returned blogs have property named "id"', async () => {
  const response = await api.get('/api/blogs')
  for (let blog of response.body) {
    expect(blog._id).toBeUndefined()
    expect(blog.id).toBeDefined()
  }
})

test('New blogs can be created', async () => {
  const newBlog = new Blog(helper.newBlog)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const finalBlogs = await helper.blogsInDb()
  const finalTitles = finalBlogs.map(blog => blog.title)

  expect(finalBlogs.length).toEqual(helper.initialBlogs.length + 1)
  expect(finalTitles).toContain(newBlog.title)
})

test('Blog likes default to 0 if not specified', async () => {
  delete helper.newBlog.likes
  const newBlog = new Blog(helper.newBlog)
  
  await api
    .post('/api/blogs')
    .send(newBlog)

  const finalBlogs = await helper.blogsInDb()
  const fetchedNewBlog = finalBlogs.find(blog => 
    blog.title === newBlog.title)
  
  expect(fetchedNewBlog.likes).toEqual(0)
})

test('Cannot add a blog without title or url', async () => {
  const invalidBlog = new Blog({ author: "Jaska Jokunen", likes: 6 })

  await api
    .post('/api/blogs')
    .send(invalidBlog)
    .expect(400)
  
  const finalBlogs = await helper.blogsInDb()
  expect(finalBlogs.length).toEqual(helper.initialBlogs.length)
})

describe('When there is initially one user in the database', async () => {
  beforeEach( async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with valid data and gives correct statuscode', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'nakkekakke',
      name: 'Niko Juntunen',
      password: 'salasana'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  describe.only('creation fails with', async () => {
    test('non-unique username and gives correct response', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Niko Juntunen',
        password: 'salasana'
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      expect(result.body.error).toContain('expected `username` to be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('too short username or password and and gives correct response', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'ti',
        name: 'Tiny arguments',
        password: 'ny'
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      
      expect(result.body.error).toContain('is shorter than the minimum allowed length')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
  })
})


afterAll(() => {
  mongoose.connection.close()
})