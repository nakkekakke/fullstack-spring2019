import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  console.log('lähetetään login')
  const res = await axios.post(baseUrl, credentials)
  console.log('lähetetty', res.data)
  return res.data
}

export default { login }