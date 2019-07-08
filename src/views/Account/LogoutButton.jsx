import React from 'react'
import { Fab } from '@material-ui/core'
import { Clear } from '@material-ui/icons'

function LogoutButton({ firebase }) {
  return (
    <Fab variant="extended" size="small" color="secondary" onClick={firebase.doSignOut}>
      <Clear /> Logout
    </Fab>
  )
}

export default LogoutButton
