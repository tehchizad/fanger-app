import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './styles.css'

import LandingPage from '../../views/Landing'
import SignUpPage from '../../views/SignUp'
import SignInPage from '../../views/SignIn'
import PasswordForgetPage from '../../views/PasswordForget'
import AccountPage from '../../views/Account'
import AdminPage from '../../views/Admin'

import Navigation from '../../components/Navigation'
import * as ROUTES from '../../utilities/routes'
import { withAuthentication } from '../../utilities/Session'

import { Container } from 'semantic-ui-react'

const App = () => (
  <Container>
    <Router>
      <Navigation />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </Router>
  </Container>
)

export default withAuthentication(App)
