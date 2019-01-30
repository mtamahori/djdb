import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createDeejay } from '../../store'
import history from '../../history'

class NewDeejayForm extends Component {
  constructor(props) {
    super(props);

    this.handleCreateDeejay = this.handleCreateDeejay.bind(this);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleCreateDeejay}>
          <div>
            <h3>Create New Deejay Profile</h3>
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

  handleCreateDeejay(event) {
    event.preventDefault();
    const { user, createDeejay } = this.props;
    let phoneInput = event.target.phone1.value + event.target.phone2.value + event.target.phone3.value;
    const newDeejay = {
      userId: user.id,
      name: event.target.name.value,
      email: event.target.email.value,
      phone: phoneInput
    };
    createDeejay(newDeejay);
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.phone1.value = '';
    event.target.phone2.value = '';
    event.target.phone3.value = '';
    history.push('/deejays')
  }
}

const mapState = ({ user }) => ({ user });
const mapDispatch = { createDeejay };

export default connect(mapState, mapDispatch)(NewDeejayForm)
