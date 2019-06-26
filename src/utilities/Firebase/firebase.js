import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'codettastone.firebaseapp.com',
  databaseURL: 'https://codettastone.firebaseio.com',
  projectId: 'codettastone',
  storageBucket: 'codettastone.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.emailAuthProvider = app.auth.EmailAuthProvider
    this.auth = app.auth()
    this.db = app.database()
    this.googleProvider = new app.auth.GoogleAuthProvider()
    this.facebookProvider = new app.auth.FacebookAuthProvider()
    this.twitterProvider = new app.auth.TwitterAuthProvider()
  }

  // Authentication methods for the various login routes
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)
  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password)
  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider)
  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider)
  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider)
  doSignOut = () => this.auth.signOut()
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)
  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
    })

  // Merge Auth and DB User information //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val()
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {}
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser
            }
            next(authUser)
          })
      } else {
        fallback()
      }
    })

  // User mgmt methods
  user = uid => this.db.ref(`users/${uid}`)
  users = () => this.db.ref('users')
}

export default Firebase
