import React from 'react';
import { Redirect } from 'react-router-dom';
import Fire from '../Fire';
import UserSetting from './UserSettings';
import acceptableFileTypes from '../Shared/AcceptableTypes';
import './User.css'
 
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

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.userRef = null;

        this.state = {          
            ...initialUser,
            image: "",
            message: "",
            editing: false,
            selectedPanel: "settings"
        };

        this.submitUpdate = this.submitUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
        this.changeSelectedPanel = this.changeSelectedPanel.bind(this);
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
        if (this.state.editing) {
            this.resetUserInfo();    
        }
        this.setState({ editing: !this.state.editing });
    }

    changeSelectedPanel(e) {
        this.setState({ selectedPanel: e.target.name });
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
                });

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
        if(!this.props.userToken)
            return;

        this.resetUserInfo();
    }

    resetUserInfo() {
        Fire.database().ref(`user/${this.props.userToken.id}`).once('value', snapshot => {
            this.setState({...snapshot.val()});
        });
    }
    

    render() {
        return (
            <>
                {!this.props.userToken && <Redirect to="/login" />}
                <div>
                    <div className="row">
                        <div className="col col-sm-2 pad-top">
                            <div className="card">
                                <img src={this.state.profileURL} className="card-img-top img-thumbnail" alt="Profile" />
                                <div className="card-body">
                                    <h5 className="card-title">{this.state.firstName} {this.state.lastName}</h5>
                                    <p className="card-text">Joined on {(new Date(this.state.timeStamp)).toDateString()}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <button type='button' className="btn btn-outline-info btn-lg btn-block" name='settings' onClick={this.changeSelectedPanel}>User Settings</button>
                                    </li>
                                    <li className="list-group-item">
                                        <button type='button' className="btn btn-outline-info btn-lg btn-block" name='history' onClick={this.changeSelectedPanel}>Purchase History</button>
                                    </li>
                                    <li className="list-group-item">
                                        <button type='button' className="btn btn-outline-info btn-lg btn-block" name='comments' onClick={this.changeSelectedPanel}>Comments</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-sm-10">
                            {
                                this.state.selectedPanel === 'settings' ? 
                                    <UserSetting user={this.state} handleChange={this.handleChange} toggleEditing={this.toggleEditing} submitUpdate={this.submitUpdate}/> :
                                    <h3>{this.state.selectedPanel} not implemented</h3>
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
 
export default UserPage;