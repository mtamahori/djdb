import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import GigList from './Gig-List'
import NewGigForm from './New-Gig-Form'
import FilterGigs from './Filter-Gigs'

// PROPS PASSED: currentBooker, currentDeejay

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

  //  componentDidMount() {
  //   const { currentBooker, currentDeejay } = this.props;
  //   let currentRoute = this.props.location.pathname;

  //   if (currentRoute.includes('/bookers')) {
  //     console.log('BOOKERMODE', currentBooker)
  //     setBooker(currentBooker)
  //   }
  //   else if (currentRoute.includes('/deejays')) {
  //     console.log('DEEJAYMODE', currentDeejay)
  //     setDeejay(currentDeejay)
  //   }
  // }

  render() {
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
        <Button
          onClick={() => {
            this.state.viewBrowse === false ?
            this.setState({ viewBrowse: true }) :
            this.setState({ viewBrowse: false })
          }}
          size="massive">
          Browse
        </Button>
        {
          this.state.viewBrowse && (
            this.renderBrowse()
          )
        }
      </div>
    )
  }

  // renderNewGigForm() {
  //   const { currentBooker, currentDeejay } = this.props;
  //   return (
  //     {
  //       if (currentBooker) {
  //         <NewGigForm currentBooker={currentBooker} key={currentBooker.id} />
  //       }

  //       else if (currentDeejay) {
  //         <NewGigForm currentDeejay={currentDeejay} key={currentDeejay.id} />
  //       }
  //     }
  //   )
  // }

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
      openGigs = gigs.filter(gig => (gig.bookerId === currentBooker.id) && (gig.deejayId === null))
    }

    else if (currentDeejay) {
      openGigs = gigs.filter(gig => (gig.deejayId === currentDeejay.id) && (gig.bookerId === null))
    }

    return (
      <div>
        <FilterGigs gigs={openGigs} />
      </div>
    )
  }

  renderPastGigList() {
    return (
      <div>
        <h3>PAST GIGS</h3>
        <h3>PAST GIGS</h3>
        <h3>PAST GIGS</h3>
      </div>
    )
  }

  renderUpcomingGigList() {
    return (
      <div>
        <h3>UPCOMING GIGS</h3>
        <h3>UPCOMING GIGS</h3>
        <h3>UPCOMING GIGS</h3>
      </div>
    )
  }

  renderBrowse() {
    const { currentBooker, currentDeejay, gigs } = this.props;
    let openGigs;

    if (currentBooker) {
      openGigs = gigs.filter(gig => gig.bookerId === null)
    }

    else if (currentDeejay) {
      openGigs = gigs.filter(gig => gig.deejayId === null)
    }

    return (
      <div>
        <FilterGigs gigs={openGigs} />
      </div>
    )
  }
}

const mapState = ({ gigs }) => ({ gigs });
const mapDispatch = null;

export default withRouter(connect(mapState, mapDispatch)(GigMain))
