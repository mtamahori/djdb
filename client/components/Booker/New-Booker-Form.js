import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBooker } from '../../store'
import history from '../../history'
import { Form, Button, Message } from 'semantic-ui-react'
require('../../../public/stylesheets/newProfile.css')

// CREATE BOOKER PROFILE

class NewBookerForm extends Component {
  constructor(props) {
    super(props);

    this.handleCreateBooker = this.handleCreateBooker.bind(this);

    this.state = {
      createdBool: false
    }
  }

  render() {
    return (
      <div className="booker-profile-create">
        <Form success={this.state.createdBool} onSubmit={this.handleCreateBooker}>
          <div>
            <h3>Create Booker Profile</h3>
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
            <div className="booker-profile-create-phone">
            <Form.Group inline >
              <Form.Input name="phone1" type="text" maxLength="3" placeholder="" />
              <Form.Input name="phone2" type="text" maxLength="3" placeholder="" />
              <Form.Input name="phone3" type="text" maxLength="4" placeholder="" />
            </Form.Group>
            </div>
            <Message success header="Booker Profile Created Successfully" />
            <Form.Button type="submit" value="submit" >
            Submit
            </Form.Button>
          </div>
        </Form>
        <br />
        <Button onClick={() => {
          history.push('/home')
        }}>
        Cancel
        </Button>
      </div>
    );
  }

  handleCreateBooker(event) {
    event.preventDefault();
    const { user, createBooker } = this.props;
    let phoneInput = event.target.phone1.value + event.target.phone2.value + event.target.phone3.value;
    const newBooker = {
      userId: user.id,
      name: event.target.name.value,
      email: event.target.email.value,
      phone: phoneInput
    };
    createBooker(newBooker);
    this.setState({ createdBool: true })
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.phone1.value = '';
    event.target.phone2.value = '';
    event.target.phone3.value = '';

    history.push('/booker')
  }
}

const mapState = ({ user }) => ({ user });
const mapDispatch = { createBooker };

export default connect(mapState, mapDispatch)(NewBookerForm);
