import React from 'react'
import { Button } from 'semantic-ui-react'

// FOR BOOKERS
// VIEW ALL GIGS THAT STILL NEED A DEEJAY

const OpenGigList = (props) => {
  const { toggleView, toggleCalendar } = props;
  return (
    <div>
      <Button
        onClick={() => {
          toggleView('viewOpenGigs')
          toggleCalendar('openGigs')
        }}
        size="massive">
        Open Bookings
      </Button>
    </div>
  )
}

export default OpenGigList;
