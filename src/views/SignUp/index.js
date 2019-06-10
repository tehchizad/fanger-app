import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../../utilities/Firebase'

import * as ROUTES from '../../utilities/routes'
import * as ROLES from '../../utilities/roles'

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
)

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null
}

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/account-exists-with-different-credential'
const ERROR_MSG_ACCOUNT_EXISTS = `An account with an E-Mail address to this social account already exists. Try to login from this account instead and associate your social accounts on your personal account page.`

class SignUpFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = e => {
    const { username, email, passwordOne, isAdmin } = this.state
    const roles = {}

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      // Create the user in the Firebase realtime database
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({ username, email, roles })
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification()
      })

      //  Reset state & route home
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
      })
    e.preventDefault()
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onChangeCheckbox = e => {
    this.setState({ [e.target.name]: e.target.checked })
  }

  render() {
    const { username, email, passwordOne, passwordTwo, isAdmin, error } = this.state
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>

        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
)

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase)

export default SignUpPage

export { SignUpForm, SignUpLink }
