import React, { Component } from 'react'
import sgMail from '@sendgrid/mail'

import { AuthUserContext } from '../../utilities/Session'

import { Grid, Header, Form, Message, Segment, Button } from 'semantic-ui-react'

const INITIAL_STATE = {
  email: '',
  payload: '',
  error: null
}

const Intro = () => (
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam quo earum
    ullam, facilis aliquid dolorum cum eos sed consequatur a reiciendis sit
    accusantium explicabo impedit.
  </p>
)

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    event.preventDefault()
    const { email, payload } = this.state
    const msg = {
      to: email,
      from: 'test@example.com',
      subject: 'Sending with SendGrid is Fun',
      text: payload,
      html: '<strong>and easy to do anywhere, even with Node.js</strong>'
    }
    sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY)
    sgMail.send(msg)
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email, payload, error } = this.state
    const isInvalid = email === '' || payload === ''

    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Row style={{ maxWidth: 450 }}>
          <Grid.Column style={{ paddingTop: '2em' }}>
            <Header as="h2" textAlign="center">
              You wanna play a game?
            </Header>
            <AuthUserContext.Consumer>
              {authUser =>
                authUser ? (
                  <Segment stacked>
                    <Form onSubmit={this.onSubmit}>
                      <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Email"
                      />
                      <Form.TextArea
                        name="payload"
                        onChange={this.onChange}
                        type="text"
                      />
                      <Button
                        fluid
                        disabled={isInvalid}
                        type="submit"
                        color="black"
                        content="Send"
                      />
                      {error && <Message negative>{error.message}</Message>}
                    </Form>
                  </Segment>
                ) : (
                  <Intro />
                )
              }
            </AuthUserContext.Consumer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Landing
