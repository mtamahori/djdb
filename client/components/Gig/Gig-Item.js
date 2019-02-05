import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteGig } from '../../store'
import dateFns from 'date-fns'

// COMPONENT

class GigItem extends Component {
  constructor(props) {
    super(props)

    this.handleDeleteGig = this.handleDeleteGig.bind(this);
  }

  render() {
    const { gig } = this.props
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
        <NavLink activeClassName="active" to={`/gigs/${gig.id}`} >
          <h4>{gig.name}</h4>
        </NavLink>
        <h5>{formattedDate}</h5>
        <h5>{gig.time}</h5>
        <h5>{gig.location}</h5>
        <h5>{gig.compensation}</h5>
        <button onClick={this.handleDeleteGig} type="button" >
          Delete Gig
        </button>
      </div>
    )
  }

  handleDeleteGig(event) {
    event.stopPropagation();
    const { deleteGig, gig } = this.props;
    deleteGig(gig);
  }
}

// CONTAINER

const mapState = null;
const mapDispatch = ({ deleteGig })


export default connect(mapState, mapDispatch)(GigItem)
