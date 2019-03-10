import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  const blog = {
    title: 'Testititle',
    author: 'Testiauthor',
    likes: 10
  }

  test('Blog data is rendered', () => {
    const component = render(
      <SimpleBlog
        blog={blog}
        onClick={() => null}
      />
    )

    const nameDiv = component.container.querySelector('.nameDiv')
    expect(nameDiv).toHaveTextContent('Testititle Testiauthor')

    const likeDiv = component.container.querySelector('.likeDiv')
    expect(likeDiv).toHaveTextContent('Blog has 10 likes')
  })

  test('Like button works', () => {
    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})

