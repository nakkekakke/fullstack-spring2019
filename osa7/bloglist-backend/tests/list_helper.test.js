const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithManyBlogs = testHelper.initialBlogs

test('Dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {
  const totalLikes = listHelper.totalLikes

  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    expect(totalLikes(listWithOneBlog)).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(listWithManyBlogs)).toBe(36)
  })
})

describe('Favorite blog', () => {
  const favoriteBlog = listHelper.favoriteBlog

  test('of empty list is undefined', () => {
    expect(favoriteBlog([])).toEqual(undefined)
  })

  test('when list has only one blog, is that said blog', () => {
    const expectedBlog = {
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    }

    expect(favoriteBlog(listWithOneBlog)).toEqual(expectedBlog)
  })

  test('is found correctly from a bigger list', () => {
    const expectedBlog  = {
      title: listWithManyBlogs[2].title,
      author: listWithManyBlogs[2].author,
      likes: listWithManyBlogs[2].likes
    }

    expect(favoriteBlog(listWithManyBlogs)).toEqual(expectedBlog)
  })
})

describe('Author with most blogs', () => {
  const mostBlogs = listHelper.mostBlogs

  test('is undefined when there are no blogs', () => {
    expect(mostBlogs([])).toEqual(undefined)
  })

  test('when list has only one blog is the author of that blog', () => {
    const expectedBlog = {
      author: listWithOneBlog[0].author,
      blogs: 1
    }

    expect(mostBlogs(listWithOneBlog)).toEqual(expectedBlog)
  })

  test('is found correctly from a bigger list', () => {
    const expectedBlog = {
      author: "Robert C. Martin",
      blogs: 3
    }

    expect(mostBlogs(listWithManyBlogs)).toEqual(expectedBlog)
  })
})

describe('Author with most likes', () => {
  const mostLikes = listHelper.mostLikes

  test('is undefined when the list has no blogs', () => {
    expect(mostLikes([])).toBe(undefined)
  })

  test('when list has only one blog is the author of that blog', () => {
    const expectedBlog = {
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    }

    expect(mostLikes(listWithOneBlog)).toEqual(expectedBlog)
  })


  test('is found correctly from a bigger list', () => {
    const expectedBlog = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }

    expect(mostLikes(listWithManyBlogs)).toEqual(expectedBlog)
  })


})