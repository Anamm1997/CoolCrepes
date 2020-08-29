import React from 'react';
//import CSS page
import Fire from '../Fire';
import { Table } from 'reactstrap';

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

    render() {
        return (
            <div>
               <h1>ProductsPage</h1>
                <p>ProductsPage body content. Will have a list of products, have sorting and filtering options, initialized filtering through the query params.</p>

                <button onClick={()=>{ this.retrieve() }}> Display </button>
                <Table bordered>
             		<thead>
             			<tr>
             				<th>#</th>
             				<th>item</th>
             				<th>product</th>
             				<th>price</th>
             			</tr>
             		</thead>
             		<tbody>

         {this.state.productList.map((item,index)=>{ 
             console.log(item)
             console.log(item[0])
             return(

             	<tr>
             		<th scope='row'>1</th>
             		<td>{item}</td>
             		<td>{item.product}</td>
             		<td>{item.price}</td>
             	</tr>

                 /*<div>
            		<p>{item}</p>
            		<p>Product: {item[0]}</p>
            		<p>Price: {item[1]}</p>
            		<p>Quantity: {item[2]}</p>
                 </div>*/

         )})}
         			</tbody>
         			</Table>
            </div>

         );
    }
}
/*
<div>
<p>{item} {item.product} {item.price}</p>
 </div>
*/
export default ProductsPage;
