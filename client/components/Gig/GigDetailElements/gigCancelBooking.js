import React from 'react'
import { Button } from 'semantic-ui-react'

// FOR DEEJAYS TO CANCEL BOOKING

const GigCancelBooking = props => {
  const { handleCancelBooking } = props;
  return (
    <div>
      <Button
        size="massive"
        onClick={(event) => handleCancelBooking(event)}
        >Cancel Your Set
      </Button>
    </div>
  )
}

export default GigCancelBooking;
