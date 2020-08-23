import React from 'react';
//import CSS page
import Fire from '../Fire';

//Import Admin SDK
var admin = require('firebase-admin');

//Get a database reference to our posts
var db = admin.database()
var ref = db.ref(''); //Url for our database goes in here?

//Attach an asynchronous callback to read the data at our posts reference - https://firebase.google.com/docs/database/admin/retrieve-data#node.js
ref.on('value', function(snapshot) {
	console.log(snapshot.val());
}, function(errorObject) {
	console.log('The read failed: ' + errorObject.code);
});

class ProductsPage extends React.Component {
	constructor(props) {
		super(props);
		//methods

		this.state={
			Product:"",
			Price:""
		}
	}

	//What method to grab data from database?

	//Learn react here to determine how to interact with page, display table, instead of standard HTML and JS.
    render() {
        return (
            <div>
               <h1>ProductsPage</h1>
                <p>ProductsPage body content. Will have a list of products, have sorting and filtering options, initilized filtering through the query params.</p>
                <table id='products'></table>
            </div>
         );
    }
}
 
export default ProductsPage;