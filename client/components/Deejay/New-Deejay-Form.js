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

  handleCreateDeejay(event) {
    event.preventDefault();
    const { user, createDeejay } = this.props;
    const newDeejay = {
      userId: user.id,
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value
    };
    createDeejay(newDeejay);
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.phone.value = '';
    history.push('/deejays')
  }
}

const mapState = ({ user }) => ({ user });
const mapDispatch = { createDeejay };

export default connect(mapState, mapDispatch)(NewDeejayForm)
