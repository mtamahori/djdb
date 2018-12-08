import React, { Component } from "react";
import { connect } from "react-redux";
import { createDeejay } from "../../store";
import DeejayListItem from "./Deejay-List-Item";

// COMPONENT

class DeejayList extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitCreateDeejay = this.handleSubmitCreateDeejay.bind(this);
  }

  render() {
    return (
      <div>
        <div>{this.renderCreateDeejay()}</div>
        <div>{this.renderDeejayList()}</div>
      </div>
    );
  }

  renderCreateDeejay() {
    return (
      <div>
        <form onSubmit={this.handleSubmitCreateDeejay}>
          <div>
            <h3>Create New Deejay Profile</h3>
            <h4>
              <input name="name" type="text" required placeholder="Name" />
            </h4>
            <h4>
              <input name="email" type="text" required placeholder="Email" />
            </h4>
            <h4>
              <input name="phone" type="text" required placeholder="Phone #" />
            </h4>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    );
  }

  renderDeejayList() {
    const { deejays } = this.props;
    return (
      <div>
        <h3>Deejay List</h3>
        {deejays.map(deejay => (
          <DeejayListItem deejay={deejay} key={deejay.id} />
        ))}
      </div>
    );
  }

  handleSubmitCreateDeejay(event) {
    event.preventDefault();
    const { createDeejay } = this.props;
    const newDeejay = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value
    };
    createDeejay(newDeejay);
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.phone.value = '';
  }
}

// CONTAINER

const mapState = ({ deejays }) => ({ deejays });
const mapDispatch = { createDeejay };

export default connect(
  mapState,
  mapDispatch
)(DeejayList);
