import React, { Component } from "react";
import { connect } from "react-redux";
import DeejayItem from "./Deejay-Item";

// COMPONENT

class DeejayList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>{this.renderDeejayList()}</div>
      </div>
    );
  }

  renderDeejayList() {
    const { deejays } = this.props;
    return (
      <div>
        <h3>Deejay List</h3>
        {
          deejays.map(deejay => (
          <DeejayItem deejay={deejay} key={deejay.id} />
          ))
        }
      </div>
    );
  }

}

// CONTAINER

const mapState = ({ deejays }) => ({ deejays });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(DeejayList);
