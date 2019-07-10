import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateBooker } from '../../store';
import { Form, List, Button, Message } from 'semantic-ui-react';
require('../../../public/stylesheets/profile.css')

// DEEJAY PROFILE INFO, RENDERED IN USER PROFILE

class BookerDetail extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateBooker = this.handleUpdateBooker.bind(this);
    this.handleDeleteBooker = this.handleDeleteBooker.bind(this);

    this.state = {
      viewUpdateBooker: false,
      updateBool: false
    }
  }

  render() {
    return (
      <div className="booker-profile-container">
        <div>{this.renderCurrentBooker()}</div>
        {
          !this.state.viewUpdateBooker &&
          <Button
            className="booker-update-button"
            onClick={() => {
              this.state.viewUpdateBooker === false ?
              this.setState({ viewUpdateBooker: true }) :
              this.setState({ viewUpdateBooker: false })
            }}>
            Update Details
          </Button>
        }
        {
          this.state.viewUpdateBooker &&
          this.renderUpdateBooker()
        }
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
        <div className="booker-profile-detail">
          <h3>Your Booker Profile</h3>
          {
            <List key={currentBooker.id}>
              <List.Item icon="users" content={currentBooker.name} />
              <List.Item icon="marker" content="Chicago, IL" />
              <List.Item icon="mail" content={currentBooker.email} />
              <List.Item icon="phone" content={currentBooker.phone} />
              <List.Item>
                <List.Content>
                  <List.Header>Bio</List.Header>
                  <List.Description>{currentBooker.bio}</List.Description>
                </List.Content>
              </List.Item>
            </List>
          }
        </div>
      )
    }
  }

  renderUpdateBooker() {
    return (
      <div className="booker-profile-update">
        <Form success={this.state.updateBool} onSubmit={this.handleUpdateBooker}>
          <div>
            <h3>Update Your Booker Details</h3>
            <h4>
              Name <br />
            </h4>
              <Form.Input fluid name="name" placeholder="" />
            <h4>
              Email <br />
            </h4>
              <Form.Input fluid name="email" placeholder="" />
            <h4>
              Phone # <br />
            </h4>
            <div className="booker-profile-update-phone">
            <Form.Group inline >
              <Form.Input name="phone1" maxLength="3" placeholder="" />
              <Form.Input name="phone2" maxLength="3" placeholder="" />
              <Form.Input name="phone3" maxLength="4" placeholder="" />
            </Form.Group>
            </div>
            <h4>
              Bio <br />
            </h4>
            <Form.Input fluid name="bio" placeholder="" />
            <Message success header="Update Successful" />
            <Form.Button type="submit" value="submit" >
            Submit
            </Form.Button>
          </div>
        </Form>
        <br />
        <Button onClick={() => {
          this.state.viewUpdateBooker === true ?
          this.setState({ viewUpdateBooker: false }) :
          this.setState({ viewUpdateBooker: true })
          }}>
          Cancel
        </Button>
        <br />
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
      phoneInput === '' &&
      event.target.bio.value === ''
    ) {
      alert("Please fill out at least one field");

    } else {
      const booker = {
        id: currentBooker.id,
        name: event.target.name.value || currentBooker.name,
        email: event.target.email.value || currentBooker.email,
        phone: phoneInput || currentBooker.phone,
        bio: event.target.bio.value || currentBooker.bio
      }
      updateBooker(booker);
      this.setState({ updateBool: true })
      event.target.name.value = '';
      event.target.email.value = '';
      event.target.phone1.value = '';
      event.target.phone2.value = '';
      event.target.phone3.value = '';
      event.target.bio.value = '';
    }
  }
}

const mapState = ({ user, bookers }) => ({ user, bookers });
const mapDispatch = { updateBooker };

export default connect(
  mapState,
  mapDispatch
)(BookerDetail);
