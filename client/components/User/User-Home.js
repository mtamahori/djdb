import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
