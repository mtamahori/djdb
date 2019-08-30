import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearCalendar, setCalendarGigs } from '../../store'
import { Grid } from 'semantic-ui-react'
import {
  NewBookerForm,
  CalendarMain,
  BookerSidebar,
  GigItem,
  FilterDeejays,
  NewGigForm
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
      viewUpcomingGigs: false,
      viewPastGigs: false,
      viewBrowseDeejays: false,
      viewNewGigForm: false
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

            <div className="list-container">

              <BookerSidebar
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
              {
                this.state.viewPastGigs &&
                this.renderPastGigs()
              }
              </div>

              <div className="deejay-list">
              {
                this.state.viewBrowseDeejays &&
                this.renderBrowseDeejays()
              }
              </div>

              <div className="new-gig-form">
              {
                this.state.viewNewGigForm &&
                this.renderNewGigForm()
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
    const pastGigs = this.getPastGigs();

    let typeCheck = (type) => {
      if (type.length &&
      (this.state['view' + type.slice(0)[0].toUpperCase() + `${type.slice(1)}`] === true)) {
        return true;
      }
    }

    if (listType === 'openGigs') {
      typeCheck('openGigs') &&
      setCalendarGigs(openGigs);
    }

    if (listType === 'upcomingGigs') {
      typeCheck('upcomingGigs') &&
      setCalendarGigs(upcomingGigs)
    }

    if (listType === 'pastGigs') {
      typeCheck('pastGigs') &&
      setCalendarGigs(pastGigs)
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

  getPastGigs() {
    const { gigs, currentBooker } = this.props;
    const pastGigs = gigs.filter(gig => {
      return (
        gig.bookerId === currentBooker.id &&
        this.pastDateCheck(gig)
      )
    })
    return pastGigs;
  }

  // HELPER FUNCTION FOR RENDERING GIG LISTS

  renderGrid(currentBooker, listType, nullMessage) {
    return (
      listType.length ?
      <Grid
        className="gig-list"
        gigs={listType}
        columns="equal"
        text-align="center"
        relaxed
        stackable>
        {
          listType.map(gig => (
            <GigItem gig={gig} key={gig.id} currentBooker={currentBooker} />
          ))
        }
      </Grid> :
      <h3>{`${nullMessage}`}</h3>
    )
  }

  // RENDER FUNCTIONS FOR SEPARATE GIG LISTS

  renderIncomingApplications() {
    const { currentBooker } = this.props;
    const gigApplications = this.getGigApplications();
    const nullMessage = 'You Have No Incoming Booking Requests';
    return this.renderGrid(currentBooker, gigApplications, nullMessage);
  }

  renderOutgoingInvites() {
    const { currentBooker } = this.props;
    const gigPendingInvites = this.getGigPendingInvites();
    const nullMessage = 'You Have Not Sent Any Booking Requests';
    return this.renderGrid(currentBooker, gigPendingInvites, nullMessage);
  }

  renderOpenBookings() {
    const { currentBooker } = this.props;
    const openGigs = this.getOpenGigs();
    const nullMessage = 'You Have No Open Bookings';
    return this.renderGrid(currentBooker, openGigs, nullMessage);
  }

  renderUpcomingGigs() {
    const { currentBooker } = this.props;
    const upcomingGigs = this.getUpcomingGigs();
    const nullMessage = 'You Have No Upcoming Bookings';
    return this.renderGrid(currentBooker, upcomingGigs, nullMessage);
  }

  renderPastGigs() {
    const { currentBooker } = this.props;
    const pastGigs = this.getPastGigs();
    const nullMessage = 'You Have No Past Bookings';
    return this.renderGrid(currentBooker, pastGigs, nullMessage);
  }

  renderBrowseDeejays() {
    const { currentBooker, deejays } = this.props;
    return <FilterDeejays deejays={deejays} currentBooker={currentBooker} />
  }

  renderNewGigForm() {
    const { currentBooker } = this.props;
    return <NewGigForm currentBooker={currentBooker} key={currentBooker.id} />
  }

  // DATE CHECKERS

  futureDateCheck(gig) {
    let gigDateArr = gig.date.split('/')
    let gigYear = gigDateArr[0]
    let gigMonth = gigDateArr[1]
    let gigDate = gigDateArr[2]
    return dateFns.isAfter(new Date(gigYear, gigMonth, gigDate), Date.now())
  }

  pastDateCheck(gig) {
    let gigDateArr = gig.date.split('/')
    let gigYear = gigDateArr[0]
    let gigMonth = gigDateArr[1]
    let gigDate = gigDateArr[2]
    return dateFns.isBefore(new Date(gigYear, gigMonth, gigDate), Date.now())
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
