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
            alert("Logout Sucess");
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
{this.props.userToken ?
(<li>
                    <NavLink to="/cart" className="cart pl-2 "><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-cart4 mt-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg></NavLink>
                    </li>): null
}
                    </ul>
                </div>

            </div>
        );
    }
}

export default Navigation;