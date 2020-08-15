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
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.userToken = null;

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div>{this.state.data}</div>
            <Navigation userToken={this.userToken}/>
            <Switch>
              <Route path="/" component={LogoPage} exact/>
              <Route path="/home" component={HomePage} exact/>
              <Route path="/featured" component={Featured} exact/>
              <Route path="/user" component={UserPage} exact/>
              <Route path="/cart" component={CartPage} exact/>
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
