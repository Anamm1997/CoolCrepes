import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Fire from '../Fire';
import {Button, Form, FormGroup, Label, Input,InputGroup} from 'reactstrap';
import '../../App.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.state = {
            email:"",
            password:"",
            message:"",
            rememberMe: false,
            hidden:true,
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitLogin(e){
        e.preventDefault();
//        console.log(this.state.rememberMe)
//        console.log(Fire.auth().Auth.Persistence.LOCAL)
//        console.log(Fire.auth.Auth.Persistence.LOCAL)
//
//        Fire.auth().setPersistence( `${
//                                   this.state.rememberMe
//                                   ? Fire.auth.Auth.Persistence.LOCAL
//                                   : Fire.auth.Auth.Persistence.SESSION
//                                   }`)
//            .then(function() {
//            return(
                Fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
                    console.log("Login Sucess");
                    this.props.updateHandler();
                }).catch((error) => {
                    this.setState({message: error.message});
                });
//        }).catch(function(error) {
//            console.log(error.code)
//            console.log(error.message)
//        });
    }

    handleCheckbox(e) {
        this.setState({ rememberMe: !(this.state.rememberMe) });
    }
    
    showPassword(e) {
        this.setState({ hidden: !(this.state.hidden) });
    }
    
    render() {
        const isValid = this.state.email && this.state.password;
        return (
            <> 
            {this.props.userToken && <Redirect to='/' /> }

            <Form onSubmit = {this.submitLogin} className="pageForm">
            <h1 className="text-center">Cool Crepes</h1>
            <FormGroup>
            <Label>Email</Label>
            <Input type="email" name = "email"placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
            <Label>Password</Label>
            
            <InputGroup>
            <Input type={this.state.hidden ? 'password' : 'text'} name = "password" placeholder="Password"value={this.state.password} onChange={this.handleChange}/>
            
            <Button className="btn-light p-0" onClick={this.showPassword}><img style={{width:'2.7rem', height:'2.4rem'}} src={this.state.hidden ? "https://img.icons8.com/nolan/64/privacy.png" :"https://img.icons8.com/nolan/64/password1.png"}/></Button>
            </InputGroup>

            <Label className="float-left form-inline my-3">
            
            <Input type="checkbox" onChange={this.handleCheckbox}/>{' '}Remember me</Label>
            <a href="/password" className="float-right my-3">Forgot Password?</a>
</FormGroup>            

<Button type = "submit" className="btn-lg btn-block btn-light mb-3" disabled={!isValid}>Log in</Button>

<Link to="/register"> <Button className="btn-lg btn-block btn-light">Sign Up </Button></Link>
    <p>{ this.state.message }</p>
</Form>
</>
);
}
}

export default LoginPage;