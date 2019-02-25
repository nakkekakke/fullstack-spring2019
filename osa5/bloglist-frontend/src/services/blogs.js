import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const req = await axios.get(baseUrl)
  return req.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = async (id, updatedObject) => {
  const res = await axios.put(
    `${baseUrl}/${id}`, updatedObject
  )
  return res
}

const destroy = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res
}

export default { getAll, create, update, destroy, setToken }