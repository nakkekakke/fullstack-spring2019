import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {

  const user = {
    username: 'tester',
    token: '1231231214',
    name: 'Teuvo Testaaja'
  }

  it('if no user is logged in, blogs are not rendered', async () => {
    const component = render(<App />)
    //component.rerender(<App />)

    await waitForElement(() => component.getByText('Kirjaudu sisään'))

    expect(component.container).not.toHaveTextContent('Reactin koodaus on mukavaa')
    expect(component.container).not.toHaveTextContent('Integraatiotesteillä testataan useaa komponenttia')
    expect(component.container).not.toHaveTextContent('Hookit ovat koukuttavia')
  })

  it('when user logs in blogs are rendered', async () => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    const component = render(<App />)

    await waitForElement(
      () => component.container.querySelector('.allInfoDiv')
    )

    expect(component.container).toHaveTextContent('Reactin koodaus on mukavaa')
    expect(component.container).toHaveTextContent('Integraatiotesteillä testataan useaa komponenttia')
    expect(component.container).toHaveTextContent('Hookit ovat koukuttavia')
  })
})