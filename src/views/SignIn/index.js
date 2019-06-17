import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'

import { withFirebase } from '../../utilities/Firebase'
import * as ROUTES from '../../utilities/routes'

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}
// Default Firebase auth error is unclear
const ERROR_CODE_ACCOUNT_EXISTS = 'auth/account-exists-with-different-credential'
const ERROR_MSG_ACCOUNT_EXISTS = `An account with an E-Mail address to this social account already exists. Try to login from this account instead and associate your social accounts on your personal account page.`

const SignInPage = () => (
  <Grid textAlign="center" style={{ paddingTop: '10vh' }} verticalAlign="middle">
    <Grid.Row style={{ maxWidth: 450 }}>
      <Grid.Column style={{ paddingTop: '2em' }}>
        <Header as="h1" textAlign="center">
          <i className="picture icon" />
          Application
        </Header>
        <SignInForm />
        <SignUpLink />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row style={{ padding: 0 }}>
      <SignInGoogle />
      <SignInFacebook />
    </Grid.Row>
  </Grid>
)

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
        this.props.history.push(ROUTES.LANDING)
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
      <Segment stacked>
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Button fluid disabled={isInvalid} type="submit" color="black">
            Sign In
          </Button>
          {error && (
            <Message negative>
              {error.message} <PasswordForgetLink />
            </Message>
          )}
        </Form>
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
      .then(() => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.LANDING)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
        this.setState({ error })
      })
    event.preventDefault()
  }
  render() {
    const { error } = this.state
    return (
      <Form onSubmit={this.onSubmit}>
        <Button
          size="tiny"
          color="google plus"
          content="Sign In"
          icon="google"
          type="submit"
        />
        {error && <Message negative>{error.message}</Message>}
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
      .then(() => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.LANDING)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
        this.setState({ error })
      })
    event.preventDefault()
  }
  render() {
    const { error } = this.state
    return (
      <Form onSubmit={this.onSubmit}>
        <Button
          size="tiny"
          color="facebook"
          content="Sign In"
          icon="facebook f"
          type="submit"
        />
        {error && <Message negative>{error.message}</Message>}
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
      .then(() => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.LANDING)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
        this.setState({ error })
      })
    event.preventDefault()
  }
  render() {
    const { error } = this.state
    return (
      <Form onSubmit={this.onSubmit}>
        <Button
          size="tiny"
          color="twitter"
          content="Sign In"
          icon="twitter"
          type="submit"
        />
        {error && <Message negative>{error.message}</Message>}
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

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter }
export default SignInPage
