import React from 'react'
import { Button } from 'semantic-ui-react'

// FOR DEEJAYS TO ACCEPT/DECLINE BOOKING INVITATION

const GigAcceptDeclineBookingRequest = props => {
  const { handleBookingAccept, handleBookingDecline } = props;
  return (
    <div>
      <Button
        size="massive"
        onClick={(event) => handleBookingAccept(event)}
        >Accept Booking Request
      </Button>
      <Button
        size="massive"
        onClick={(event) => handleBookingDecline(event)}
        >Decline Booking Request
      </Button>
    </div>
  )
}

export default GigAcceptDeclineBookingRequest;
