import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>D J D B</h1>
      {isLoggedIn ? (
        <Menu>
          <Menu.Item as={Link} to="/home">Home</Menu.Item>
          <Menu.Item as={Link} to="/user">Profile</Menu.Item>
          <Menu.Item as={Link} to="/booker">Booker</Menu.Item>
          <Menu.Item as={Link} to="/deejay">Deejay</Menu.Item>
          <Menu.Item onClick={handleClick}>Logout</Menu.Item>
        </Menu>
      ) : (
        <Menu>
          <Menu.Item as={Link} to="/">Home</Menu.Item>
          <Menu.Item as={Link} to="/login">Log In</Menu.Item>
          <Menu.Item as={Link} to="/signup">Sign Up</Menu.Item>
        </Menu>
      )}
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
