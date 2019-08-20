import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
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

// need to make a view/hide button for CALENDAR

const BookerSidebar = (props) => {
  const { gigs, deejays, currentBooker } = props;
  const { viewIncomingApplications } = props;

  return (
    <div className="sidebar-container">

      <IncomingApplications
      className="sidebar-button"
      viewIncomingApplications={viewIncomingApplications}
      />

      <OutgoingInvitations className="sidebar-button" gigs={gigs} currentBooker={currentBooker} />
      <OpenGigList className="sidebar-button" gigs={gigs} currentBooker={currentBooker} />
      <UpcomingGigList className="sidebar-button" gigs={gigs} currentBooker={currentBooker} />
      <PastGigList className="sidebar-button" gigs={gigs} currentBooker={currentBooker} />
      <BrowseDeejayList className="sidebar-button" deejays={deejays} currentBooker={currentBooker} />
      <NewGig currentBooker={currentBooker} />
    </div>
  )
}

export default BookerSidebar;
