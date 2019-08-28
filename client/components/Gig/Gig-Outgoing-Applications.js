import React from 'react'
import { Button } from 'semantic-ui-react'
require('../../../public/stylesheets/sidebar.css')

// FOR DEEJAYS
// VIEWING OUTGOING BOOKING APPLICATION REQUESTS TO BOOKERS

const OutgoingApplications = (props) => {
  const { toggleView } = props;
  return (
    <div>
      <Button
        onClick={() => {toggleView('viewOutgoingApplications')}}
        className="sidebar-button"
        size="massive">
        Outgoing Booking Requests
      </Button>
    </div>
  )
}

export default OutgoingApplications;
