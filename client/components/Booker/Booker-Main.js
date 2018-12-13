import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class BookerMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Booker Main Portal</h3>
        <NavLink activeClassName="active" to="/bookers/new">
          <Button size="massive">Create Booker Profile</Button>
        </NavLink>
      </div>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(BookerMain)
