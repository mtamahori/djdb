import React from 'react'
import { Button } from 'semantic-ui-react'

// FOR BOOKERS
// VIEWING OUTGOING BOOKING INVITATION REQUESTS TO DEEJAYS

const OutgoingInvitations = (props) => {
  const { toggleView } = props;
  return (
    <div>
      <Button
        onClick={() => {toggleView('viewOutgoingInvites')}}
        size="massive">
        Outgoing Booking Requests
      </Button>
    </div>
  )
}

export default OutgoingInvitations;
