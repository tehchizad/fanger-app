import React from 'react'

import { withFirebase } from '../../utilities/Firebase'

import { Button } from 'semantic-ui-react'

const SignOutButton = ({ firebase }) => (
  <Button
    onClick={firebase.doSignOut}
    color="red"
    size="tiny"
    icon="log out icon"
    content="Logout"
  />
)

export default withFirebase(SignOutButton)
