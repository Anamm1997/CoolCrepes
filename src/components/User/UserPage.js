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
        this.userID = "";

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
            this.setState({ editing: false });
        }
        else {
            this.setState({ editing: true });
        }
    }

    changeSelectedPanel(e) {
        this.setState({ selectedPanel: e.target.name });
    }

    submitUpdate(e){
        e.preventDefault();
        this.setState({message: "Submitted"});
        // Fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        //     u.user.updateProfile({
        //         displayName: this.state.firstName
        //     });
        //     this.submitUserToDB(u);


        // })
        // .catch((error) => {
        //     this.setState({message: error.message});
        // });
    }

    componentDidMount() {
        if(!this.props.userToken)
            return;

        this.userRef = Fire.database().ref("user").orderByChild("id").equalTo(this.props.userToken.uid).ref;
        this.userRef.on('value', snapshot => {
            this.userID = Object.keys(snapshot.val())
            snapshot.forEach(data => {
                this.setState({...data.val()});
            });
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
                                    <UserSetting user={this.state} handleChange={this.handleChange} toggleEditing={this.toggleEditing}/> :
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