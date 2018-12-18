import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
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
          Browse Deejays
        </Button>
        {
          this.state.viewBrowse && (
            this.renderBrowse()
          )
        }
      </div>
    )
  }

  renderNewGigForm() {
    const { currentBooker } = this.props;
    return (
      <div>
        <NewGigForm currentBooker={currentBooker} key={currentBooker.id} />
      </div>
    )
  }

  renderOpenGigList() {
    const { currentBooker, gigs } = this.props;
    const openGigs = gigs.filter(gig => (gig.bookerId === currentBooker.id) && (gig.deejayId === null))
    return (
      <div>
        <GigList gigs={openGigs} />
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
    const { currentBooker, gigs } = this.props;
    const openGigs = gigs.filter(gig => gig.bookerId === null)
    return (
      <div>
        <GigList gigs={openGigs} />
      </div>
    )
  }
}

const mapState = ({ gigs }) => ({ gigs });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(GigMain)
