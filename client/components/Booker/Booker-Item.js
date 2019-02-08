import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class BookerItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { booker, currentGig } = this.props;
    return (
      <div>
        <NavLink 
        activeClassName="active" 
        to={{
          pathname: `/bookers/${booker.id}`,
          state: {
            currentGig: currentGig
          }
          }}>
          <h4>{booker.name}</h4>
        </NavLink>
        <h5>{booker.email}</h5>
        <h5>{booker.phone}</h5>
      </div>
    );
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(
  mapState,
  mapDispatch
)(BookerItem);
