import React from 'react'
import {
  IncomingInvitations,
  OutgoingApplications,
  UpcomingGigList,
  PastGigList,
  BrowseGigList,
  BrowseBookerList
} from '../index'
require('../../../public/stylesheets/deejayMain.css')

// FOR DEEJAYS
// Renders appropriate buttons that display appropriate gig lists.
// Rendered in DeejayMain

const DeejaySidebar = (props) => {
  const { toggleView, toggleCalendar } = props;
  return (
    <div className="sidebar-container">
      <IncomingInvitations
      className="sidebar-button"
      toggleView={toggleView}
      />
      <OutgoingApplications
      className="sidebar-button"
      toggleView={toggleView}
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
      <BrowseGigList
      className="sidebar-button"
      toggleView={toggleView}
      />
      <BrowseBookerList
      className="sidebar-button"
      toggleView={toggleView}
      />
    </div>
  )
}

export default DeejaySidebar;
