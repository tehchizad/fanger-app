import React, { useState } from 'react'
import clsx from 'clsx'
import { withFirebase } from '../../utilities/Firebase'
import {
  Button,
  IconButton,
  Input,
  FormHelperText,
  InputLabel,
  InputAdornment,
  CircularProgress,
  FormControl
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

function PasswordChangeForm({ firebase }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    passwordOne: '',
    passwordTwo: '',
    showPasswordOne: false,
    showPasswordTwo: false,
    error: '',
    loading: false,
    success: false
  })
  const buttonClassname = clsx({
    [classes.buttonSuccess]: values.success
  })

  function handleButtonClick() {
    if (!values.loading) {
      setValues({ success: false })
      setValues({ loading: true })
      firebase
        .doPasswordUpdate(values.passwordOne)
        .then(() => {
          setValues({ passwordOne: '', passwordTwo: '' })
          setValues({ success: true })
          setValues({ loading: false })
        })
        .catch(error => {
          setValues({ error: error.message })
        })
    }
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPasswordOne = () => {
    setValues({ ...values, showPasswordOne: !values.showPasswordOne })
  }

  const handleClickShowPasswordTwo = () => {
    setValues({ ...values, showPasswordTwo: !values.showPasswordTwo })
  }

  return (
    <div className={classes.wrapper}>
      <FormControl>
        <InputLabel htmlFor="adornment-password">New Password</InputLabel>
        <Input
          id="passwordOne"
          type={values.showPasswordOne ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('passwordOne')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPasswordOne}>
                {values.showPasswordOne ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <br />
      <FormControl error={values.error}>
        <InputLabel htmlFor="adornment-password">Confirm new password</InputLabel>
        <Input
          id="passwordTwo"
          type={values.showPasswordTwo ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('passwordTwo')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="Toggle password visibility" onClick={handleClickShowPasswordTwo}>
                {values.showPasswordTwo ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText id="passwordTwo">{values.error}</FormHelperText>
      </FormControl>
      <br />
      <Button
        variant="contained"
        color="primary"
        className={buttonClassname}
        disabled={values.loading}
        onClick={handleButtonClick}>
        Change Password
      </Button>
      {values.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  )
}

export default withFirebase(PasswordChangeForm)
