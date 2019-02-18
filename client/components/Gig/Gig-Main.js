import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import dateFns from 'date-fns'
import GigList from './Gig-List'
import NewGigForm from './New-Gig-Form'

class GigMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewNewGigForm: false,
      viewOpenGigList: false,
      viewPastGigList: false,
      viewUpcomingGigList: false,
      viewBrowse: false
    }
  }

  render() {
    const { currentBooker, currentDeejay } = this.props;

    return (
      <div>
        <Button
          onClick={() => {
            this.state.viewNewGigForm === false ?
            this.setState({ viewNewGigForm: true }) :
            this.setState({ viewNewGigForm: false })
          }}
          size="massive">
          New Booking
        </Button>
        {
          this.state.viewNewGigForm && (
            this.renderNewGigForm()
          )
        }
        <Button
          onClick={() => {
            this.state.viewOpenGigList === false ?
            this.setState({ viewOpenGigList: true }) :
            this.setState({ viewOpenGigList: false })
          }}
          size="massive">
          Open Bookings
        </Button>
        {
          this.state.viewOpenGigList && (
            this.renderOpenGigList()
          )
        }
        <Button
          onClick={() => {
            this.state.viewPastGigList === false ?
            this.setState({ viewPastGigList: true }) :
            this.setState({ viewPastGigList: false })
          }}
          size="massive">
          Past Bookings
        </Button>
        {
          this.state.viewPastGigList && (
            this.renderPastGigList()
          )
        }
        <Button
          onClick={() => {
            this.state.viewUpcomingGigList === false ?
            this.setState({ viewUpcomingGigList: true }) :
            this.setState({ viewUpcomingGigList: false })
          }}
          size="massive">
          Upcoming Bookings
        </Button>
        {
          this.state.viewUpcomingGigList && (
            this.renderUpcomingGigList()
          )
        }
        {
          currentDeejay &&
        <Button
          onClick={() => {
            this.state.viewBrowse === false ?
            this.setState({ viewBrowse: true }) :
            this.setState({ viewBrowse: false })
          }}
          size="massive">
          Browse Open Bookings
        </Button>
        }
        {
          this.state.viewBrowse && (
            this.renderBrowse()
          )
        }
      </div>
    )
  }

  renderNewGigForm() {
    const { currentBooker, currentDeejay } = this.props;

    if (currentBooker) {
      return (
        <NewGigForm currentBooker={currentBooker} key={currentBooker.id} />
      )
    }

    else if (currentDeejay) {
      return (
        <NewGigForm currentDeejay={currentDeejay} key={currentDeejay.id} />
      )
    }
  }

  renderOpenGigList() {
    const { currentBooker, currentDeejay, gigs } = this.props;
    let openGigs;

    if (currentBooker) {
      openGigs = gigs.filter(gig => {
        return (
          gig.bookerId === currentBooker.id &&
          gig.deejayId === null &&
          this.futureDateCheck(gig)
        )
      })
      return (
        <div>
          <GigList currentBooker={currentBooker} gigs={openGigs} />
        </div>
      )
    }

    else if (currentDeejay) {
      openGigs = gigs.filter(gig => {
        return (
          gig.deejayId === currentDeejay.id &&
          gig.bookerId === null &&
          this.futureDateCheck(gig)
        )
      })
      return (
        <div>
          <GigList currentDeejay={currentDeejay} gigs={openGigs} />
        </div>
      )
    }
  }

  renderPastGigList() {
    const { currentBooker, currentDeejay, gigs } = this.props;
    let pastGigs;

    if (currentBooker) {
      pastGigs = gigs.filter(gig => {
        return (
          gig.bookerId === currentBooker.id &&
          this.pastDateCheck(gig)
        )
      })
      return (
        <div>
          <GigList currentBooker={currentBooker} gigs={pastGigs} />
        </div>
      )
    }

    else if (currentDeejay) {
      pastGigs = gigs.filter(gig => {
        return (
          gig.deejayId === currentDeejay.id &&
          this.pastDateCheck(gig)
        )
      })
      return (
        <div>
          <GigList currentDeejay={currentDeejay } gigs={pastGigs} />
        </div>
      )
    }
  }

  renderUpcomingGigList() {
    const { currentBooker, currentDeejay, gigs } = this.props;
    let upcomingGigs;

    if (currentBooker) {
      upcomingGigs = gigs.filter(gig => {
        return (
          gig.bookerId === currentBooker.id &&
          gig.deejayId !== null &&
          this.futureDateCheck(gig)
        )
      })
      return (
        <div>
         <GigList currentBooker={currentBooker} gigs={upcomingGigs} />
        </div>
      )
    }

    else if (currentDeejay) {
      upcomingGigs = gigs.filter(gig => {
        return (
          gig.deejayId === currentDeejay.id &&
          gig.bookerId !== null &&
          this.futureDateCheck(gig)
        )
      })
      return (
        <div>
         <GigList currentDeejay={currentDeejay} gigs={upcomingGigs} />
        </div>
      )
    }
  }

  renderBrowse() {
    const { currentDeejay, gigs } = this.props;

    if (currentDeejay) {
      let openGigs = gigs.filter(gig => {
        return (
          gig.deejayId === null &&
          gig.deejayInvites.indexOf(currentDeejay.id) === -1 &&
          gig.deejayApplicants.indexOf(currentDeejay.id) === -1 &&
          gig.declinedApps.indexOf(currentDeejay.id) === -1 &&
          gig.declinedInvs.indexOf(currentDeejay.id) === -1 &&
          this.futureDateCheck(gig)
        )
      })
      return (
        <div>
          <GigList currentDeejay={currentDeejay} gigs={openGigs} />
        </div>
      )
    }
  }

  pastDateCheck(gig) {
      let gigDateArr = gig.date.split('/')
      let gigYear = gigDateArr[0]
      let gigMonth = gigDateArr[1]
      let gigDate = gigDateArr[2]
      return dateFns.isBefore(new Date(gigYear, gigMonth, gigDate), Date.now())
  }

  futureDateCheck(gig) {
    let gigDateArr = gig.date.split('/')
      let gigYear = gigDateArr[0]
      let gigMonth = gigDateArr[1]
      let gigDate = gigDateArr[2]
      return dateFns.isAfter(new Date(gigYear, gigMonth, gigDate), Date.now())
  }

}

const mapState = ({ gigs }) => ({ gigs });
const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(GigMain))
