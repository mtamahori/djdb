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
  const { toggleView } = props;

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

      <OpenGigList className="sidebar-button" />
      <UpcomingGigList className="sidebar-button" />
      <PastGigList className="sidebar-button" />
      <BrowseDeejayList className="sidebar-button" />
      <NewGig className="sidebar-button" />
    </div>
  )
}

export default BookerSidebar;
