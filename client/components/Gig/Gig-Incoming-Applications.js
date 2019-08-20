import React from 'react'
import { Button } from 'semantic-ui-react'
require('../../../public/stylesheets/bookerMain.css')

// FOR BOOKERS
// BUTTON FOR VIEWING INCOMING BOOKING APPLICATION REQUESTS FROM DEEJAYS

const IncomingApplications = (props) => {
    const { viewIncomingApplications } = props;
  return (
    <div>
      <Button
        onClick={() => {viewIncomingApplications()}}
        size="massive">
        Incoming Booking Requests
      </Button>
    </div>
  )
}

export default IncomingApplications;
