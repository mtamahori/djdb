import React from 'react'
import { Button } from 'semantic-ui-react'

// VIEW PAST GIGS

const PastGigList = (props) => {
  const { toggleView, toggleCalendar } = props;
  return (
    <div>
      <Button
        onClick={() => {
          toggleView('viewPastGigs')
          toggleCalendar('pastGigs')
        }}
        className="sidebar-button"
        size="massive">
        Past Bookings
      </Button>
    </div>
  )
}

export default PastGigList;
