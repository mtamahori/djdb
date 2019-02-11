import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import GigList from '../Gig/Gig-List'

class GigPendingApplications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: false
    }
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => {
            this.state.view === false ?
            this.setState({ view: true }) :
            this.setState({ view: false })
          }}
          size="massive">
          Outgoing Booking Requests (PENDING)
        </Button>
        {
        this.state.view &&
        this.renderGigPendingApplications()
        }
      </div>
    )
  }

  renderGigPendingApplications() {
    const { currentDeejay, gigs } = this.props;
    const gigPendingApplications = gigs.filter(gig => (
      gig.deejayApplicants.indexOf(currentDeejay.id) !== -1
    ))

    return (
      gigPendingApplications.length
      ?
      <GigList currentDeejay={currentDeejay} gigs={gigPendingApplications} />
      :
      <h3>You Have No Outgoing Pending Booking Requests Right Now</h3>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(GigPendingApplications)
