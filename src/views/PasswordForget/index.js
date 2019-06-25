import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Header } from 'semantic-ui-react'

import { withFirebase } from '../../utilities/Firebase'
import * as ROUTES from '../../utilities/routes'

import PasswordForgetFormBase from './PasswordForgetFormBase'

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

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

const PasswordForgetForm = withFirebase(PasswordForgetFormBase)

export { PasswordForgetForm, PasswordForgetLink }
export default PasswordForgetPage
