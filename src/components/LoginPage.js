import React from 'react';
 
class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.HandleInputChange = this.HandleInputChange.bind(this);
    }

    HandleInputChange(event) {
        const target = event.target;
    
        this.setState({
          [target.name]: target.value
        });
    }

    LoginEvent = () => {
        const {username, password} = this.state;
        console.log(`Login Attempt with username:${username} and password:${password}`);
    }

    render() {
        return (
            <div>
                 <h1>LoginPage</h1>
                 <p>LoginPage body content</p>
                     <form>
                         <label>
                             Username
                             <input type="text" name="username" value={this.state.username} onChange={this.HandleInputChange} />
                         </label>
                         <label>
                             Password
                             <input type="password" name="password" value={this.state.password} onChange={this.HandleInputChange} />
                         </label>
                     </form>
                    <button onClick={this.LoginEvent} >Login</button>
            </div>
         );
    }
}
 
export default LoginPage;