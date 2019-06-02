import React, { useState, useEffect } from 'react'

import './styles.css'
import firebase from './firebase'

import Routes from '../routes'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'

const theme = createMuiTheme()

export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false)
  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val)
    })
  })

  return firebaseInitialized !== false ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </MuiThemeProvider>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  )
}
