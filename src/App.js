import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navigation from './components/Navigation/Navigation'
import FeaturedPage from './components/FeaturedPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import SalesPage from "./components/SalesPage"
import TrendingPage from "./components/TrendingPage"
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
              <Route path="/" component={HomePage} exact/>
              <Route path="/featured" component={FeaturedPage}/>
              <Route path="/product" component={ProductsPage}/>
              <Route path="/trending" component={TrendingPage}/>

              <Route path="/login" render={() => <LoginPage updateHandler={this.validateUser} userToken={this.state.userToken} />} exact/>
              <Route path="/register" render={() => <RegisterPage updateHandler={this.validateUser} userToken={this.state.userToken} />} exact/>

              <Route path="/sales" component={SalesPage}/>
              <Route path="/user" component={UserPage}/>
              <Route path="/cart" component={CartPage}/>
              <Route path="/history" component={UserHistoryPage}/>
              <Route path="/settings" component={UserSettingsPage}/>
              <Route path="/seller" component={SellerPage}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
