import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

// gcloud kms encrypt --plaintext-file=.env --ciphertext-file=.env.enc --location=global --keyring=fanger-app-keyring --key=cloudbuild-env

const config = {
  apiKey: 'AIzaSyAU-fJLjjAz6zFGhuaBUP2v6VIwa7YtotY',
  authDomain: 'codettastone.firebaseapp.com',
  databaseURL: 'https://codettastone.firebaseio.com',
  projectId: 'codettastone',
  storageBucket: 'codettastone.appspot.com',
  messagingSenderId: '826170491074',
  appId: '1:826170491074:web:d207380dba55ef1b'
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({
      displayName: name
    })
  }

  addQuote(quote) {
    if (!this.auth.currentUser) {
      return alert('Not authorized')
    }

    return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
      quote
    })
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }

  async getCurrentUserQuote() {
    const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
    return quote.get('quote')
  }
}

export default new Firebase()
