import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const res = await axios.post(baseUrl, object)
  return res.data
}

const vote = async (id) => {
  try {
    const found = await axios.get(`${baseUrl}/${id}`)
    const res = await axios.put(`${baseUrl}/${id}`,
      {
        ...found.data,
        votes: found.data.votes + 1
      }
    )
    return res.data
  } catch (exception) {
    console.log(exception)
    return null
  }
}

export default { getAll, createNew, vote }