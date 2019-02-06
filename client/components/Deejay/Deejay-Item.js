import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

// COMPONENT

class DeejayItem extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { deejay } = this.props
    return (
      <div>
        <NavLink activeClassName="active" to={`/deejays/${deejay.id}`} >
          <h4>{deejay.name}</h4>
        </NavLink>
        <h5>{deejay.email}</h5>
        <h5>{deejay.phone}</h5>
      </div>
    )
  }

}

// CONTAINER

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(DeejayItem)
