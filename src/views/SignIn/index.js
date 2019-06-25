import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react'

import { withFirebase } from '../../utilities/Firebase'
import * as ROUTES from '../../utilities/routes'

import { SignUpLink } from '../SignUp'
import SignInFormBase from './SignInFormBase'

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
      .catch(error => errorHandler(error))
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
      .catch(error => errorHandler(error))
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

const errorHandler = error => {
  if (error.code === 'auth/account-exists-with-different-credential') {
    error.message = `An account with an E-Mail address to this social account already exists. Try to login from this account instead and associate your social accounts on your personal account page.`
  }
  this.setState({ error })
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

export { SignInForm, SignInGoogle, SignInFacebook }
export default SignInPage
