import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
            <BrowserRouter>
            <div>
            <NavLink to="/home">Home </NavLink>
            <NavLink to="/login">Login </NavLink>

            <Switch>
            <Route path="/home" component={HomePage} exact/>
            <Route path="/login" component={LoginPage} exact/>
            <Route path="/register" component={RegisterPage} exact/>
            </Switch>
            </div> 
            </BrowserRouter>
            </div>
        );
    }
}

export default App;
