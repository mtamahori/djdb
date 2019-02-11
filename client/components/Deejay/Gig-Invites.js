import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import GigList from '../Gig/Gig-List'

class GigInvites extends Component {
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
          Incoming Booking Invites
        </Button>
        {
        this.state.view &&
        this.renderGigInvites()
        }
      </div>
    )
  }

  renderGigInvites() {
    const { currentDeejay, gigs } = this.props;
    const gigInvites = gigs.filter(gig => (
      gig.deejayInvites.indexOf(currentDeejay.id) !== -1
    ))

    return (
      gigInvites.length
      ?
      <GigList currentDeejay={currentDeejay} gigs={gigInvites} />
      :
      <h3>You Have No Gig Invites Right Now</h3>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(GigInvites)

