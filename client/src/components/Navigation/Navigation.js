import React from 'react';
import { NavLink } from 'react-router-dom';
import NavItems from './NavItemList';
import './Navigation.css'

class Navigation extends React.Component {
    render() {
        return (
            <div className="nav-bar">
                <NavLink to="/home" className="branding">
                    Cool Crepes and Co.
                </NavLink>

                <ul className="nav-menu">  
                    {NavItems.map((item, index) => {
                        if((item.name === "Login" || item.name === "Register") && this.props.userToken) {
                            return null;
                        }
                        
                        if(item.name === "User" && !this.props.userToken) {
                            return null;
                        }
                        
                        return (
                            <li key={item.name}>
                                <NavLink to={item.link} className={item.class}>{item.name}</NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default Navigation;