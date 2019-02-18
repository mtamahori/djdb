import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import GigList from '../Gig/Gig-List'
import dateFns from 'date-fns'

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
          Incoming Booking Requests
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
    const gigInvites = gigs.filter(gig => {
      return (
        !gig.deejayId &&
        gig.deejayInvites.indexOf(currentDeejay.id) !== -1 &&
        gig.declinedApps.indexOf(currentDeejay.id) === -1 &&
        gig.declinedInvs.indexOf(currentDeejay.id) === -1 &&
        this.futureDateCheck(gig)
      )
    })
    return (
      gigInvites.length
      ?
      <GigList currentDeejay={currentDeejay} gigs={gigInvites} />
      :
      <h3>You Have No Incoming Requests Right Now</h3>
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

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(GigInvites)

