import React, { Component } from 'react'
import { Fab } from '@material-ui/core'
import { Link, LinkOff } from '@material-ui/icons'

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
    name: 'email',
    color: 'green'
  },
  {
    id: 'google.com',
    provider: 'googleProvider',
    name: 'google',
    color: 'orange'
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider',
    name: 'facebook',
    color: 'blue'
  }
]

const SocialLoginToggle = ({ onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink }) =>
  isEnabled ? (
    <Fab
      color="default"
      variant="extended"
      size="small"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
      content="Unlink">
      <LinkOff /> {signInMethod.name}
    </Fab>
  ) : (
    <Fab variant="extended" size="small" onClick={() => onLink(signInMethod.provider)} content="Link">
      <Link /> {signInMethod.name}
    </Fab>
  )

class SocialAuthHandler extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeSignInMethods: [],
      error: null
    }
  }

  componentDidMount() {
    this.fetchSignInMethods()
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then(activeSignInMethods => this.setState({ activeSignInMethods, error: null }))
      .catch(error => this.setState({ error }))
  }

  onSocialLoginLink = provider => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }))
  }

  onDefaultLoginLink = password => {
    const credential = this.props.firebase.emailAuthProvider.credential(this.props.authUser.email, password)

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }))
  }

  onUnlink = providerId => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }))
  }

  render() {
    const { activeSignInMethods, error } = this.state

    return (
      <React.Fragment>
        {SIGN_IN_METHODS.map(signInMethod => {
          const onlyOneLeft = activeSignInMethods.length === 1
          const isEnabled = activeSignInMethods.includes(signInMethod.id)

          return (
            <SocialLoginToggle
              key={signInMethod.id}
              onlyOneLeft={onlyOneLeft}
              isEnabled={isEnabled}
              signInMethod={signInMethod}
              onLink={this.onSocialLoginLink}
              onUnlink={this.onUnlink}
            />
          )
        })}
        {error && <p>{error.message}</p>}
      </React.Fragment>
    )
  }
}

export default SocialAuthHandler
