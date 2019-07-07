import React from 'react'
import { compose } from 'recompose'
import { AuthUserContext, withEmailVerification } from '../../utilities/Session'
import { withFirebase } from '../../utilities/Firebase'
import * as ROUTES from '../../utilities/routes'
import PasswordChangeForm from './ChangePassword'
import SocialAuthHandler from './SocialAuthHandler'

const LoginManagement = withFirebase(SocialAuthHandler)
const SignOutButtonBase = ({ firebase }) => <button onClick={firebase.doSignOut}>Logout</button>
const SignOutButton = withFirebase(SignOutButtonBase)

const AuthedAccountPage = ({ authUser }) => {
  return (
    <React.Fragment>
      <h1>Account Management</h1>
      <h2>{authUser.email}</h2>
      <PasswordChangeForm />
      <SignOutButton />
      <LoginManagement authUser={authUser} />
    </React.Fragment>
  )
}

// Verify the user exists before rendering Account page
// If no account is found, redirect user to the Landing page
const AccountPage = ({ history }) => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <AuthedAccountPage authUser={authUser} /> : history.push(ROUTES.LANDING))}
  </AuthUserContext.Consumer>
)

export default compose(
  withEmailVerification,
  withFirebase
)(AccountPage)
