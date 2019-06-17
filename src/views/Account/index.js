import React, { Component } from 'react'
import { compose } from 'recompose'

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from '../../utilities/Session'
import { withFirebase } from '../../utilities/Firebase'

import PasswordChangeForm from './ChangePassword'
import SignOutButton from '../../components/SignOut'

import { Button, Form, Grid, Header, Message } from 'semantic-ui-react'

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
    icon: 'mail',
    color: 'green'
  },
  {
    id: 'google.com',
    provider: 'googleProvider',
    icon: 'google',
    color: 'google plus'
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider',
    icon: 'facebook f',
    color: 'facebook'
  }
]

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Grid centered>
        <Grid.Row style={{ maxWidth: 450 }}>
          <Grid.Column style={{ paddingTop: '2em' }}>
            <Header as="h1" textAlign="center">
              Account Management
            </Header>
            <Header textAlign="center">{authUser.email}</Header>
            <PasswordChangeForm />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ maxWidth: 450 }}>
          <SignOutButton />
          <LoginManagement authUser={authUser} />
        </Grid.Row>
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
      <Form>
        {SIGN_IN_METHODS.map(signInMethod => {
          const onlyOneLeft = activeSignInMethods.length === 1
          const isEnabled = activeSignInMethods.includes(signInMethod.id)

          return (
            <SocialLoginToggle
              key={signInMethod.id}
              onlyOneLeft={onlyOneLeft}
              isEnabled={isEnabled}
              signInMethod={signInMethod}
              onLink={this.onSocialLoginLink}
              onUnlink={this.onUnlink}
            />
          )
        })}
        {error && <Message negative>{error.message}</Message>}
      </Form>
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
      onClick={() => onUnlink(signInMethod.id)}
      size="tiny"
      disabled={onlyOneLeft}
      color={signInMethod.color}
      icon={signInMethod.icon}
      content="Unlink"
    />
  ) : (
    <Button
      onClick={() => onLink(signInMethod.provider)}
      size="tiny"
      color={signInMethod.color}
      icon={signInMethod.icon}
      content="Link"
    />
  )

const LoginManagement = withFirebase(LoginManagementBase)
const condition = authUser => !!authUser

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AccountPage)
