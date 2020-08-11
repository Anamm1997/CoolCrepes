import React from 'react';
 
class RegisterPage extends React.Component {
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

    RegisterEvent = () => {
        const {username, password} = this.state;
        console.log(`Register Attempt with username:${username} and password:${password}`);
    }

    render() {
        return (
            <div>
                 <h1>RegisterPage</h1>
                 <p>RegisterPage body content</p>
                     <form>
                         <label>
                             Username
                             <input type="text" name="usernameInput" value={this.state.username} onChange={this.HandleInputChange} />
                         </label>
                         <label>
                             Password
                             <input type="password" name="passwordInput" value={this.state.username} onChange={this.HandleInputChange} />
                         </label>
                     </form>
                        <button onClick={this.RegisterEvent} >Register</button>
            </div>
         );
    }
}
 
export default RegisterPage;