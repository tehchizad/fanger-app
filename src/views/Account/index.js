import React from 'react'
import { compose } from 'recompose'
import { Grid, Header } from 'semantic-ui-react'

import { AuthUserContext, withEmailVerification } from '../../utilities/Session'
import { withFirebase } from '../../utilities/Firebase'
import * as ROUTES from '../../utilities/routes'
import PasswordChangeForm from './ChangePassword'
import SignOutButton from '../../components/SignOut'
import LoginManagementBase from './LoginManagementBase'

const AuthedAccountPage = ({ authUser, history }) => {
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Row style={{ maxWidth: 450 }}>
        <Grid.Column style={{ paddingTop: '2em' }}>
          <Header as="h1" textAlign="center">
            Account Management
          </Header>
          <Header textAlign="center">{authUser.email}</Header>
          <PasswordChangeForm />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ padding: 0 }}>
        <SignOutButton />
        <LoginManagement authUser={authUser} />
      </Grid.Row>
    </Grid>
  )
}

const AccountPage = ({ history }) => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <AuthedAccountPage authUser={authUser} /> : history.push(ROUTES.LANDING))}
  </AuthUserContext.Consumer>
)

const LoginManagement = withFirebase(LoginManagementBase)

export default compose(
  withEmailVerification,
  withFirebase
)(AccountPage)
