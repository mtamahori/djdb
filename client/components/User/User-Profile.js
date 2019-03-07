import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../../store'
import { Button } from 'semantic-ui-react'
require('../../../public/stylesheets/profile.css')

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  render() {
    const { currentUser } = this.props
    return (
      <div className="profile-container">
        <div className="profile-current">
          <h3>Current Email: {currentUser.email}</h3>
        </div>
        <div className="profile-update">
          {this.renderUpdateUser()}
        </div>
      </div>
    )
  }

  renderUpdateUser() {
    return (
      <div>
        <form onSubmit={this.handleUpdateUser} >
          <div>
            <h3>Update User Info</h3>
            <h4>
              <input name="email" type="text" required placeholder="Email" />
            </h4>
            <input type="submit" value="submit" />
          </div>
        </form>
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
