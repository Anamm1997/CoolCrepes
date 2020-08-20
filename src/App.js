import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import LogoPage from './components/Logo';
import Navigation from './components/Navigation/Navigation'
import Featured from './components/FeaturedPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import UserPage from './components/UserPage'
import CartPage from './components/CartPage'
import SalesPage from "./components/SalesPage"
import TrendingPage from "./components/TrendingPage"
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.userToken = {
      name: "something",
      id: 125
    };
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            {/* <Navigation userToken={this.userToken}/> */}
            <Navigation />
            <Switch>
              <Route path="/" component={LogoPage} exact/>
              <Route path="/home" component={HomePage} exact/>
              <Route path="/featured" component={Featured} exact/>
              <Route path="/user" component={UserPage} exact/>
              <Route path="/cart" component={CartPage} exact/>
              <Route path="/login" component={LoginPage} exact/>
              <Route path="/register" component={RegisterPage} exact/>
               <Route path="/sale" component={SalesPage} exact/>
              <Route path="/trending" component={TrendingPage} exact/>

            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
