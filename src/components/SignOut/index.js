import React from 'react'

import { withFirebase } from '../../utilities/Firebase'

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container
} from 'semantic-ui-react'

const SignOutButton = ({ firebase }) => (
  <Button onClick={firebase.doSignOut}>Sign Out</Button>
)

export default withFirebase(SignOutButton)
