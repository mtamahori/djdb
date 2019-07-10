import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCalendarGigs } from '../../store'
import { Button } from 'semantic-ui-react'
import { GigList } from '../index'
import dateFns from 'date-fns'

// FOR BOOKERS
// VIEW ALL GIGS THAT STILL NEED A DEEJAY

class OpenGigList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.handleClick}
          size="massive"
        >Open Bookings
        </Button>
        {
          this.state.view && this.renderOpenGigList()
        }
      </div>
    )
  }

  renderOpenGigList() {
    const { currentBooker, gigs } = this.props;
    let openGigs = this.getOpenGigs(currentBooker, gigs)

    return (
      openGigs.length ?
      <GigList currentBooker={currentBooker} gigs={openGigs} /> :
      <h3>You Have No Open Bookings Right Now</h3>
    )
  }

  handleClick(event) {
    const { currentBooker, gigs, setCalendarGigs } = this.props;
    let openGigs = this.getOpenGigs(currentBooker, gigs)

    event.preventDefault();
    this.setState(state => ({
      view: !state.view
    }))

    return (
      openGigs.length &&
      this.state.view === false &&
      setCalendarGigs(openGigs)
    )
  }

  getOpenGigs(currentBooker, gigs) {
    return gigs.filter(gig => {
      return (
        gig.bookerId === currentBooker.id &&
        gig.deejayId === null &&
        this.futureDateCheck(gig)
      )
    })
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
const mapDispatch = ({ setCalendarGigs })

export default connect(mapState, mapDispatch)(OpenGigList)
