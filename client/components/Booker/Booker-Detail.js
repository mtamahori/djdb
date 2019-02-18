import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBooker } from "../../store";
import { List } from "semantic-ui-react";

class BookerDetail extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateBooker = this.handleUpdateBooker.bind(this);
    this.handleDeleteBooker = this.handleDeleteBooker.bind(this);
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

    if (!currentBooker) {
      return <div>Loading!</div>
    }

    else if (currentBooker) {

      return (
        <div>
          <h3>Your Booker Profile</h3>
          {
            <List key={currentBooker.id}>
              <List.Item icon="users" content={currentBooker.name} />
              <List.Item icon="marker" content="Chicago, IL" />
              <List.Item icon="mail" content={currentBooker.email} />
              <List.Item icon="phone" content={currentBooker.phone} />
              <button onClick={this.handleDeleteBooker} type="button">
                Delete Booker
              </button>
            </List>
          }
        </div>
      )
    }
  }

  renderUpdateBooker() {
    return (
      <div>
        <form onSubmit={this.handleUpdateBooker}>
          <div>
            <h3>Update Booker Details</h3>
            <h4>
              Name <br />
              <input name="name" type="text" placeholder="" />
            </h4>
            <h4>
              Email <br />
              <input name="email" type="text" placeholder="" />
            </h4>
            <h4>
              Phone # <br />
              <input name="phone1" type="text" maxLength="3" placeholder="" />
              <input name="phone2" type="text" maxLength="3" placeholder="" />
              <input name="phone3" type="text" maxLength="4" placeholder="" />
            </h4>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    );
  }

  handleDeleteBooker(event) {
    event.stopPropagation();
    const { deleteBooker, booker } = this.props;
    deleteBooker(booker);
  }

  handleUpdateBooker(event) {
    event.preventDefault();
    const { updateBooker, currentBooker } = this.props;

    let phoneInput = event.target.phone1.value + event.target.phone2.value + event.target.phone3.value;

    if (
      event.target.name.value === '' &&
      event.target.email.value === '' &&
      phoneInput === ''
    ) {
      alert("Please fill out at least one field");

    } else {
      const booker = {
        id: currentBooker.id,
        name: event.target.name.value || currentBooker.name,
        email: event.target.email.value || currentBooker.email,
        phone: phoneInput || currentBooker.phone
      }
      updateBooker(booker);
      event.target.name.value = '';
      event.target.email.value = '';
      event.target.phone1.value = '';
      event.target.phone2.value = '';
      event.target.phone3.value = '';
    }
  }
}

const mapState = ({ user, bookers }) => ({ user, bookers });
const mapDispatch = { updateBooker };

export default connect(
  mapState,
  mapDispatch
)(BookerDetail);
