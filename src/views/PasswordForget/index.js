import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { withFirebase } from '../../utilities/Firebase'
import * as ROUTES from '../../utilities/routes'

import { Button, Form, Message, Grid, Header } from 'semantic-ui-react'

const INITIAL_STATE = {
  email: '',
  error: null
}

const PasswordForgetPage = () => (
  <Grid centered columns={2}>
    <Grid.Row>
      <Grid.Column style={{ paddingTop: '2em' }}>
        <Header as="h1" textAlign="center">
          PasswordForget
        </Header>
        <PasswordForgetForm />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

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
        <Button disabled={isInvalid} type="submit" color="black" fluid>
          Reset My Password
        </Button>
        {error && <Message negative>{error.message}</Message>}
      </Form>
    )
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

const PasswordForgetForm = withFirebase(PasswordForgetFormBase)

export { PasswordForgetForm, PasswordForgetLink }
export default PasswordForgetPage
