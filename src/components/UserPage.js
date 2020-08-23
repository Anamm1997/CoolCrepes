import React from 'react';
//import CSS page
import Fire from './Fire';

class UserPage extends React.Component {
	constructor(props) {
		super(props);
		//methods

		this.state={
			Product:"",
			Price:""
		}
	}

	//methods

	render() {
		//Renders stuff
		return(
			<React.Fragment>
				<h1>Your Added Products for Sale</h1>
				<div>
				</div>
			</React.Fragment>);
	}
}

export default UserPage;