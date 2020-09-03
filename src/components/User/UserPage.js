import React from 'react';
import { Redirect } from 'react-router-dom';
import UserSetting from './UserSettings';
import PurchaseHistory from './PurchaseHistory';
import './User.css'
import Comments from './Comments';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.userRef = null;

        this.state = {
            profileURL: "",
            firstName: "",
            lastName: "",
            purchases: [],
            comments: [],
            timeStamp: null,
            selectedPanel: "settings"
        };

        this.getUserInfo = this.getUserInfo.bind(this);
        this.changeSelectedPanel = this.changeSelectedPanel.bind(this);
        this.updateParent = this.updateParent.bind(this);
    }

    updateParent() {
        this.props.updateHandler();
    }

    changeSelectedPanel(e) {
        this.setState({ selectedPanel: e.target.name });
    }

    getUserInfo(user) {
        this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            profileURL: user.profileURL,
            purchases: user.purchases,
            comments: user.comments,
            timeStamp: user.timeStamp
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
                        <div className="col col-sm-8">
                            {
                                this.state.selectedPanel === 'settings' ? 
                                    <UserSetting userToken={this.props.userToken} userInfoHandler={this.getUserInfo} updateHandler={this.updateParent}/> :
                                this.state.selectedPanel === 'history' ?
                                    // <PurchaseHistory userToken={this.props.userToken} purchases={this.state.purchases}/> :
                                    <PurchaseHistory userToken={this.props.userToken} purchases={['-Mkafih-34-5', '-Mbafre-35-24']}/> :
                                this.state.selectedPanel === 'comments' ?
                                    // <Comments userToken={this.props.userToken} comments={this.state.comments} /> :
                                    <Comments userToken={this.props.userToken} comments={['-MFvT9FlozjAITEmNO1o', '-MFvTNa6rp1z8pdM6UL3', '-MG9cqePkeTXSnANANom']} /> :

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