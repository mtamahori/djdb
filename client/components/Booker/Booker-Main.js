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

// current: need to make sure only one list is viewed at any given time, or at least label them, as it might be nice to see multiple lists concurrently. also, try and make setCalendarGigs a little cleaner

class BookerMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewIncomingApplications: false,
      viewOutgoingInvites: false,
      viewOpenBookings: false
    }

    this.toggleView = this.toggleView.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  componentDidMount() {
    const { clearCalendar } = this.props;
    clearCalendar();
  }

  render() {
    const { currentBooker, gigs, deejays } = this.props;
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
                this.state.viewOpenBookings &&
                this.renderOpenBookings()
              }
              </div>
            </div>
          </div>
      }
      </div>
    )
  }

  toggleView(listType) {
    let view = (type) => {
      let stateObj = {}
      stateObj[type] = true;
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
    const { gigs, currentBooker, setCalendarGigs } = this.props;
    const openGigs = gigs.filter(gig => {
      return (
        gig.bookerId === currentBooker.id &&
        gig.deejayId === null &&
        this.futureDateCheck(gig)
      )
    })

    if (listType === 'openGigs') {
      openGigs.length &&
      this.state.viewOpenBookings === false &&
      setCalendarGigs(openGigs);
    }

  }

  renderIncomingApplications() {
    const { currentBooker, gigs } = this.props;

    const gigApplications = gigs.filter(gig => {
      return (
        gig.deejayId === null &&
        gig.bookerId === currentBooker.id &&
        gig.deejayApplicants.length &&
        this.futureDateCheck(gig)
      )
    })

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
    const { currentBooker, gigs } = this.props;

    const gigPendingInvites = gigs.filter(gig => {
      return (
        gig.deejayId === null &&
        gig.bookerId === currentBooker.id &&
        gig.deejayInvites.length &&
        this.futureDateCheck(gig)
      )
    })

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
        const { currentBooker, gigs } = this.props;

        const openGigs = gigs.filter(gig => {
          return (
            gig.bookerId === currentBooker.id &&
            gig.deejayId === null &&
            this.futureDateCheck(gig)
          )
        })

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
