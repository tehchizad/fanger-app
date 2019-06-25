import React, { useState } from 'react'
import { Button, Dimmer, Loader, Form, Message } from 'semantic-ui-react'

import { withFirebase } from '../../utilities/Firebase'

function PasswordChangeForm({ firebase }) {
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [error, setError] = useState(null)
  const [reset, setReset] = useState(false)
  const [loading, setLoading] = useState(false)

  const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

  const onSubmit = event => {
    setLoading(true)
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setLoading(false)
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
    <Form onSubmit={onSubmit}>
      <Form.Input
        name="passwordOne"
        value={passwordOne}
        onChange={(e) => setPasswordOne(e.target.value)}
        type="password"
        placeholder="New Password"
      />
      <Dimmer inverted active={loading}>
        <Loader />
      </Dimmer>
      <Form.Input
        name="passwordTwo"
        value={passwordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
        type="password"
        placeholder="Confirm New Password"
      />
      <Button disabled={isInvalid} type="submit" color="black" fluid>
        Reset My Password
        </Button>
      {error && (<Message negative>{error.message}</Message>)}
      {reset && (<Message positive >Success!</Message>)}
    </Form>
  )
}

export default withFirebase(PasswordChangeForm)

