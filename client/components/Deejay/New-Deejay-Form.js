import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createDeejay } from '../../store'
import history from '../../history'
import { Form, Button, Message } from 'semantic-ui-react'
require('../../../public/stylesheets/newProfile.css')

class NewDeejayForm extends Component {
  constructor(props) {
    super(props);

    this.handleCreateDeejay = this.handleCreateDeejay.bind(this);

    this.state = {
      createdBool: false
    }
  }

  render() {
    return (
      <div className="deejay-profile-create">
        <Form success={this.state.createdBool} onSubmit={this.handleCreateDeejay}>
          <div>
            <h3>Create New Deejay Profile</h3>
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
            <div className="deejay-profile-create-phone">
            <Form.Group inline >
              <Form.Input name="phone1" type="text" maxLength="3" placeholder="" />
              <Form.Input name="phone2" type="text" maxLength="3" placeholder="" />
              <Form.Input name="phone3" type="text" maxLength="4" placeholder="" />
            </Form.Group>
            </div>
            <h4>
            Style Tags <br />
            </h4>
              <Form.Input name="styleTags" type="text" placeholder="Add styles separated by comma + space" />
            <Message success heeader="Deejay Profile Created Successfully" />
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

  handleCreateDeejay(event) {
    event.preventDefault();
    const { user, createDeejay } = this.props;

    let phoneInput = event.target.phone1.value + event.target.phone2.value + event.target.phone3.value;
    let styleTagsInput = event.target.styleTags.value.split(', ')

    const newDeejay = {
      userId: user.id,
      name: event.target.name.value,
      email: event.target.email.value,
      phone: phoneInput,
      styleTags: styleTagsInput
    };
    createDeejay(newDeejay);
    this.setState({ createdBool: true })
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.phone1.value = '';
    event.target.phone2.value = '';
    event.target.phone3.value = '';
    event.target.styleTags.value = '';
    history.push('/deejay')
  }
}

const mapState = ({ user }) => ({ user });
const mapDispatch = { createDeejay };

export default connect(mapState, mapDispatch)(NewDeejayForm)
