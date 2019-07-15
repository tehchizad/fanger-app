import React, { Component } from 'react'
import { Grid, Input, Search, Label, Header, Message, Container, Segment, Button, Form } from 'semantic-ui-react'
import { AuthUserContext } from '../../utilities/Session'
import * as ROUTES from '../../utilities/routes'

const testFeed = [
  {
    id: 473874893,
    title: 'First challenge',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, maiores!',
    likes: 3,
    creator: 'name name',
    challenger: 'name name'
  },
  {
    id: 34384093,
    title: 'Second challenge',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora facere cum explicabo, amet nisi veniam.',
    likes: 2,
    creator: 'name name',
    challenger: 'name name'
  },
  {
    id: 283908802,
    title: 'Second challenge',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora facere cum explicabo, amet nisi veniam.',
    likes: 9,
    creator: 'name name',
    challenger: 'name name'
  },
  {
    id: 847937292,
    title: 'Second challenge',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora facere cum explicabo, amet nisi veniam.',
    likes: 11,
    creator: 'name name',
    challenger: 'name name'
  },
  {
    id: 101903019,
    title: 'Third challenge',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora facere cum explicabo, amet nisi veniam.',
    likes: 5,
    creator: 'name name',
    challenger: 'name name'
  }
]

const INITIAL_STATE = {
  email: '',
  payload: '',
  error: null,
  value: ''
}

const InlineStyle = () => (
  <style>
    {`
    .container {
      height: 100vh;
      margin: auto;
    }
    .decor {
      width: 100% !important;
      color: black !important;
      padding: 15px !important;
      margin: 0px !important;
      font-size: 48px;
    }
    .hero {
      margin-top: 5% !important;
      margin-bottom: 5% !important;
      max-width: 850px !important;
    }
    .mainCard {
      max-width: 220px;
      height: 210px;
    }
    .thumbCard {
      
    }
  `}
  </style>
)

const thumbnails = testFeed.map(item => {
  return (
    <Grid.Column width={5} textAlign="left" key={item.id}>
      <Segment stacked color="grey">
        <Label attached="top left" color="grey" className="thumbCard font-effect-anaglyph">
          {item.challenger}
        </Label>
        <br />
        {item.description}
      </Segment>
    </Grid.Column>
  )
})

const accentColor = 'red'

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    event.preventDefault()
    const { email, payload } = this.state
    console.log(`Challenge: ${email} - ${payload}`)
    let url = `https://us-central1-fanger-app.cloudfunctions.net/emailBackend`
    let postFunction = fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      body: `${email}, ${payload}`
    })
    postFunction.then(() => {
      this.setState({ email: '', payload: '' })
      this.resetForm()
    })
  }

  resetForm = () => {
    document.getElementById('challengeForm').reset()
  }

  handleFormChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email, payload, error } = this.state
    const isInvalid = email === '' || payload === ''

    return (
      <div>
        <InlineStyle />
        {/* Decorative header */}
        <div className="decor font-effect-anaglyph">
          <Grid>
            <Grid.Column floated="left" textAlign="left" width={8}>
              +
            </Grid.Column>
            <Grid.Column floated="right" textAlign="right" width={8}>
              +
            </Grid.Column>
          </Grid>
        </div>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <Container>
                <Grid divided="vertically" centered stackable>
                  <Grid.Row columns={2} className="hero">
                    <Grid.Column width={4} textAlign="right">
                      <span className="font-effect-anaglyph">FANGER</span> Lorem ipsum, dolor sit amet consectetur
                      adipisicing elit. Veritatis labore nisi architecto tempora ullam magnam illum rerum quo nemo cum
                      sequi qui distinctio nulla hic autem, quae delectus beatae accusamus?
                    </Grid.Column>
                    <Grid.Column width={8} textAlign="left">
                      <Form onSubmit={this.onSubmit} id="challengeForm">
                        <Segment raised color={accentColor} className="mainCard" attached>
                          <Header as="h1" textAlign="center">
                            <Header.Content>
                              <span className="font-effect-anaglyph">c0d3tt4st0n3</span>
                            </Header.Content>
                          </Header>
                          <Input
                            fluid
                            name="email"
                            label={{ icon: 'at', color: accentColor }}
                            labelPosition="left corner"
                            placeholder="Email"
                            onChange={this.handleFormChange}
                          />
                          <br />
                          <Input
                            fluid
                            name="payload"
                            label={{ icon: 'tasks', color: accentColor }}
                            labelPosition="left corner"
                            placeholder="Challenge"
                            onChange={this.handleFormChange}
                          />
                          {error && <Message negative>{error.message}</Message>}
                        </Segment>
                        <Button
                          disabled={isInvalid}
                          onClick={this.onSubmit}
                          attached="bottom"
                          content="send"
                          color={accentColor}
                        />
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={3} style={{ paddingTop: '2em', paddingBottom: '2em', margin: '0' }}>
                    {thumbnails}
                  </Grid.Row>
                </Grid>
              </Container>
            ) : (
              this.props.history.push(ROUTES.SIGN_IN)
            )
          }
        </AuthUserContext.Consumer>
      </div>
    )
  }
}

export default Landing
