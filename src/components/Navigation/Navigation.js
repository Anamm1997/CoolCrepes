import React from 'react';
import { NavLink } from 'react-router-dom';
import NavItems from './NavItemList';
import Fire from '../Fire';
import './Navigation.css'

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {  
        let user = Fire.auth().currentUser;
        if (user) {
            Fire.auth().signOut();
        } else {
            alert("No user is logged in.");
        }
    }

    render() {
        return (
            <div className="nav-bg navbar navbar-expand-sm navbar-dark bg-dark">
                <NavLink to="/" className="navbar-brand">
                    Cool Crepes and Co.
                </NavLink>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">  

                        {this.props.userToken ?
                            (<li className="nav-item active dropdown user-dropdown">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" data-target="userMenu" href="/">
                                    {this.props.userToken.username} <span className="caret"></span>
                                </a>

                                <div className="dropdown-menu" aria-labelledby="userMenu">
                                    {NavItems.userlinks.map((item, index) => {
                                        return (
                                        <NavLink to={item.link} className={item.class} key={item.name}>{item.name}</NavLink>
                                        )        
                                    })}
                                    <div className="dropdown-divider"></div>

                                    <a href="/" className="dropdown-item" onClick={this.logout}>LogOut</a>
                                </div>
                                
                            </li>)
                            : null
                        }
                        

                        {NavItems.navlinks.map((item, index) => {
                            if((item.name === "Login" || item.name === "Register") && this.props.userToken) {
                                return null;
                            }
                            
                            return (
                                <li key={item.name} className="nav-item active">
                                    <NavLink to={item.link} className={item.class}>{item.name}</NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>

            </div>
        );
    }
}

export default Navigation;