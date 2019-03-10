import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const LoginForm = ({
  handleSubmit
}) => {
  const username = useField('text').getAllButReset
  const password = useField('password').getAllButReset
  return (
    <div>
      <h2>Kirjaudu sisään</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Käyttäjätunnus
          <input
            {...username}
            name="Username"
          />
        </div>
        <div>
          Salasana
          <input
            {...password}
            name="Password"
          />
        </div>
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm