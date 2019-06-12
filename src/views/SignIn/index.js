import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'

import { withFirebase } from '../../utilities/Firebase'
import * as ROUTES from '../../utilities/routes'

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container
} from 'semantic-ui-react'

const SignInPage = () => (
  <Grid centered columns={2}>
    <Grid.Column>
      <Header as="h2" textAlign="center">
        Sign In
      </Header>
      <SignInForm />
      <Container text>
        <SignInGoogle />
        <SignInFacebook />
        <SignInTwitter />
      </Container>
    </Grid.Column>
  </Grid>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/account-exists-with-different-credential'
const ERROR_MSG_ACCOUNT_EXISTS = `An account with an E-Mail address to this social account already exists. Try to login from this account instead and associate your social accounts on your personal account page.`

class SignInFormBase extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email, password } = this.state

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.HOME)
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
    const { email, password, error } = this.state
    const isInvalid = password === '' || email === ''

    return (
      <Segment>
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <Form.Input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Button size="tiny" disabled={isInvalid} type="submit">
            Sign In
          </Button>
          {error && <p>{error.message}</p>}
        </Form>
        <Message>
          <SignUpLink />
          <PasswordForgetLink />
        </Message>
      </Segment>
    )
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        // Use the socialuser.additionalUserInfo.isNewUser property
        //   in implement user checking before overwriting database
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {}
        })
      })
      .then(socialAuthUser => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
      })
    event.preventDefault()
  }
  render() {
    const { error } = this.state
    return (
      <Form onSubmit={this.onSubmit}>
        <Button content="Sign In" icon="google" type="submit" />
        {error && <p>{error.message}</p>}
      </Form>
    )
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        // Use the socialuser.additionalUserInfo.isNewUser property
        //   in implement user checking before overwriting database
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {}
        })
      })
      .then(socialAuthUser => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
      })
    event.preventDefault()
  }
  render() {
    const { error } = this.state
    return (
      <Form onSubmit={this.onSubmit}>
        <Button content="Sign In" icon="facebook f" type="submit" />
        {error && <p>{error.message}</p>}
      </Form>
    )
  }
}

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        // Use the socialuser.additionalUserInfo.isNewUser property
        //   in implement user checking before overwriting database
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {}
        })
      })
      .then(socialAuthUser => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
      })
    event.preventDefault()
  }
  render() {
    const { error } = this.state
    return (
      <Form onSubmit={this.onSubmit}>
        <Button content="Sign In" icon="twitter" type="submit" />
        {error && <p>{error.message}</p>}
      </Form>
    )
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase)

const SignInGoogle = compose(
  withRouter,
  withFirebase
)(SignInGoogleBase)

const SignInFacebook = compose(
  withRouter,
  withFirebase
)(SignInFacebookBase)

const SignInTwitter = compose(
  withRouter,
  withFirebase
)(SignInTwitterBase)

export default SignInPage

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter }
