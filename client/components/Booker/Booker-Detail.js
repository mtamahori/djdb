import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBooker } from "../../store";
import { List } from "semantic-ui-react";

class BookerDetail extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateBooker = this.handleUpdateBooker.bind(this);
  }

  render() {
    return (
      <div>
        <div>{this.renderCurrentBooker()}</div>
        <div>{this.renderUpdateBooker()}</div>
      </div>
    );
  }

  renderCurrentBooker() {
    const { currentBooker } = this.props;
    return (
      <div>
        <h3>Booker Details</h3>
        {
          <List key={currentBooker.id}>
            <List.Item icon="users" content={currentBooker.name} />
            <List.Item icon="marker" content="Chicago, IL" />
            <List.Item icon="mail" content={currentBooker.email} />
            <List.Item icon="phone" content={currentBooker.phone} />
          </List>
        }
      </div>
    );
  }

  renderUpdateBooker() {
    return (
      <div>
        <form onSubmit={this.handleUpdateBooker}>
          <div>
            <h3>Update Booker Details</h3>
            <h4>
              <input name="name" type="text" placeholder="Name" />
            </h4>
            <h4>
              <input name="email" type="text" placeholder="Email" />
            </h4>
            <h4>
              <input name="phone" type="text" placeholder="Phone #" />
            </h4>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    );
  }

  handleUpdateBooker(event) {
    event.preventDefault();
    const { updateBooker, currentBooker } = this.props;

    if (
      event.target.name.value === '' &&
      event.target.email.value === '' &&
      event.target.phone.value === ''
    ) {
      alert("Please fill out at least one field");
    } else {
      const booker = {
        id: currentBooker.id,
        name: event.target.name.value || currentBooker.name,
        email: event.target.email.value || currentBooker.email,
        phone: event.target.phone.value || currentBooker.phone
      }
      updateBooker(booker);
      event.target.name.value = '';
      event.target.email.value = '';
      event.target.phone.value = '';
    }
  }
}

const mapState = ({ user, bookers }) => ({ user, bookers });
const mapDispatch = { updateBooker };

export default connect(
  mapState,
  mapDispatch
)(BookerDetail);
