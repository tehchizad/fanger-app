import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './styles.css'

import LandingPage from '../../views/Landing'
import SignUpPage from '../../views/SignUp'
import SignInPage from '../../views/SignIn'
import PasswordForgetPage from '../../views/PasswordForget'
import HomePage from '../../views/Home'
import AccountPage from '../../views/Account'
import AdminPage from '../../views/Admin'

import Navigation from '../../components/Navigation'
import * as ROUTES from '../../utilities/routes'
import { withAuthentication } from '../../utilities/Session'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

const theme = createMuiTheme()

const App = () => (
  <Router>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </MuiThemeProvider>
  </Router>
)

export default withAuthentication(App)
