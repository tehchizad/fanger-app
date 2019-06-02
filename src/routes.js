import React, { Fragment } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import HomePage from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'

const Routes = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Fragment>
  )
}

export default Routes
