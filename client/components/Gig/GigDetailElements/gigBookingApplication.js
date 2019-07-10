import React from 'react'
import { Button } from 'semantic-ui-react'

// FOR DEEJAYS TO SEND BOOKING APPLICATION

const GigBookingApplication = props => {
  const { handleBookingApplication } = props;
  return (
    <Button
        size="massive"
          onClick={(event) => handleBookingApplication(event)}
          >
          Send Booking Request
    </Button>
  )
}

export default GigBookingApplication;
