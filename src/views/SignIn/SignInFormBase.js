import React, { useState } from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import * as ROUTES from '../../utilities/routes'
import { PasswordForgetLink } from '../PasswordForget'

function SignInFormBase({ firebase, history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const isInvalid = password === '' || email === ''

  const onSubmit = e => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('')
        setPassword('')
        setError(null)
        history.push(ROUTES.LANDING)
      })
      .catch(error => handleErrors(error))
    e.preventDefault()
  }

  const handleErrors = error => {
    if (error.code === `auth/user-not-found`) {
      error.message = `Username or Password is incorrect`
    }
    setError(error)
  }

  return (
    <Segment stacked>
      <Form onSubmit={onSubmit}>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <Button fluid disabled={isInvalid} type="submit" color="black">Sign In</Button>
        {error && (<Message negative>{error.message}<PasswordForgetLink /></Message>)}
      </Form>
    </Segment>
  )
}

export default SignInFormBase
