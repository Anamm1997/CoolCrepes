import React from 'react';
import Fire from '../Fire';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import '../../App.css';
import StateNames from './StateNames'
import { Redirect } from 'react-router-dom';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.submitRegister = this.submitRegister.bind(this);
        this.UploadImageToStorage = this.uploadImageToStorage.bind(this);
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
            image: "",
            message:""
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleImageUpload(e) {
        this.setState({ [e.target.name]: e.target.files[0] });
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
    
    async submitUserToDB(createdUser) {
        let profileURL = await this.uploadImageToStorage();

        let newUser = {
            'id': createdUser.user.uid,
            'profileURL': profileURL,
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
            'cart': [],
            'timeStamp': Date.now()
        };

        Fire.database().ref('user').push(newUser, error => {
            if (error) {
                console.log("There was an error");
                console.log(error);
                
                // Delete the user from firebase auth if we can't put them in the data base
                Fire.auth().deleteUser(createdUser.user.uid);
                this.setState({
                    ...this.state, 
                    message: error.message
                });
            }
            else {
                this.setState({
                    ...this.state,
                    message: "Account Created for " + this.state.email
                });
                this.props.updateHandler();
            }
        });
        
    }

    async uploadImageToStorage() {
        let image = this.state.image;
        if (image === "") {
            // default profile picture
            return "gs://coolcrepe-d97ac.appspot.com/profileImages/blue-user-profile-icon.png";
        }

        console.log(image);
        const uploadTask = await Fire.storage().ref(`/profileImages/${image.name}`).put(image);
        console.log(uploadTask);

        return await Fire.storage().ref('profileImages').child(image.name).getDownloadURL();
    }

    render() {
        const isValid = this.state.email && this.state.password && this.state.password2 && this.state.password === this.state.password2 &&
                        this.state.firstName && this.state.lastName && this.state.streetName && this.state.state && this.state.zipcode && this.state.city;
        return (
            <>
                {this.state.message === "Account Created for " + this.state.email && this.props.userToken && <Redirect to="/" />}
                
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

                    <FormGroup> 
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" name="image" onChange={this.handleImageUpload.bind(this)} />
                            <label className="custom-file-label">Profile Picture (optional)</label>
                        </div>
                    </FormGroup>

                    <Button type="submit" className="btn-lg btn-block btn-light" disabled={!isValid}>Sign Up</Button>
                </Form>
                <p>{ this.state.message }</p>
            </>
        );
    }
}

export default RegisterPage;