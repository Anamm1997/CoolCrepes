import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import Home from './components/Home';
import LogoPage from './components/Logo';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <NavLink to="/">Logo </NavLink>
          <NavLink to="/home">Home </NavLink>
            <Switch>
             <Route path="/" component={LogoPage} exact/>
             <Route path="/home" component={Home} exact/>
           </Switch>
        </div> 
      </BrowserRouter>
    </div>
  );
}

export default App;
