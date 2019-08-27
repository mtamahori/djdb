import React from 'react'
import { Button } from 'semantic-ui-react'

// VIEW UPCOMING GIGS

const UpcomingGigList = (props) => {
  const { toggleView, toggleCalendar } = props;
  return (
    <div>
        <Button
          onClick={() => {
            toggleView('viewUpcomingGigs')
            toggleCalendar('upcomingGigs')
          }}
          className="sidebar-button"
          size="massive"
        >Upcoming Bookings
        </Button>
    </div>
  )
}

export default UpcomingGigList;
