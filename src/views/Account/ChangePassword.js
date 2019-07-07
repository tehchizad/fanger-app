import React, { useState } from 'react'
import { withFirebase } from '../../utilities/Firebase'

function PasswordChangeForm({ firebase }) {
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [error, setError] = useState(null)
  const [reset, setReset] = useState(false)

  const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

  const onSubmit = event => {
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setPasswordOne('')
        setPasswordTwo('')
        setReset(true)
        setTimeout(() => {
          setReset(false)
        }, 2000)
      })
      .catch(error => {
        setError(error)
      })

    event.preventDefault()
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={e => setPasswordOne(e.target.value)}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={e => setPasswordTwo(e.target.value)}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit" color="black" fluid>
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
      {reset && <p>Success!</p>}
    </form>
  )
}

export default withFirebase(PasswordChangeForm)
