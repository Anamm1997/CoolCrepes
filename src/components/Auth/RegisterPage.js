import React from 'react';
import Fire from '../Fire';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import '../../App.css';
import StateNames from '../Shared/StateNames'
import { Redirect } from 'react-router-dom';
import acceptableFileTypes from '../Shared/AcceptableTypes';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
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
        if(e.target.name === 'image') {
            if(!acceptableFileTypes.includes(e.target.files[0].type)) {
                this.setState({
                    image: "",
                    message: "Invalid upload, please select another image (png or jpeg)"
                });
            }
            else {
                this.setState({ image: e.target.files[0]} );
            }
        }
        else {
            this.setState({ [e.target.name] : e.target.value });
        }
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
                this.setState({ message: error.message });
            }
            else {
                this.setState({ message: "Account Created for " + this.state.email });
                this.props.updateHandler();
            }
        });
        
    }

    async uploadImageToStorage() {
        if (this.state.image === "") {
            // default profile picture
            return "https://firebasestorage.googleapis.com/v0/b/coolcrepe-d97ac.appspot.com/o/profileImages%2Ficon_mountain.png?alt=media&token=1c8b4dbf-e144-471a-9db7-3c32000f7b8e";
        }

        await Fire.storage().ref(`/profileImages/${this.state.email}${this.state.image.name}`).put(this.state.image);

        return await Fire.storage().ref('profileImages').child(`${this.state.email}${this.state.image.name}`).getDownloadURL();
    }

    render() {
        const isValid = this.state.email && this.state.password && this.state.password2 && this.state.password === this.state.password2 &&
                        this.state.firstName && this.state.lastName && this.state.streetName && this.state.state && this.state.zipcode && this.state.city;
        return (
            <>
                {this.props.userToken && <Redirect to="/" />}
                
                <Form  onSubmit={this.submitRegister} className="pageForm">
                    <h1 className="text-center">Register</h1>
                    <div className="row">
                        <div className="col">
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange}/>
                            </FormGroup>
                        </div>
                        <div className="col">
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange}/>
                            </FormGroup>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-sm-8">
                            <FormGroup>
                                <Label>Address</Label>
                                <Input type="text" name="streetName" placeholder="Address" value={this.state.streetName} onChange={this.handleChange}/>
                            </FormGroup>
                        </div>
                        <div className="col col-sm-4">
                            <FormGroup>
                                <Label>Zip</Label>
                                <Input type="text" name="zipcode" placeholder="Zipcode" value={this.state.zipcode} onChange={this.handleChange}/>
                            </FormGroup>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <FormGroup>
                                <Label>City</Label>
                                <Input type="text" name="city" placeholder="City" value={this.state.city} onChange={this.handleChange}/>
                            </FormGroup>
                        </div>
                        <div className="col">
                            <FormGroup>
                                <Label>State</Label>
                                <select name="state" className="custom-select" value={this.state.state} onChange={this.handleChange}>
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
                        <Input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label>Confirm Password</Label>
                        <Input type="password" name="password2" placeholder="Confirm Password" value={this.state.password2} onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup> 
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" name="image" onChange={this.handleChange} />
                            <label className="custom-file-label">Profile Picture (Optional)</label>
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