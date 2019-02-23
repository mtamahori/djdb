import React from 'react'
import { Button } from 'semantic-ui-react'

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
