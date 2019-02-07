import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import dateFns from 'date-fns'

// COMPONENT

class GigItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { gig, currentBooker, currentDeejay } = this.props
    const gigDateArr = gig.date.split('/')
              const gigYear = gigDateArr[0]
              const gigMonth = gigDateArr[1]
              const gigDate = gigDateArr[2]

              const formattedDate = dateFns.format(
                new Date(gigYear, gigMonth, gigDate),
                'MMMM D, YYYY'
              )
    return (
      <div>
        <NavLink activeClassName="active"
        to={{
          pathname: `/gigs/${gig.id}`,
          state: {
            currentGig: gig,
            currentBooker: currentBooker,
            currentDeejay: currentDeejay
          }
        }}>
          <h4>{gig.name}</h4>
        </NavLink>
        <h5>{formattedDate}</h5>
        <h5>{gig.time}</h5>
        <h5>{gig.location}</h5>
        <h5>{gig.compensation}</h5>
      </div>
    )
  }
}

// CONTAINER

const mapState = null;
const mapDispatch = null;


export default connect(mapState, mapDispatch)(GigItem)
