import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

const INITIAL_STATE = {
  email: '',
  error: null
}

export default class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email } = this.state
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        this.setState({ error })
      })
    event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email, error } = this.state
    const isInvalid = email === ''

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Button disabled={isInvalid} type="submit" color="black" fluid>
          Reset My Password
        </Button>
        {error && <Message negative>{error.message}</Message>}
      </Form>
    )
  }
}
