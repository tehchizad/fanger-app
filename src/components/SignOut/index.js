import React from 'react'
import { withFirebase } from '../../utilities/Firebase'

const SignOutButton = ({ firebase }) => (
  <form>
    <button onClick={firebase.doSignOut} size="tiny" color="red" icon="log out">
      Logout
    </button>
  </form>
)

export default withFirebase(SignOutButton)
