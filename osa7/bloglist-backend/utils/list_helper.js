const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((sumOfLikes, blog) => {
    return sumOfLikes + blog.likes
  }, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return undefined

  let fav = blogs[0]
  blogs.map((blog) => {
    if (blog.likes > fav.likes) {
      fav = blog
    }
  })

  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return undefined

  const allBlogCounts = _(blogs)
    .groupBy('author')
    .map((blog, name) => {
      return {
        "author": name,
        "blogs": blog.length
      }
    })
    .value()
  
  return _.maxBy(allBlogCounts, 'blogs')
}

const mostLikes = blogs => {
  if (blogs.length === 0) return undefined

  const allLikeCounts = _(blogs)
    .groupBy('author')
    .map((blog, name) => {
      return {
        "author": name,
        "likes": _.sumBy(blog, 'likes')
      }
    })
    .value()
  
  return _.maxBy(allLikeCounts, 'likes')
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}