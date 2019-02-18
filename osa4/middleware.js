const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

module.exports = { tokenExtractor }