import React, { Component } from 'react'
import { connect } from 'react-redux'
import GigItem from './Gig-Item'

// COMPONENT

class GigList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { gigs } = this.props;
    return (
      <div>
        <h3>Gig List</h3>
        {
          gigs.map(gig => (
            <GigItem gig={gig} key={gig.id} />
          ))
        }
      </div>
    )
  }
}

// CONTAINER

const mapState = ({ gigs }) => ({ gigs })
const mapDispatch = null;

export default connect(mapState, mapDispatch)(GigList)
