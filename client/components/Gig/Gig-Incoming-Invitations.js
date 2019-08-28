import React from 'react'
import { Button } from 'semantic-ui-react'
require('../../../public/stylesheets/sidebar.css')

// FOR DEEJAYS
// VIEWING INCOMING BOOKING INVITATION REQUESTS FROM BOOKERS

const IncomingInvitations = (props) => {
  const { toggleView } = props;
  return (
    <div>
        <Button
          onClick={() => {toggleView('viewIncomingInvitations')}}
          className="sidebar-button"
          size="massive">
          Incoming Booking Requests
        </Button>
    </div>
  )
}

export default IncomingInvitations;
