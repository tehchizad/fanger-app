import React from 'react'

import { withFirebase } from '../../utilities/Firebase'

import { Button, Form } from 'semantic-ui-react'

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
