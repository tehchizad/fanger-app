import React, { Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { Home } from './views/Home/Home'
import { NoMatch } from './views/NoMatch/NoMatch'
import { NavBar } from './components/NavBar/NavBar'

import CssBaseline from '@material-ui/core/CssBaseline'

export const Routes = () => {
  return (
    <Fragment>
      <CssBaseline />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/Home" component={Home} />
        <Route component={NoMatch} />
      </Switch>
    </Fragment>
  )
}
