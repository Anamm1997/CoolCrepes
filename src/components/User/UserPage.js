import React from 'react';
import { Redirect } from 'react-router-dom';
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

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.userRef = null;

        this.state = {...initialUser};
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    componentDidMount() {
        if(!this.props.userToken)
            return;

        let userRef = Fire.database().ref("user").orderByChild("id").equalTo(this.props.userToken.uid).ref;
        userRef.on('value', snapshot => {
            snapshot.forEach(key => {
                this.setState({...key.val()});
            });
        });

    }

    render() {
        return (
            <>
                {!this.props.userToken && <Redirect to="/login" />}
                <div>
                    <h1>UserPage</h1>
                    <p>UserPage body content. Will have browsing history and user settings</p>
                </div>
            </>
        );
    }
}
 
export default UserPage;