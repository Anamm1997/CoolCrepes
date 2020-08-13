import React from 'react';
import Fire from './Fire';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        Fire.auth().signOut();
    }
    
    render() {
        return (
            <div>
            <button className="btn-lg btn-light" onclick={this.logout}>Logout</button>
            <h1>HomePage</h1>
            <p>Home page body content</p>
            </div>
        );
    }
}

export default HomePage; 