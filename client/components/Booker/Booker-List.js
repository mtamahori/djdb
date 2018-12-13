import React, { Component } from "react";
import { connect } from "react-redux";
import BookerItem from "./Booker-Item";

// COMPONENT

class BookerList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>{this.renderBookerList()}</div>
      </div>
    );
  }

  renderBookerList() {
    const { bookers } = this.props;
    return (
      <div>
        <h3>Booker List</h3>
        {
          bookers.map(booker => (
            <BookerItem booker={booker} key={booker.id} />
          ))
        }
      </div>
    );
  }


}

// CONTAINER

const mapState = ({ bookers }) => ({ bookers });
const mapDispatch = null;

export default connect(mapState,mapDispatch)(BookerList);
