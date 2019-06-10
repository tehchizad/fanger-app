import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { compose } from 'recompose'

import { withAuthorization, withEmailVerification } from '../../utilities/Session'
import { UserList, UserItem } from '../Users'
import * as ROLES from '../../utilities/roles'
import * as ROUTES from '../../utilities/routes'

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
)

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminPage)
