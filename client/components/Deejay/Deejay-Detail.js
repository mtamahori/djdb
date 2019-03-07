import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteDeejay, updateDeejay } from '../../store'
import { Form, List, Button, Message } from 'semantic-ui-react'
require('../../../public/stylesheets/profile.css')

class DeejayDetail extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateDeejay = this.handleUpdateDeejay.bind(this);
    this.handleDeleteDeejay = this.handleDeleteDeejay.bind(this);

    this.state = {
      viewUpdateDeejay: false,
      updateBool: false
    }
  }

  render() {
      return (
        <div className="deejay-profile-container">
          <div>{this.renderCurrentDeejay()}</div>
          {
            !this.state.viewUpdateDeejay &&
            <Button
              onClick={() => {
                this.state.viewUpdateDeejay === false ?
                this.setState({ viewUpdateDeejay: true }) :
                this.setState({ viewUpdateDeejay: false })
              }}
            >
            Update Details
            </Button>
          }
          {
            this.state.viewUpdateDeejay &&
            this.renderUpdateDeejay()
          }
        </div>
      )
    }

  renderCurrentDeejay() {
    const { currentDeejay } = this.props

    if (!currentDeejay) {
      return <div>Loading!</div>
    }

    else if (currentDeejay) {
      return (
        <div className="deejay-profile-detail">
        <h3>Your Deejay Profile</h3>
          {
            <List key={currentDeejay.id} >
              <List.Item icon="users" content={currentDeejay.name} />
              <List.Item icon="marker" content="Chicago, IL" />
              <List.Item icon="mail" content={currentDeejay.email} />
              <List.Item icon="phone" content={currentDeejay.phone} />
            </List>
          }
        </div>
      )
    }
  }

  renderUpdateDeejay() {
    return (
      <div className="deejay-profile-update">
        <Form success={this.state.updateBool} onSubmit={this.handleUpdateDeejay} >
          <div>
            <h3>Update Deejay Details</h3>
            <h4>
              Name <br />
            </h4>
              <Form.Input name="name" type="text" placeholder="" />
            <h4>
              Email <br />
            </h4>
              <Form.Input name="email" type="text" placeholder="" />
            <h4>
            Phone # <br />
            </h4>
            <div className="deejay-profile-update-phone">
            <Form.Group inline >
              <Form.Input name="phone1" type="text" maxLength="3" placeholder="" />
              <Form.Input name="phone2" type="text" maxLength="3" placeholder="" />
              <Form.Input name="phone3" type="text" maxLength="4" placeholder="" />
            </Form.Group>
            </div>
            <Message success header="Update Successful" />
            <Form.Button type="submit" value="submit" >
            Submit
            </Form.Button>
          </div>
        </Form>
        <br />
        <Button onClick={() => {
          this.state.viewUpdateDeejay === true ?
          this.setState({ viewUpdateDeejay: false }) :
          this.setState({ viewUpdateDeejay: true })
          }}>
          Cancel
        </Button>
        <br />
      </div>
    )
  }

  handleDeleteDeejay(event) {
    event.stopPropagation();
    const { deleteDeejay, deejay } = this.props;
    deleteDeejay(deejay);
  }

  handleUpdateDeejay(event) {
    event.preventDefault();
    const { updateDeejay, currentDeejay } = this.props;

    let phoneInput = event.target.phone1.value + event.target.phone2.value + event.target.phone3.value;

    if (
      event.target.name.value === '' &&
      event.target.email.value === '' &&
      phoneInput === ''
    ) {
      alert("Please fill out at least one field");
    } else {
      const deejay = {
        id: currentDeejay.id,
        name: event.target.name.value || currentDeejay.name,
        email: event.target.email.value || currentDeejay.email,
        phone: phoneInput || currentDeejay.phone
      }
      updateDeejay(deejay);
      this.setState({ updateBool: true })
      event.target.name.value = '';
      event.target.email.value = '';
      event.target.phone1.value = '';
      event.target.phone2.value = '';
      event.target.phone3.value = '';
    }
  }
}

const mapState = ({ user, deejays }) => ({ user, deejays })
const mapDispatch = { deleteDeejay, updateDeejay }

export default connect(mapState, mapDispatch)(DeejayDetail)
