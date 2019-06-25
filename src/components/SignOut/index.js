import React from 'react'
import { Button, Form } from 'semantic-ui-react'

import { withFirebase } from '../../utilities/Firebase'

const SignOutButton = ({ firebase }) => (
  <Form>
    <Button
      onClick={firebase.doSignOut}
      size="tiny"
      color="red"
      icon="log out"
      content="Logout"
    />
  </Form>
)

export default withFirebase(SignOutButton)
