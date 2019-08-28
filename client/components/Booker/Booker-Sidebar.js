import React from 'react'
import {
  IncomingApplications,
  OutgoingInvitations,
  PastGigList,
  UpcomingGigList,
  OpenGigList,
  NewGig,
  BrowseDeejayList,
} from '../index'
require('../../../public/stylesheets/bookerMain.css')

// FOR BOOKERS
// Renders appropriate buttons that display appropriate gig lists.
// Rendered in BookerMain

const BookerSidebar = (props) => {
  const { toggleView, toggleCalendar } = props;

  return (
    <div className="sidebar-container">
      <IncomingApplications
      className="sidebar-button"
      toggleView={toggleView}
      />
      <OutgoingInvitations
      className="sidebar-button"
      toggleView={toggleView}
      />
      <OpenGigList
      className="sidebar-button"
      toggleView={toggleView}
      toggleCalendar={toggleCalendar}
      />
      <UpcomingGigList
      className="sidebar-button"
      toggleView={toggleView}
      toggleCalendar={toggleCalendar}
      />
      <PastGigList
      className="sidebar-button"
      toggleView={toggleView}
      toggleCalendar={toggleCalendar}
      />
      <BrowseDeejayList
      className="sidebar-button"
      toggleView={toggleView}
      />
      <NewGig
      className="sidebar-button"
      toggleView={toggleView}
      />
    </div>
  )
}

export default BookerSidebar;
