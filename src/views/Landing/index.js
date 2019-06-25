import React, { Component } from 'react'
import { Grid, Header, Form, Message, Segment, Button } from 'semantic-ui-react'
import { AuthUserContext } from '../../utilities/Session'
import Layouts from './Layouts'

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
    let url = `https://us-central1-fanger-app.cloudfunctions.net/emailBackend`
    let postFunction = fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      body: `${email}, ${payload}`
    })
    postFunction.then(response => {
      this.setState({ email: '', payload: '' })
      console.log(response)
    })
  }

  resetForm = () => {
    document.getElementById('challengeForm').reset()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email, payload, error } = this.state
    const isInvalid = email === '' || payload === ''

    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Row style={{ maxWidth: 550 }}>
          <Grid.Column style={{ paddingTop: '2em' }}>
            <Header as="h2" textAlign="center">
              You wanna play a game?
            </Header>
            <AuthUserContext.Consumer>
              {authUser =>
                authUser ? (
                  <Segment stacked color='red' >
                    <Form onSubmit={this.onSubmit} id="challengeForm">
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
                        onClick={this.resetForm}
                      />
                      {error && <Message negative>{error.message}</Message>}
                    </Form>
                    <Layouts />
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
