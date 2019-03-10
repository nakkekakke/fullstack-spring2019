import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
  const fakeUser = {
    id: 0,
    username: '',
    name: ''
  }

  const blog = {
    title: 'Testiblogi',
    author: 'Testi Tyyppi',
    url: 'testiurl.fi',
    likes: 10,
    user: fakeUser
  }

  test('Only title and author are shown by default', () => {
    const component = render(
      <Blog
        blog={blog}
        handleBlogLike={() => null}
        handleBlogDeletion={() => null}
        loggedInUser={fakeUser}
      />
    )
    const allDiv = component.container.querySelector('.allInfoDiv')
    expect(allDiv).toHaveTextContent('Testiblogi Testi Tyyppi')
    expect(allDiv).not.toHaveTextContent('testiurl.fi')
    expect(allDiv).not.toHaveTextContent('10 tykkäystä')
  })

  test('Clicking title shows all blog info', () => {
    const component = render(
      <Blog
        blog={blog}
        handleBlogLike={() => null}
        handleBlogDeletion={() => null}
        loggedInUser={fakeUser}
      />
    )

    const allDiv = component.container.querySelector('.allInfoDiv')
    const nameDiv = component.container.querySelector('.nameInfoDiv')
    fireEvent.click(nameDiv)

    expect(allDiv).toHaveTextContent('Testiblogi Testi Tyyppi')
    expect(allDiv).toHaveTextContent('testiurl.fi')
    expect(allDiv).toHaveTextContent('10 tykkäystä')
  })
})