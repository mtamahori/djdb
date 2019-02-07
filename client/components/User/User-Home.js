import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

class UserHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { email } = this.props
    return (
      <div>
      <div className="welcome-message" >
        <h3>Welcome, {email}</h3>
      </div>
        <div className="user-home-button-container">
          <NavLink activeClassName="active" to="/user">
            <Button size="massive">User Profile</Button>
          </NavLink>
          <NavLink activeClassName="active" to="/booker">
            <Button size="massive">Booker</Button>
          </NavLink>
          <NavLink activeClassName="active" to="/deejay">
            <Button size="massive">Deejay</Button>
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    email: state.user.email
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(UserHome);

UserHome.propTypes = {
  email: PropTypes.string
};
