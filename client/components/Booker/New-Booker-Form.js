import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBooker } from '../../store'
import history from '../../history'

class NewBookerForm extends Component {
  constructor(props) {
    super(props);

    this.handleCreateBooker = this.handleCreateBooker.bind(this);
  }

  render() {
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

  handleCreateBooker(event) {
    event.preventDefault();
    const { user, createBooker } = this.props;
    const newBooker = {
      userId: user.id,
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value
    };
    createBooker(newBooker);
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.phone.value = '';
    history.push('/bookers')
  }
}

const mapState = ({ user }) => ({ user });
const mapDispatch = { createBooker };

export default connect(mapState, mapDispatch)(NewBookerForm);
