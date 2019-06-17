import React from 'react'
import { Link } from 'react-router-dom'

import SignOutButton from '../SignOut'
import { AuthUserContext } from '../../utilities/Session'

import * as ROUTES from '../../utilities/routes'
import * as ROLES from '../../utilities/roles'

import { Menu, Button } from 'semantic-ui-react'

const Navigation = () => (
  <Menu tabular>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </Menu>
)

const NavigationAuth = ({ authUser }) => (
  <Menu.Menu position="right">
    <Menu.Item>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={ROUTES.HOME}>Home</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </Menu.Item>
    {!!authUser.roles[ROLES.ADMIN] && (
      <Menu.Item>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </Menu.Item>
    )}
    <Menu.Item>
      <SignOutButton />
    </Menu.Item>
  </Menu.Menu>
)

const NavigationNonAuth = () => (
  <Menu.Menu position="right">
    <Menu.Item>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </Menu.Item>
    <Menu.Item>
      <Button content="Sign In" as={Link} to={ROUTES.SIGN_IN} />
    </Menu.Item>
  </Menu.Menu>
)

export default Navigation
