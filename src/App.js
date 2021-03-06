import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navigation from './components/Navigation/Navigation'
import FeaturedPage from './components/Products/FeaturedPage'
import LoginPage from './components/Auth/LoginPage'
import RegisterPage from './components/Auth/RegisterPage'
import AddProductPage from './components/Products/AddProductPage'
import SalesPage from "./components/Products/SalesPage"
import TrendingPage from "./components/Products/TrendingPage"
import UserPage from './components/User/UserPage'
import CartPage from './components/User/CartPage'
import SellerPage from './components/User/SellerPage';
import ProductsPage from './components/Products/ProductsPage';
import ThankYouForShoppingPage from './components/Products/ThankYouForShoppingPage';
import ForgotPasswordPage from './components/Auth/ForgotPasswordPage';
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
          username: user.displayName,
          id: ''
        }
      });
      this.getUserObjectId(user.uid)
    }
    else {
      this.setState({
        userToken: null
      });
    }
  }

  getUserObjectId(uid) {
    Fire.database().ref("user").orderByChild("id").equalTo(uid).once('value', snapshot => {
      this.setState({ userToken: {...this.state.userToken, id: Object.keys(snapshot.val())[0] } });
    });
  }

  componentDidMount() {
    this.validateUser();
  }
  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigation userToken={this.state.userToken}/>
            <Switch>
              <Route path="/" component={HomePage} exact/>
              <Route path="/featured" render={() => <FeaturedPage userToken={this.state.userToken} />} exact />
              <Route path="/products" render={() => <ProductsPage updateHandler={this.validateUser} userToken={this.state.userToken}/>} />
              <Route path="/trending" component={TrendingPage}/>

              <Route path="/login" render={() => <LoginPage updateHandler={this.validateUser} userToken={this.state.userToken} />} exact/>
              <Route path="/register" render={() => <RegisterPage updateHandler={this.validateUser} userToken={this.state.userToken} />} exact/>
              
              <Route path="/thanks" component={ThankYouForShoppingPage}/>
              <Route path="/add" render={() => <AddProductPage userToken={this.state.userToken} />} exact/>

              <Route path="/password" component={ForgotPasswordPage}/>
              <Route path="/sales" render={() => <SalesPage userToken={this.state.userToken} />} exact />
              <Route path="/seller" component={SellerPage}/>

              <Route path="/user" render={() => <UserPage updateHandler={this.validateUser} userToken={this.state.userToken} />}/>
              <Route path="/cart" render={() => <CartPage updateHandler={this.validateUser} userToken={this.state.userToken} />}/>

            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
