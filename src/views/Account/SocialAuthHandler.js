import React, { Component, useState, useEffect } from 'react'

const SIGN_IN_METHODS = [
  { id: 'password', provider: null },
  { id: 'google.com', provider: 'googleProvider' },
  { id: 'facebook.com', provider: 'facebookProvider' }
]

const SocialLoginToggle = ({ onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink }) =>
  isEnabled ? (
    <button onClick={() => onUnlink(signInMethod.id)} disabled={onlyOneLeft}>
      unlink {signInMethod.id}
    </button>
  ) : (
    <button onClick={() => onLink(signInMethod.provider)}>link {signInMethod.id}</button>
  )

// class LoginManagementBase extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       activeSignInMethods: [],
//       error: null
//     }
//   }

//   componentDidMount() {
//     this.fetchSignInMethods()
//   }

//   fetchSignInMethods = () => {
//     this.props.firebase.auth
//       .fetchSignInMethodsForEmail(this.props.authUser.email)
//       .then(activeSignInMethods => this.setState({ activeSignInMethods, error: null }))
//       .catch(error => this.setState({ error }))
//   }

//   onSocialLoginLink = provider => {
//     this.props.firebase.auth.currentUser
//       .linkWithPopup(this.props.firebase[provider])
//       .then(this.fetchSignInMethods)
//       .catch(error => this.setState({ error }))
//   }

//   onDefaultLoginLink = password => {
//     const credential = this.props.firebase.emailAuthProvider.credential(this.props.authUser.email, password)

//     this.props.firebase.auth.currentUser
//       .linkAndRetrieveDataWithCredential(credential)
//       .then(this.fetchSignInMethods)
//       .catch(error => this.setState({ error }))
//   }

//   onUnlink = providerId => {
//     this.props.firebase.auth.currentUser
//       .unlink(providerId)
//       .then(this.fetchSignInMethods)
//       .catch(error => this.setState({ error }))
//   }

//   render() {
//     return (
//       <form>
//         {SIGN_IN_METHODS.map(signInMethod => {
//           const onlyOneLeft = this.state.activeSignInMethods.length === 1
//           const isEnabled = this.state.activeSignInMethods.includes(signInMethod.id)

//           return (
//             <SocialLoginToggle
//               key={signInMethod.id}
//               onlyOneLeft={onlyOneLeft}
//               isEnabled={isEnabled}
//               signInMethod={signInMethod}
//               onLink={this.onSocialLoginLink}
//               onUnlink={this.onUnlink}
//             />
//           )
//         })}
//         {this.state.error && <p>{this.state.error.message}</p>}
//       </form>
//     )
//   }
// }

const LoginManagementBase = ({ firebase, authUser }) => {
  const [activeSignInMethods, setActiveSignInMethods] = useState([])
  const [error, setError] = useState(null)

  const fetchSignInMethods = (firebase, authUser) => {
    console.log('Fetching sign in methods from firebase')
    firebase.auth
      .fetchSignInMethodsForEmail(authUser.email)
      .then(activeSignInMethods => setActiveSignInMethods(activeSignInMethods))
      .catch(error => setError({ error }))
  }

  const onSocialLoginLink = provider => {
    firebase.auth.currentUser
      .linkWithPopup(firebase[provider])
      .then(fetchSignInMethods)
      .catch(error => setError({ error }))
  }

  const onUnlink = providerId => {
    firebase.auth.currentUser
      .unlink(providerId)
      .then(fetchSignInMethods)
      .catch(error => setError({ error }))
  }

  useEffect(() => {
    console.log('Social auth mounted')
    const fetchSignInMethods = () => {
      console.log('Fetching sign in methods from firebase')
      firebase.auth
        .fetchSignInMethodsForEmail(authUser.email)
        .then(activeSignInMethods => setActiveSignInMethods(activeSignInMethods))
        .catch(error => setError({ error }))
    }
    fetchSignInMethods()
  }, [authUser.email, firebase.auth])

  return (
    <form>
      {SIGN_IN_METHODS.map(signInMethod => {
        console.log(activeSignInMethods)
        const onlyOneLeft = activeSignInMethods.length === 1
        const isEnabled = activeSignInMethods.includes(signInMethod.id)

        return (
          <SocialLoginToggle
            key={signInMethod.id}
            onlyOneLeft={onlyOneLeft}
            isEnabled={isEnabled}
            signInMethod={signInMethod}
            onLink={onSocialLoginLink}
            onUnlink={onUnlink}
          />
        )
      })}
      {error && <p>{error.message}</p>}
    </form>
  )
}

export default LoginManagementBase
