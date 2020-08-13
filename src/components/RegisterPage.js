import React from 'react';
import Fire from './Fire';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import '../App.css';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
        this.state = {
            email:"",
            password:""
        };

    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    submitRegister(e){
        e.preventDefault();
        Fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{console.log(u)})
            .catch((error) => {
            console.log(error.message);
        })
    }    

    render() {
        return (
            <Form className="pageForm">
            <h1 className="text-center">Register</h1>
            <FormGroup>
            <Label>Email</Label>
            <Input type="email" name = "email"placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
            <Label>Password</Label>
            <Input type="password" name = "password" placeholder="Password"value={this.state.password} onChange={this.handleChange.bind(this)}/>
            </FormGroup>
            <Button className="btn-lg btn-block btn-light" 
            onClick = {this.submitRegister.bind(this)}>Sign Up</Button>
            </Form>
        );
    }
}

export default RegisterPage;