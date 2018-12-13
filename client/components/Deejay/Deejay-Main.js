import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class DeejayMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Deejay Main Portal</h3>
        <NavLink activeClassName="active" to="/deejays/new">
          <Button size="massive">Create Deejay Profile</Button>
        </NavLink>
      </div>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(DeejayMain)
