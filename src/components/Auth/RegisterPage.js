import React from 'react';
import Fire from '../Fire';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import '../../App.css';
import { Redirect } from 'react-router-dom';
import StateNames from './StateNames'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
        this.state = {
            firstName:"",
            lastName:"",
            streetName:"",
            city:"",
            state:"",
            zipcode:"",
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
            u.user.updateProfile({
                displayName: this.state.firstName
            });
            this.submitUserToDB(u);
        })
        .catch((error) => {
            this.setState({message: error.message});
        });
    }  
    
    submitUserToDB(createdUser) {
        let newUser = {
            'id': createdUser.user.uid,
            'email': this.state.email,
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'address': {
                'streetName': this.state.streetName,
                'zipcode': this.state.zipcode,
                'city': this.state.city,
                'state': this.state.state,
            },
            'purchases': [],
            'comments': [],
            'sales': [],
            'cart': []
        };

        Fire.database().ref('user').push(newUser, error => {
            if (error) {
                console.log("There was an error");
                console.log(error);
                this.setState({message: error.message});
            }
            else {
                console.log(createdUser);
                this.setState({message: "Account Created for "+this.state.email});
                this.props.updateHandler();
            }
        });
        
    }

    render() {
        const isValid = this.state.email && this.state.password && this.state.password2 && this.state.password === this.state.password2 &&
                        this.state.firstName && this.state.lastName && this.state.streetName && this.state.state && this.state.zipcode && this.state.city;
        return (
            <>
                {this.props.userToken && <Redirect to="/" />}

                <Form  onSubmit={this.submitRegister.bind(this)} className="pageForm">
                    <h1 className="text-center">Register</h1>
                    <div className="row">
                        <div className="col">
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange.bind(this)}/>
                            </FormGroup>
                        </div>
                        <div className="col">
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange.bind(this)}/>
                            </FormGroup>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-sm-8">
                            <FormGroup>
                                <Label>Address</Label>
                                <Input type="text" name="streetName" placeholder="Address" value={this.state.streetName} onChange={this.handleChange.bind(this)}/>
                            </FormGroup>
                        </div>
                        <div className="col col-sm-4">
                            <FormGroup>
                                <Label>Zip</Label>
                                <Input type="text" name="zipcode" placeholder="Zipcode" value={this.state.zipcode} onChange={this.handleChange.bind(this)}/>
                            </FormGroup>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <FormGroup>
                                <Label>City</Label>
                                <Input type="text" name="city" placeholder="City" value={this.state.city} onChange={this.handleChange.bind(this)}/>
                            </FormGroup>
                        </div>
                        <div className="col">
                            <FormGroup>
                                <Label>State</Label>
                                <select name="state" className="custom-select" value={this.state.state} onChange={this.handleChange.bind(this)}>
                                    <option value="" disabled> Select State</option>
                                    {Object.keys(StateNames).map(stateIndex => {
                                        return <option value={stateIndex} key={stateIndex}>{StateNames[stateIndex]}</option>;
                                    })}
                                </select>
                            </FormGroup>
                        </div>
                    </div>

                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="password" name="password2" placeholder="Reenter Password" value={this.state.password2} onChange={this.handleChange.bind(this)}/>
                    </FormGroup>
                    <Button type="submit" className="btn-lg btn-block btn-light" disabled={!isValid}>Sign Up</Button>
                    <p>{ this.state.message }</p>
                </Form>
            </>
        );
    }
}

export default RegisterPage;