import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import { logout } from "../store";
require('../../public/stylesheets/navbar.css')

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="navbar">
    <h1>D J D B</h1>
      {isLoggedIn ? (
        <Menu className="navbar-buttons" fluid widths={5}>
          <Menu.Item as={Link} to="/user">Account</Menu.Item>
          <Menu.Item as={Link} to="/booker">Booker</Menu.Item>
          <Menu.Item as={Link} to="/inbox">Messages</Menu.Item>
          <Menu.Item as={Link} to="/deejay">Deejay</Menu.Item>
          <Menu.Item onClick={handleClick} position="right">Logout</Menu.Item>
        </Menu>
      ) : (
        <Menu className="navbar-buttons" fluid widths={3}>
        <Menu.Item as={Link} to="/login">Log In</Menu.Item>
        <Menu.Item as={Link} to="/">DJDB</Menu.Item>
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
