import React from 'react';
import HomePage from './HomePage';
import { Link } from 'react-router-dom';
import Fire from './Fire';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import '../App.css';
//Maybe forget Password have a button or something

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.state = {
            email:"",
            password:""
        };
    }

    handleChange(e) {
        console.log(this.target.value)
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state)    
    }

    submitLogin(e){
        e.preventDefault();
               console.log(`Login Attempt with username:${this.state.email} and password:${this.state.password}`);
 Fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            console.log("success"+u)
            return <HomePage />
        }).catch((error) => {
            console.log(error.message);
        });
        }

                                                                                           render() {
            return (
                <Form className="pageForm">
                <h1 className="text-center">Cool Crepes</h1>
                <FormGroup>
            <Label>Email</Label>
            <Input type="email" name = "email"placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
            <Label>Password</Label>
            <Input type="password" name = "password" placeholder="Password"value={this.state.password} onChange={this.handleChange.bind(this)}/>
            </FormGroup>
        <Button className="btn-lg btn-block btn-light mb-3" 
        onClick = {this.submitLogin.bind(this)}>Log in</Button>
        <Link to="/register"> <Button className="btn-lg btn-block btn-light">Sign Up </Button></Link>
            </Form>

        );
    }
}

export default LoginPage;