import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { updateBooker } from '../../store'

class BookerDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { bookers } = this.props
    return (
      <div>
        <h3>Booker Detail</h3>
      </div>
    )
  }
}
const mapState = ({ bookers }) => ({ bookers })
const mapDispatch = { updateBooker };

export default connect(mapState, mapDispatch)(BookerDetail)
