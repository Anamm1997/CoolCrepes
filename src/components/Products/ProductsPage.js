import React from 'react';
//import CSS page
import Fire from '../Fire';
//import * as admin from firebase-admin;

/*/Import Admin SDK
var admin = require('firebase-admin');
try {
    admin.initializeApp();
} catch(error) {
    //TODO: ignoring until firebase-functions fix released
    console.log('Initialize not working.');
}

//Get a database reference to our posts
var db = admin.database()
var ref = db.ref(''); //Url for our database goes in here?

//Attach an asynchronous callback to read the data at our posts reference - https://firebase.google.com/docs/database/admin/retrieve-data#node.js
ref.on('value', function(snapshot) {
	console.log(snapshot.val());
}, function(errorObject) {
	console.log('The read failed: ' + errorObject.code);
});*/
class Square extends React.Component {
  	constructor(props) {
   		super(props);
    	this.state = {
      		value: null,
    	};
	}
}

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
	retrieve() {
		Fire.database().ref('test').on('value', function(snapshot) {
			console.log(snapshot);
		});
	}

	renderSquare(i) {
    	return <Square value={i} />;
  	}

	//Learn react here to determine how to interact with page, display table, instead of standard HTML and JS.
    render() {
    	this.retrieve();
        return (
            <div>
               <h1>ProductsPage</h1>
                <p>ProductsPage body content. Will have a list of products, have sorting and filtering options, initialized filtering through the query params.</p>
                <table id='products'></table>
                <label>Product Name <input className="ProductName"type="text" placeholder="Type Product Here" /></label>
                <Square value={1}/>
            </div>
         );
    }
}
 
export default ProductsPage;