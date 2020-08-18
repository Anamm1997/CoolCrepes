import React from 'react';
import { Link } from 'react-router-dom';
import Fire from './Fire';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import '../App.css';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.state = {
            email:"",
            password:"",
            message:""
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitLogin(e){
        e.preventDefault();
               console.log(`Login Attempt with username:${this.state.email} and password:${this.state.password}`);
            
        Fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            console.log("Login Sucess");
            this.props.history.push('/');
        }).catch((error) => {
            this.setState({message: error.message});
        });
    }

    render() {
            return (
                <Form onSubmit = {this.submitLogin.bind(this)} className="pageForm">
                <h1 className="text-center">Cool Crepes</h1>
                <FormGroup>
                
                    <Label>Email</Label>
                    <Input type="email" name = "email"placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                    <Label>Password</Label>
                    <Input type="password" name = "password" placeholder="Password"value={this.state.password} onChange={this.handleChange.bind(this)}/>
                </FormGroup>
        
                <Button type = "submit" className="btn-lg btn-block btn-light mb-3" >Log in</Button>
                <Link to="/register"> <Button className="btn-lg btn-block btn-light">Sign Up </Button></Link>
        
                <p>{ this.state.message }</p>

                </Form>
        );
    }
}

export default LoginPage;