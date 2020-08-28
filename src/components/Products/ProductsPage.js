import React from 'react';
import ReactDOM from 'react-dom';
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

	render() {
    	return (
      		<button
        		className="square"
        		onClick={() => this.setState({value: 'X'})}
      		>
        	{this.state.value}
      		</button>
    	);
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
		var productArray = new Array();
		Fire.database().ref('productTest').on('value', function(snapshot) {
			var pastries = snapshot.val();
			var keys = Object.keys(pastries);

			for (var i = 0; i < keys.length; i++) {
				var k = keys[i];
				var description = pastries[k].description;
				var price = pastries[k].price;
				var product = pastries[k].product;
				var quantity = pastries[k].quantity;
				var seller = pastries[k].seller;
				let item  = {  //?
					product, price, quantity, seller, description
				};
				productArray.push(item);
			}
			//console.log(productArray)
			//{productArray.map((item,index)=>{return(<li>item</li>)})};
			//this.setState({productArray});
			//const element = (
    		//	<div>
      		//		<h1>Hello, world!</h1>
      		//		<h2>productArray</h2>
    		//	</div>
  			//);
			//ReactDOM.render(
			//	element,
			//	document.getElementById('root')
			//)
		});
		return productArray;
		//return productArray.map((item) => <li>{item}</li>);
	}

	renderSquare(i) {
    	return <Square value={i} />;
  	}

	//Learn react here to determine how to interact with page, display table, instead of standard HTML and JS.
    render() {
    	let data = this.retrieve();
    	console.log(data) //NOT AN ARRAY. "Indices" are keys.
    	//var pastries = data.val();
		//var keys = Object.keys(pastries);
    	//c/onsole.log(pastries);
    	//console.log(keys);
    	//console.log(data[0].price);
    	//for loop - loop through data
    	//for (item in data) {
    	//	console.log(item);
    	//}
    	//create element 
    	//append to existing table or div...
    	//const items = data.map((item) =>
        //<li key={item.product}>{item.description}</li>
        return (
        	<React.Fragment>
            	<div>
               	<h1>ProductsPage</h1>
                	<p>ProductsPage body content. Will have a list of products, have sorting and filtering options, initialized filtering through the query params.</p>
            	</div>
       			this.retrieve()
            </React.Fragment>
       	);
    }
}

//<p> <textarea className = "Description" type="text" value={this.state.description} onChange={this.retrieve().bind(this)} /> </p>
/*
const listItems = data.map((property) =>
    		<li>{property}</li>
    	);
    	ReactDOM.render(
  			<ul>{listItems}</ul>,
  			document.getElementById('root')
		);
<ul>{listItems}</ul>

<ul>
    				{items}
				</ul>
*/
 
export default ProductsPage;