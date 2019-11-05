import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../../store'
import { BookerDetail, DeejayDetail } from '../index'
import { Form, Button, Grid, Message } from 'semantic-ui-react'
require('../../../public/stylesheets/profile.css')

// USER PROFILE: current username, booker profile, deejay profile

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateUser = this.handleUpdateUser.bind(this);

    this.state = {
      updateBool: false
    }
  }

  render() {
    const { currentUser, currentBooker, currentDeejay } = this.props
    return (
      <Grid>
        <Grid.Row columns={2} textAlign="center">
          <Grid.Column>
            <BookerDetail currentBooker={currentBooker} />
          </Grid.Column>
          <Grid.Column>
            <DeejayDetail currentDeejay={currentDeejay} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  // <Grid.Row columns={1} textAlign="center">
  //   <Grid.Column className="profile-container">
  //     <div className="profile-current">
  //       <h3>Current Username: {currentUser.username}</h3>
  //     </div>
  //     <br />
  //     <br />
  //     <div className="profile-update">
  //       {this.renderUpdateUser()}
  //     </div>
  //   </Grid.Column>
  // </Grid.Row>

  renderUpdateUser() {
    return (
      <div>
        <Form success={this.state.updateBool} onSubmit={this.handleUpdateUser} >
          <div>
            <h3>Update Username</h3>
            <h4>
              <Form.Input name="username" required placeholder="Username" />
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
      username: event.target.username.value
    }
    updateUser(user);
    this.setState({ updateBool: true })
    event.target.username.value = '';

  }
}

const mapState = ({ user, bookers, deejays }) => {
  return {
    currentUser: user,
    currentBooker: bookers.filter(booker => booker.userId === user.id)[0],
    currentDeejay: deejays.filter(deejay => deejay.userId === user.id)[0]
  }
}
const mapDispatch = { updateUser };

export default connect(mapState, mapDispatch)(UserProfile)
