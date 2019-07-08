import React from 'react'
import { compose } from 'recompose'
import { AuthUserContext, withEmailVerification } from '../../utilities/Session'
import { withFirebase } from '../../utilities/Firebase'
import * as ROUTES from '../../utilities/routes'
import { Container } from '@material-ui/core'

import PasswordChangeForm from './ChangePassword'
import SocialAuthHandler from './SocialAuthHandler'
import SignOutButtonBase from './LogoutButton'

const LoginManagement = withFirebase(SocialAuthHandler)
const SignOutButton = withFirebase(SignOutButtonBase)

const AuthedAccountPage = ({ authUser }) => {
  return (
    <Container maxWidth="md">
      <h1>Account Management</h1>
      <h2>{authUser.email}</h2>
      <PasswordChangeForm />
      <br />
      <SignOutButton />
      <LoginManagement authUser={authUser} />
    </Container>
  )
}

// Verify the user exists before rendering Account page
// If no account is found, redirect user to the Landing page
function AccountPage({ history }) {
  return (
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <AuthedAccountPage authUser={authUser} /> : history.push(ROUTES.LANDING))}
    </AuthUserContext.Consumer>
  )
}

export default compose(
  withEmailVerification,
  withFirebase
)(AccountPage)
