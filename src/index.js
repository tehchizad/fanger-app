import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'

import App from './components/App'
import Firebase, { FirebaseContext } from './utilities/Firebase'

// import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
)

// registerServiceWorker()
