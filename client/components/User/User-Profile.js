import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../../store'
import { Form, Button, Message } from 'semantic-ui-react'
require('../../../public/stylesheets/profile.css')

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateUser = this.handleUpdateUser.bind(this);

    this.state = {
      updateBool: false
    }
  }

  render() {
    const { currentUser } = this.props
    return (
      <div className="profile-container">
        <div className="profile-current">
          <h3>Current Email: {currentUser.email}</h3>
        </div>
        <br />
        <br />
        <div className="profile-update">
          {this.renderUpdateUser()}
        </div>
      </div>
    )
  }

  renderUpdateUser() {
    return (
      <div>
        <Form success={this.state.updateBool} onSubmit={this.handleUpdateUser} >
          <div>
            <h3>Update Email</h3>
            <h4>
              <Form.Input name="email" required placeholder="Email" />
            </h4>
            <Message success header="Update Successful" />
            <Form.Button type="submit" value="submit" >
              Update
            </Form.Button>
          </div>
        </Form>
      </div>
    )
  }

  handleUpdateUser(event) {
    event.preventDefault();
    const { currentUser, updateUser } = this.props
    const user = {
      id: currentUser.id,
      email: event.target.email.value
    }
    updateUser(user);
    this.setState({ updateBool: true })
    event.target.email.value = '';

  }
}

const mapState = ({ user }) => {
  return {
    currentUser: user
  }
}
const mapDispatch = { updateUser };

export default connect(mapState, mapDispatch)(UserProfile)
