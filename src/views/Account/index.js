import React, { Component } from 'react'
import { compose } from 'recompose'

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from '../../utilities/Session'
import { withFirebase } from '../../utilities/Firebase'
import { PasswordForgetForm } from '../PasswordForget'
import PasswordChangeForm from '../PasswordChange'

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container
} from 'semantic-ui-react'

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null
  },
  {
    id: 'google.com',
    provider: 'googleProvider'
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider'
  },
  {
    id: 'twitter.com',
    provider: 'twitterProvider'
  }
]

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Grid centered columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Account: {authUser.email}
          </Header>
          <PasswordForgetForm />
          <br />
          <PasswordChangeForm />
          <LoginManagement authUser={authUser} />
        </Grid.Column>
      </Grid>
    )}
  </AuthUserContext.Consumer>
)

class LoginManagementBase extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeSignInMethods: [],
      error: null
    }
  }

  componentDidMount() {
    this.fetchSignInMethods()
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then(activeSignInMethods =>
        this.setState({ activeSignInMethods, error: null })
      )
      .catch(error => this.setState({ error }))
  }

  onSocialLoginLink = provider => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }))
  }

  onDefaultLoginLink = password => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password
    )

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }))
  }

  onUnlink = providerId => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }))
  }

  render() {
    const { activeSignInMethods, error } = this.state

    return (
      <Message>
        {SIGN_IN_METHODS.map(signInMethod => {
          const onlyOneLeft = activeSignInMethods.length === 1
          const isEnabled = activeSignInMethods.includes(signInMethod.id)

          return (
            <Button key={signInMethod.id}>
              {signInMethod.id === 'password' ? (
                <DefaultLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={this.onDefaultLoginLink}
                  onUnlink={this.onUnlink}
                />
              ) : (
                <SocialLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={this.onSocialLoginLink}
                  onUnlink={this.onUnlink}
                />
              )}
            </Button>
          )
        })}
        {error && error.message}
      </Message>
    )
  }
}

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink
}) =>
  isEnabled ? (
    <Button
      type="B"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}>
      Deactivate {signInMethod.id}
    </Button>
  ) : (
    <Button onClick={() => onLink(signInMethod.provider)}>
      Link {signInMethod.id}
    </Button>
  )

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props)

    this.state = { passwordOne: '', passwordTwo: '' }
  }

  onSubmit = event => {
    event.preventDefault()

    this.props.onLink(this.state.passwordOne)
    this.setState({ passwordOne: '', passwordTwo: '' })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { onlyOneLeft, isEnabled, signInMethod, onUnlink } = this.props
    const { passwordOne, passwordTwo } = this.state
    const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

    return isEnabled ? (
      <Button onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft}>
        Deactivate {signInMethod.id}
      </Button>
    ) : (
      <Form onSubmit={this.onSubmit}>
        <Form.Input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <Form.Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <Button disabled={isInvalid} type="submit">
          Link {signInMethod.id}
        </Button>
      </Form>
    )
  }
}

const LoginManagement = withFirebase(LoginManagementBase)

const condition = authUser => !!authUser

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AccountPage)
