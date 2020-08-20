import React from 'react';
import Fire from './Fire';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {  
        let user = Fire.auth().currentUser;
        if (user) {
            Fire.auth().signOut();
            alert("Logout Success");
            this.props.history.push('/');
        } else {
            alert("No user is logged in");
        }
    }

    render() {
        return (
            <div>
                <button className="btn-lg btn-light" onClick={this.logout.bind(this)}>Logout</button>
                <h1>HomePage</h1>
                <p>Home page body content</p>
            </div>
        );
    }
}

export default HomePage;
