import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearCalendar } from '../../store'
import { Grid } from 'semantic-ui-react'
import {
  NewBookerForm,
  CalendarMain,
  IncomingApplications,
  OutgoingInvitations,
  PastGigList,
  UpcomingGigList,
  OpenGigList,
  NewGig,
  BrowseDeejayList,
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
      viewIncomingApplications: false
    }

    this.viewIncomingApplications = this.viewIncomingApplications.bind(this);
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
              currentBooker={currentBooker}
              gigs={gigs}
              deejays={deejays}
              viewIncomingApplications={this.viewIncomingApplications}
              />
              <div className="gig-list">
              {
                this.state.viewIncomingApplications &&
                this.renderIncomingApplications()
              }
              </div>
            </div>
          </div>
      }
      </div>
    )
  }

  viewIncomingApplications() {
    this.state.viewIncomingApplications === false ?
    this.setState({ viewIncomingApplications: true }) :
    this.setState({ viewIncomingApplications: false })
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
        columns='equal'
        text-align='center'
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
const mapDispatch = ({ clearCalendar });

export default connect(mapState, mapDispatch)(BookerMain)
