import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LandingPage from '../../views/Landing'
import SignUpPage from '../../views/SignUp'
import SignInPage from '../../views/SignIn'
import PasswordForgetPage from '../../views/PasswordForget'
import AccountPage from '../../views/Account'
import * as ROUTES from '../../utilities/routes'
import { withAuthentication } from '../../utilities/Session'

import './styles.css'

const App = () => (
  <div>
    <Router>
      {/* <Navigation /> */}
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
    </Router>
  </div>
)

export default withAuthentication(App)
