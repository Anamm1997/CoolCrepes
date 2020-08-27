import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import StateNames from '../Shared/StateNames';
import acceptableFileTypes from '../Shared/AcceptableTypes'
import Fire from '../Fire';

const initialUser = {
    'id': "",
    'profileURL': "",
    'email': "",
    'firstName': "",
    'lastName': "",
    'address': {
        'streetName': "",
        'zipcode': "",
        'city': "",
        'state': "",
    },
    'purchases': [],
    'comments': [],
    'sales': [],
    'cart': [],
    'timeStamp': null
};

class UserSetting extends React.Component {
    constructor(props) {
        super(props);
        this.userRef = null;

        this.state = {          
            ...initialUser,
            image: "",
            message: "",
            editing: false
        };

        this.submitUpdate = this.submitUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
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

    toggleEditing() {
        this.setState({ editing: !this.state.editing });
    }

    async submitUpdate(e){
        e.preventDefault();
        let updatedUserData = {
            'id': this.state.id,
            'profileURL': await this.uploadImageToStorage(),
            'email': this.state.email,
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'address': this.state.address,
            'purchases': this.state.purchases,
            'comments': this.state.comments,
            'sales': this.state.sales,
            'cart': this.state.cart,
            'timeStamp': this.state.timeStamp
        };
        
        Fire.database().ref(`user/${this.props.userToken.id}`).update(updatedUserData, error => {
            if(error) {
                this.setState({ message: error.message });
            }
            else {
                Fire.auth().currentUser.updateProfile({
                    displayName: this.state.firstName
                }).then(() => this.props.updateHandler());

                this.setState({ 
                    image: '', 
                    message: 'Profile Updated',
                    editing: false
                });
            }
        });
    }

    async uploadImageToStorage() {
        if (this.state.image === "") {
            // default profile picture
            return this.state.profileURL;
        }
        await Fire.storage().ref(`/profileImages/${this.state.email}${this.state.image.name}`).put(this.state.image);

        return await Fire.storage().ref('profileImages').child(`${this.state.email}${this.state.image.name}`).getDownloadURL();
    }

    componentDidMount() {
        if(!this.props.userToken) {
            return;
        }
        this.userRef = Fire.database().ref(`user/${this.props.userToken.id}`);
        this.userRef.on('value', snapshot => {
            this.setState({...snapshot.val()});
            this.props.userInfoHandler(snapshot.val());
        });
    }

    componentWillUnmount() {
        if (this.userRef) {
            this.userRef.off();
        }
    }

    render() {
        const isUserInputValid = this.state.editing && this.state.editing && this.state.email && this.state.firstName && this.state.lastName && 
                            this.state.address.streetName && this.state.address.state && this.state.address.zipcode && this.state.address.city;


        return (
            <>

                <Form  onSubmit={this.submitUpdate} className="pageForm">
                    <h1 className="text-center">User Settings</h1>
                    <FormGroup>
                        <Button className="btn-lg btn-block btn-info" onClick={this.toggleEditing}>
                            {this.state.editing ? 'Disable' : 'Enable'} Editing
                        </Button>
                    </FormGroup>
                    <div className="row">
                        <div className="col">
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} disabled={!this.state.editing} />
                            </FormGroup>
                        </div>
                        <div className="col">
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} disabled={!this.state.editing} />
                            </FormGroup>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-sm-8">
                            <FormGroup>
                                <Label>Address</Label>
                                <Input type="text" name="streetName" placeholder="Address" value={this.state.address.streetName} onChange={this.handleChange} disabled={!this.state.editing} />
                            </FormGroup>
                        </div>
                        <div className="col col-sm-4">
                            <FormGroup>
                                <Label>Zip</Label>
                                <Input type="text" name="zipcode" placeholder="Zipcode" value={this.state.address.zipcode} onChange={this.handleChange} disabled={!this.state.editing} />
                            </FormGroup>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <FormGroup>
                                <Label>City</Label>
                                <Input type="text" name="city" placeholder="City" value={this.state.address.city} onChange={this.handleChange} disabled={!this.state.editing} />
                            </FormGroup>
                        </div>
                        <div className="col">
                            <FormGroup>
                                <Label>State</Label>
                                <select name="state" className="custom-select" value={this.state.address.state} onChange={this.handleChange} disabled={!this.state.editing} >
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
                        <Input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} disabled={true} />
                    </FormGroup>

                    <FormGroup> 
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" name="image" onChange={this.handleChange} disabled={!this.state.editing} />
                            <label className="custom-file-label">Profile Picture (optional)</label>
                        </div>
                    </FormGroup>

                    <Button type="submit" className="btn-lg btn-block btn-primary" disabled={!isUserInputValid}>Update Profile</Button>
                    <p>{ this.state.message }</p>
                </Form>
            </>
        );
    }
}

export default UserSetting;