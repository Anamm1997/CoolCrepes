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
class ProductsPage extends React.Component {
	constructor(props) {
		super(props);
		//methods
    this.retrieve = this.retrieve.bind(this);
    this.state = {
            productList: [],
        };   
	}
    
    retrieve(){
        this.componentDidMount()
    }
    
	//What method to grab data from database?
	componentDidMount() {
        let list = []
		Fire.database().ref('productTest').on('value', function(snapshot) {
			var pastries = snapshot.val();
            console.log(pastries)
			var keys = Object.keys(pastries);

			for (var i = 0; i < keys.length; i++) {
				var k = keys[i];
				var description = pastries[k].description;
				var price = pastries[k].price;
				var product = pastries[k].product;
				var quantity = pastries[k].quantity;
				var seller = pastries[k].seller;
        let data = [
          product, price, quantity, seller, description
        ]
        console.log(data)
                list.push(data)
			}
		})
         this.setState({
            productList : list,
        });   
	}



	//Learn react here to determine how to interact with page, display table, instead of standard HTML and JS.
    render() {
        return (
            <div>
               <h1>ProductsPage</h1>
                <p>ProductsPage body content. Will have a list of products, have sorting and filtering options, initialized filtering through the query params.</p>

                <button onClick={()=>{ this.retrieve() }}> Button does nothing </button>

         {this.state.productList.map((item,index)=>{ 
             console.log(item)
             console.log(item[0])
             return(
                 <div>
            <p>{item}</p>
            <p>Product: {item[0]}</p>
            <p>Price: {item[1]}</p>
            <p>Quantity: {item[2]}</p>
                 </div>
         )})}
            </div>

         );
    }
}

export default ProductsPage;
