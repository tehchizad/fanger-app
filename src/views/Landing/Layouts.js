import React from 'react'
import { Step, Icon } from 'semantic-ui-react'

export default function Layouts() {
  return (
    <Step.Group size='mini' widths={3}>
      <Step>
        <Icon name='newspaper' size='mini' />
        <Step.Content>
          <Step.Title>Trending</Step.Title>
          <Step.Description>Choose your shipping options</Step.Description>
        </Step.Content>
      </Step>

      <Step active>
        <Icon name='fire' size='mini' />
        <Step.Content>
          <Step.Title>Challenge</Step.Title>
          <Step.Description>Enter billing information</Step.Description>
        </Step.Content>
      </Step>

      <Step >
        <Icon name='history' size='mini' />
        <Step.Content>
          <Step.Title>History</Step.Title>
          <Step.Description>Verify order details</Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>

  )
}
