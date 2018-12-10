import React, { Component } from "react";
import { connect } from "react-redux";
import { createBooker } from "../../store";
import BookerListItem from "./Booker-List-Item";

// COMPONENT

class BookerList extends Component {
  constructor(props) {
    super(props);

    this.handleCreateBooker = this.handleCreateBooker.bind(this);
  }

  render() {
    return (
      <div>
        <div>{this.renderCreateBooker()}</div>
        <div>{this.renderBookerList()}</div>
      </div>
    );
  }

  renderCreateBooker() {
    return (
      <div>
        <form onSubmit={this.handleCreateBooker}>
          <div>
            <h3>Create Booker Profile</h3>
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

  renderBookerList() {
    const { bookers } = this.props;
    return (
      <div>
        <h3>Booker List</h3>
        {
          bookers.map(booker => (
            <BookerListItem booker={booker} key={booker.id} />
          ))
        }
      </div>
    );
  }

  handleCreateBooker(event) {
    event.preventDefault();
    const { createBooker } = this.props;
    const newBooker = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value
    };
    createBooker(newBooker);
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.phone.value = '';
  }
}

// CONTAINER

const mapState = ({ bookers }) => ({ bookers });
const mapDispatch = { createBooker };

export default connect(mapState,mapDispatch)(BookerList);
