import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearCalendar } from '../../store'
import { Grid } from 'semantic-ui-react'
import {
  NewDeejayForm,
  CalendarMain,
  DeejaySidebar,
  GigItem,
  FilterGigs,
  FilterBookers
} from '../index'
import dateFns from 'date-fns'

// MAIN DEEJAY PORTAL
// CONTAINS ALL RELEVANT GIG LISTS, BROWSE BOOKERS, CALENDAR, AND NEW DEEJAY FORM

class DeejayMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewIncomingInvitations: false,
      viewOutgoingApplications: false,
      viewUpcomingGigs: false,
      viewPastGigs: false,
      viewBrowseGigs: false,
      viewBrowseBookers: false,
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
    const { currentDeejay, gigs, bookers } = this.props;
    return (
      <div>
        {
          currentDeejay === undefined ?
          <NewDeejayForm /> :

          <div className="deejay-main-container">

            <CalendarMain currentDeejay={currentDeejay} />

            <div className="list-container">

              <DeejaySidebar
                className="sidebar"
                toggleView={this.toggleView}
                toggleCalenda={this.toggleCalendar}
              />

              <div className="gig-list">
                {
                  this.state.viewIncomingInvitations &&
                  this.renderIncomingInvitations()
                }
                {
                  this.state.viewOutgoingApplications &&
                  this.renderOutgoingApplications()
                }
                {
                  this.state.viewUpcomingGigs &&
                  this.renderUpcomingGigs()
                }
                {
                  this.state.viewPastGigs &&
                  this.renderPastGigs()
                }
                {
                  this.state.viewBrowseGigs &&
                  this.renderBrowseGigs()
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
    const upcomingGigs = this.getUpcomingGigs();
    const pastGigs = this.getPastGigs();

    let typeCheck = (type) => {
      if (type.length &&
      (this.state['view' + type.slice(0)[0].toUpperCase() + `${type.slice(1)}`] === true)) {
        return true;
      }
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
  getGigInvitations() {
    const { gigs, currentDeejay } = this.props;
    const gigInvitations = gigs.filter(gig => {
      return (
        !gig.deejayId &&
        gig.deejayInvites.indexOf(currentDeejay.id) !== -1 &&
        gig.declinedApps.indexOf(currentDeejay.id) === -1 &&
        gig.declinedInvs.indexOf(currentDeejay.id) === -1 &&
        this.futureDateCheck(gig)
      )
    })
    return gigInvitations;
  }

  getGigApplications() {
    const { gigs, currentDeejay } = this.props;
    const gigPendingApplications = gigs.filter(gig => {
      return (
        !gig.deejayId &&
        gig.deejayApplicants.indexOf(currentDeejay.id) !== -1 &&
        gig.declinedApps.indexOf(currentDeejay.id) === -1 &&
        gig.declinedInvs.indexOf(currentDeejay.id) === -1 &&
        this.futureDateCheck(gig)
      )
    })
    return gigPendingApplications;
  }

  getUpcomingGigs() {
    const { gigs, currentDeejay } = this.props;
    const upcomingGigs = gigs.filter(gig => {
      return (
        gig.bookerId === currentDeejay.id &&
        gig.deejayId !== null &&
        this.futureDateCheck(gig)
      )
    })
    return upcomingGigs;
  }

  getPastGigs() {
    const { gigs, currentDeejay } = this.props;
    const pastGigs = gigs.filter(gig => {
      return (
        gig.bookerId === currentDeejay.id &&
        this.pastDateCheck(gig)
      )
    })
    return pastGigs;
  }

  getOpenGigs() {
    const { gigs } = this.props;
    const openGigs = gigs.filter(gig => {
      return (
        gig.deejayId === null &&
        this.futureDateCheck(gig)
      )
    })
    return openGigs;
  }


  // HELPER FUNCTION FOR RENDERING GIG LISTS

    renderGrid(currentDeejay, listType, nullMessage) {
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
              <GigItem gig={gig} key={gig.id} currentDeejay={currentDeejay} />
            ))
          }
        </Grid> :
        <h3>{`${nullMessage}`}</h3>
      )
    }

  // RENDER FUNCTIONS FOR SEPARATE GIG LISTS

  renderIncomingInvitations() {
    const { currentDeejay } = this.props;
    const gigInvitations = this.getGigInvitations();
    const nullMessage = 'You Have No Booking Requests Right Now';
    return this.renderGrid(currentDeejay, gigInvitations, nullMessage);
  }

  renderOutgoingApplications() {
    const { currentDeejay } = this.props;
    const gigPendingApplications = this.getGigApplications();
    const nullMessage = 'You Have Not Sent Any Booking Applications';
    return this.renderGrid(currentDeejay, gigPendingApplications, nullMessage)
  }

  renderUpcomingGigs() {
    const { currentDeejay } = this.props;
    const upcomingGigs = this.getUpcomingGigs();
    const nullMessage = 'You Have No Upcoming Bookings';
    return this.renderGrid(currentDeejay, upcomingGigs, nullMessage);
  }

  renderPastGigs() {
    const { currentDeejay } = this.props;
    const pastGigs = this.getPastGigs();
    const nullMessage = 'You Have No Past Bookings';
    return this.renderGrid(currentDeejay, pastGigs, nullMessage)
  }

  renderBrowseGigs() {
    const { currentDeejay } = this.props;
    const openGigs = this.getOpenGigs();
    return <FilterGigs openGigs={openGigs} currentDeejay={currentDeejay} />
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

const mapState = ({ user, gigs, deejays, bookers }) => {
  return {
    user,
    gigs,
    deejays,
    bookers,
    currentDeejay: deejays.filter(deejay => deejay.userId === user.id)[0]
  }
};
const mapDispatch = ({ clearCalendar });

export default connect(mapState, mapDispatch)(DeejayMain)
