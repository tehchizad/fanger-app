import React from 'react'
import { compose } from 'recompose'

import { withAuthorization, withEmailVerification } from '../../utilities/Session'

import { Grid, Header } from 'semantic-ui-react'

const HomePage = () => (
  <Grid centered columns={2}>
    <Grid.Column>
      <Header as="h2" textAlign="center">
        Home Page
      </Header>
      <p>The Home Page is accessible by every signed in user. </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor
        sit amet, consectetur adipisicing elit. Mollitia amet iure doloribus sunt
        pariatur ab nobis non similique blanditiis doloremque!
      </p>
    </Grid.Column>
  </Grid>
)

const condition = authUser => !!authUser

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage)
