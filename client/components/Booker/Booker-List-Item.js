import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteBooker } from "../../store";

class BookerListItem extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteBooker = this.handleDeleteBooker.bind(this);
  }

  render() {
    const { booker } = this.props;
    return (
      <div>
        <NavLink
          activeClassName="active"
          to={`/bookers/${booker.id}`}>
          <h4>{booker.name}</h4>
        </NavLink>
        <h5>{booker.email}</h5>
        <h5>{booker.phone}</h5>
        <button onClick={this.handleDeleteBooker} type="button" >Delete Booker</button>
      </div>
    );
  }

  handleDeleteBooker(event) {
    event.stopPropagation();
    const { deleteBooker, booker } = this.props;
    deleteBooker(booker);
  }
}

const mapState = null;
const mapDispatch = { deleteBooker };

export default connect(
  mapState,
  mapDispatch
)(BookerListItem);
