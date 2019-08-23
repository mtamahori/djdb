import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearCalendar, setCalendarGigs } from '../../store'
import { Grid } from 'semantic-ui-react'
import {
  NewBookerForm,
  CalendarMain,
  BookerSideBar,
  GigItem
} from '../index'
import dateFns from 'date-fns'

// MAIN BOOKER PORTAL
// CONTAINS ALL RELEVANT GIG LISTS, BROWSE DEEJAYS, CALENDAR, AND NEW BOOKER FORM

class BookerMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewIncomingApplications: false,
      viewOutgoingInvites: false,
      viewOpenGigs: false,
      viewUpcomingGigs: false
    }

    this.toggleView = this.toggleView.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  componentDidMount() {
    const { clearCalendar } = this.props;
    clearCalendar();
  }

  // MAIN RENDER

  render() {
    const { currentBooker } = this.props;
    return (
      <div>
      {
        currentBooker === undefined ?
        <NewBookerForm /> :

          <div className="booker-main-container">

            <CalendarMain currentBooker={currentBooker} />

            <div className="gig-list-container">

              <BookerSideBar
              className="sidebar"
              toggleView={this.toggleView}
              toggleCalendar={this.toggleCalendar}
              />

              <div className="gig-list">
              {
                this.state.viewIncomingApplications &&
                this.renderIncomingApplications()
              }
              {
                this.state.viewOutgoingInvites &&
                this.renderOutgoingInvites()
              }
              {
                this.state.viewOpenGigs &&
                this.renderOpenBookings()
              }
              {
                this.state.viewUpcomingGigs &&
                this.renderUpcomingGigs()
              }
              </div>
            </div>
          </div>
      }
      </div>
    )
  }

  // ONCLICK TOGGLE FUNCTIONS (VIEW GIGS / CALENDAR)

  toggleView(listType) {
    let view = (type) => {
      let stateObj = this.state;
      for (let key in stateObj) {
        if (key !== type) {
          stateObj[key] = false;
        }
        else {
          stateObj[type] = true;
        }
      }
      return stateObj;
    }
    let hide = (type) => {
      let stateObj = {}
      stateObj[type] = false;
      return stateObj
    }
    this.state[listType] === false ?
    this.setState(view(listType)) :
    this.setState(hide(listType))
  }

  toggleCalendar(listType) {
    const { setCalendarGigs } = this.props;
    const openGigs = this.getOpenGigs();
    const upcomingGigs = this.getUpcomingGigs();

    if (listType === 'openGigs') {
      openGigs.length &&
      this.state.viewOpenGigs === true &&
      setCalendarGigs(openGigs);
    }

    if (listType === 'upcomingGigs') {
      upcomingGigs.length &&
      this.state.viewUpcomingGigs === true &&
      setCalendarGigs(upcomingGigs)
    }
  }

  // HELPER FUNCTIONS FOR GETTING THE RIGHT GIG LISTS OFF OF PROPS

  getGigApplications() {
    const { gigs, currentBooker } = this.props;
    const gigApplications = gigs.filter(gig => {
      return (
        gig.deejayId === null &&
        gig.bookerId === currentBooker.id &&
        gig.deejayApplicants.length &&
        this.futureDateCheck(gig)
      )
    })
    return gigApplications;
  }

  getGigPendingInvites() {
    const { gigs, currentBooker } = this.props;
    const gigPendingInvites = gigs.filter(gig => {
      return (
        gig.deejayId === null &&
        gig.bookerId === currentBooker.id &&
        gig.deejayInvites.length &&
        this.futureDateCheck(gig)
      )
    })
    return gigPendingInvites;
  }

  getOpenGigs() {
    const { gigs, currentBooker } = this.props;
    const openGigs = gigs.filter(gig => {
      return (
        gig.bookerId === currentBooker.id &&
        gig.deejayId === null &&
        this.futureDateCheck(gig)
      )
    })
    return openGigs;
  }

  getUpcomingGigs() {
    const { gigs, currentBooker } = this.props;
    const upcomingGigs = gigs.filter(gig => {
      return (
      gig.bookerId === currentBooker.id &&
      gig.deejayId !== null &&
      this.futureDateCheck(gig)
      )
    })
    return upcomingGigs;
  }

  // RENDER FUNCTIONS FOR SEPARATE GIG LISTS

  renderIncomingApplications() {
    const { currentBooker } = this.props;
    const gigApplications = this.getGigApplications();
    return (
      gigApplications.length ?
      <Grid
        className="gig-list"
        gigs={gigApplications}
        columns="equal"
        text-align="center"
        relaxed
        stackable>
        {
          gigApplications.map(gig => (
            <GigItem gig={gig} key={gig.id} currentBooker={currentBooker} />
          ))
        }
      </Grid> :
      <h3>You Have No Booking Requests Right Now</h3>
    )
  }

  renderOutgoingInvites() {
    const { currentBooker } = this.props;
    const gigPendingInvites = this.getGigPendingInvites();
    return (
      gigPendingInvites.length ?
      <Grid
        className="gig-list"
        gigs={gigPendingInvites}
        columns='equal'
        textAlign='center'
        relaxed
        stackable>
        {
          gigPendingInvites.map(gig => (
            <GigItem gig={gig} key={gig.id} currentBooker={currentBooker} />
          ))
        }
      </Grid> :
      <h3>You Have Not Sent Any Booking Requests</h3>
    )
  }

  renderOpenBookings() {
    const { currentBooker } = this.props;
    const openGigs = this.getOpenGigs();
    return (
      openGigs.length ?
      <Grid
        className="gig-list"
        gigs={openGigs}
        columns='equal'
        textAlign='center'
        relaxed
        stackable>
        {
          openGigs.map(gig => (
          <GigItem gig={gig} key={gig.id} currentBooker={currentBooker} />
          ))
        }
      </Grid> :
      <h3>You Have No Open Bookings Right Now</h3>
    )
  }

  renderUpcomingGigs() {
    const { currentBooker } = this.props;
    const upcomingGigs = this.getUpcomingGigs();
    return (
      upcomingGigs.length ?
      <Grid
        className="gig-list"
        gigs={upcomingGigs}
        columns='equal'
        textAlign='center'
        relaxed
        stackable>
        {
          upcomingGigs.map(gig => (
          <GigItem gig={gig} key={gig.id} currentBooker={currentBooker} />
          ))
        }
      </Grid> :
      <h3>You Have No Upcoming Bookings Right Now</h3>
    )
  }

  futureDateCheck(gig) {
    let gigDateArr = gig.date.split('/')
    let gigYear = gigDateArr[0]
    let gigMonth = gigDateArr[1]
    let gigDate = gigDateArr[2]
    return dateFns.isAfter(new Date(gigYear, gigMonth, gigDate), Date.now())
  }
}

const mapState = ({ user, bookers, deejays, gigs }) => {
  return {
    user,
    gigs,
    bookers,
    deejays,
    currentBooker: bookers.filter(booker => booker.userId === user.id)[0]
  }
};
const mapDispatch = ({ clearCalendar, setCalendarGigs });

export default connect(mapState, mapDispatch)(BookerMain)
