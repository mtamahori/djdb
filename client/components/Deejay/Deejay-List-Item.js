import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteDeejay } from '../../store'

// COMPONENT

class DeejayListItem extends Component {
  constructor(props) {
    super(props)

    this.handleDeleteDeejay = this.handleDeleteDeejay.bind(this)
  }

  render() {
    const { deejay } = this.props
    return (
      <div>
        <NavLink activeClassName="active" to={`/deejays/${deejay.id}`} >
          <h4>{deejay.name}</h4>
        </NavLink>
        <h4>{deejay.email}</h4>
        <h4>{deejay.phone}</h4>
        <button onClick={this.handleDeleteDeejay} type="button" >
          Delete Deejay
        </button>
      </div>
    )
  }

  handleDeleteDeejay(event) {
    event.stopPropagation();
    const { deleteDeejay, deejay } = this.props;
    deleteDeejay(deejay);
  }

}

// CONTAINER

const mapState = null;
const mapDispatch = ({ deleteDeejay })

export default connect(mapState, mapDispatch)(DeejayListItem)
