import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { withFirebase } from '../../utilities/Firebase'
import * as ROUTES from '../../utilities/routes'

import { Button, Form, Container } from 'semantic-ui-react'

const PasswordForgetPage = () => (
  <Container>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </Container>
)

const INITIAL_STATE = {
  email: '',
  error: null
}

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email } = this.state

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email, error } = this.state
    const isInvalid = email === ''

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Button disabled={isInvalid} type="submit">
          Reset My Password
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
    )
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

export default PasswordForgetPage

const PasswordForgetForm = withFirebase(PasswordForgetFormBase)

export { PasswordForgetForm, PasswordForgetLink }
