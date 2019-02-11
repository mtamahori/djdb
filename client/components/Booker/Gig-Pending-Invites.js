import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import GigList from '../Gig/Gig-List'

class GigPendingInvites extends Component {
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
          Pending Booking Requests
        </Button>
        {
        this.state.view &&
        this.renderGigPendingInvites()
        }
      </div>
    )
  }

  renderGigPendingInvites() {
    const { currentBooker, gigs } = this.props;
    const gigPendingInvites = gigs.filter(gig => (
      gig.bookerId === currentBooker.id &&
      gig.deejayInvites.length
    ))

    return (
      gigPendingInvites.length
      ?
      <GigList currentBooker={currentBooker} gigs={gigPendingInvites} />
      :
      <h3>You Have No Pending Booking Requests Right Now</h3>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(GigPendingInvites)
