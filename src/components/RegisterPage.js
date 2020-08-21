import React from 'react';
import Fire from './Fire';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import '../App.css';
import { Redirect } from 'react-router-dom';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
        this.state = {
            email:"",
            password:"",
            password2:"",
            message:""
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    submitRegister(e){
        e.preventDefault();
        Fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            this.setState({message: "Account Created for "+this.state.email});
            this.props.updateHandler();
        })
            .catch((error) => {
            this.setState({message: error.message});
        });
    }    

    render() {
        const isValid = this.state.email && this.state.password && this.state.password2 && this.state.password === this.state.password2;
        return (
            <>
                {this.props.userToken && <Redirect to="/" />}

                <Form  onSubmit={this.submitRegister.bind(this)} className="pageForm">
                    <h1 className="text-center">Register</h1>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" name = "email"placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                        <Label>Password</Label>
                        <Input type="password" name = "password" placeholder="Password"value={this.state.password} onChange={this.handleChange.bind(this)}/>
                        <Label>Password</Label>
                        <Input type="password" name = "password2" placeholder="Reenter Password"value={this.state.password2} onChange={this.handleChange.bind(this)}/>
                    </FormGroup>
                    <Button type = "submit" className="btn-lg btn-block btn-light" disabled={!isValid}>Sign Up</Button>
                    <p>{ this.state.message }</p>
                </Form>
            </>
        );
    }
}

export default RegisterPage;