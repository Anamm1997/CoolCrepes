import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import LogoPage from './components/Logo';
import Navigation from './components/Navigation/Navigation'
import FeaturedPage from './components/FeaturedPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import UserPage from './components/User/UserPage'
import CartPage from './components/User/CartPage'
import UserHistoryPage from './components/User/UserHistoryPage';
import UserSettingsPage from './components/User/UserSettingsPage';
import SellerPage from './components/User/SellerPage';
import ProductsPage from './components/Products/ProductsPage';
import Fire from './components/Fire'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userToken: null   
    }

    this.validateUser = this.validateUser.bind(this);
  }

  validateUser() {
    let user = Fire.auth().currentUser;
    if(user) {
      this.setState({
        userToken: {
          username: user.email
        }
      });
    }
    else {
      this.setState({
        userToken: null
      });
    }
  }
  
  render() {
    return (
      <div className="App" onLoad={this.validateUser}>
        <BrowserRouter>
          <div>
            <Navigation userToken={this.state.userToken}/>
            <Switch>
              <Route path="/" component={LogoPage} exact/>
              <Route path="/home" component={HomePage} exact/>
              <Route path="/featured" component={FeaturedPage} exact/>
              <Route path="/product" component={ProductsPage} exact/>

              <Route path="/login" component={LoginPage} exact/>
              <Route path="/register" component={RegisterPage} exact/>

              <Route path="/user" component={UserPage} exact/>
              <Route path="/cart" component={CartPage} exact/>
              <Route path="/history" component={UserHistoryPage} exact/>
              <Route path="/settings" component={UserSettingsPage} exact/>
              <Route path="/seller" component={SellerPage} exact/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
