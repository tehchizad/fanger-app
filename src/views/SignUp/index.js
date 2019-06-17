import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../../utilities/Firebase'

import * as ROUTES from '../../utilities/routes'
import * as ROLES from '../../utilities/roles'

import { Button, Segment, Form, Grid, Message, Header } from 'semantic-ui-react'

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null
}
// Default Firebase auth error is unclear
const ERROR_CODE_ACCOUNT_EXISTS = 'auth/account-exists-with-different-credential'
const ERROR_MSG_ACCOUNT_EXISTS = `An account with an E-Mail address to this social account already exists. Try to login from this account instead and associate your social accounts on your personal account page.`

const SignUpPage = () => (
  <Grid textAlign="center" style={{ paddingTop: '10vh' }} verticalAlign="middle">
    <Grid.Row style={{ maxWidth: 450 }}>
      <Grid.Column style={{ paddingTop: '2em' }}>
        <Header as="h1" textAlign="center">
          Sign Up
        </Header>
        <SignUpForm />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

class SignUpFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = e => {
    const { username, email, passwordOne, isAdmin } = this.state
    const roles = {}

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      // Create the user in the Firebase realtime database
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({ username, email, roles })
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification()
      })
      //  Reset state & route home
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.LANDING)
      })
      .catch(error => {
        this.setState({ error })
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
        this.setState({ error })
      })
    e.preventDefault()
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

    return (
      <Segment stacked>
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <Form.Input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <Form.Input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Form.Input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <Button disabled={isInvalid} type="submit" color="black" fluid>
            Sign Up
          </Button>
          {error && <Message negative>{error.message}</Message>}
        </Form>
      </Segment>
    )
  }
}

const SignUpLink = () => (
  <Message>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </Message>
)

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase)

export { SignUpForm, SignUpLink }
export default SignUpPage
