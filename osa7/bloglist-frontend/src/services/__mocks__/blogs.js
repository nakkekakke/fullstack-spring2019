const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'Reactin koodaus on mukavaa',
    url: 'https://www.reactinkoodaus.fi',
    likes: 10,
    user: {
      id: '5a437a9e514ab7f168ddf138',
      username: 'nakkekakke',
      name: 'Niko Juntunen'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Integraatiotesteillä testataan useaa komponenttia',
    url: 'https://www.integraatiotestit.fi',
    likes: 10,
    user: {
      id: '5a437a9e514ab7f168ddf138',
      username: 'nakkekakke',
      name: 'Niko Juntunen'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'Hookit ovat koukuttavia',
    url: 'https://www.react-hooks.fi',
    likes: 10,
    user: {
      id: '5a437a9e514ab7f168ddf138',
      username: 'nakkekakke',
      name: 'Niko Juntunen'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}
const setToken = newToken => {
  return newToken
}

export default { getAll, setToken }