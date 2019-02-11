import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import GigList from '../Gig/Gig-List'

class GigApplications extends Component {
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
        Incoming Booking Applications
      </Button>
      {
       this.state.view &&
       this.renderGigApplications()
      }
      </div>
    )
  }

  renderGigApplications() {
    const { currentBooker, gigs } = this.props;
    const gigApplications = gigs.filter(gig => (
      gig.bookerId === currentBooker.id &&
      gig.deejayApplicants.length
    ))

    return (
      gigApplications.length
      ?
      <GigList currentBooker={currentBooker} gigs={gigApplications} />
      :
      <h3>Currently No Gig Applications</h3>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(GigApplications)
