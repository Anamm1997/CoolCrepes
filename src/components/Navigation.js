import React from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
          <div className="navigation-bar">
              <NavLink to="/">Logo </NavLink>
              <NavLink to="/home">Home </NavLink>
              <NavLink to="/featured">Featured </NavLink>
              <NavLink to="/user">User </NavLink>
              <NavLink to="/login">Login </NavLink>
              <NavLink to="/register">Register </NavLink>
          </div>
        );
    }
}

export default Navigation;