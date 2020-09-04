import React from 'react';
import CheckoutModal from '../../components/CheckoutModal';
import { Redirect } from 'react-router'
import Fire from '../Fire';
import { Table, Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.cartPage = this.cartPage.bind(this);
        this.purchased = this.purchased.bind(this);
        this.retrieve = this.retrieve.bind(this);
        this.add = this.add.bind(this);
        this.state = {
            modal:false,
            purchase: false,
            redirect: false,
            productList: [],
        };  

    }
    
    cartPage(){
        this.setState({redirect:!this.state.redirect});
    }

    toggle(){
        this.setState({modal:!this.state.modal})
    }
    
    add(items){
        let newitem = {
            'product': (items[0] == undefined) ? "":items[0],
            'price':  (items[1]== undefined) ? "":items[1],
            'quantity':  (items[2]== undefined) ? "":items[2],
            'seller':  (items[3]== undefined) ? "":items[3],
            'description':  (items[4]== undefined) ? "":items[4],
            'image':  (items[5]== undefined) ? "":items[5],
        }
        console.log(newitem)
        Fire.database().ref(`user/${this.props.userToken.id}/cart`).push(newitem, error =>{
            console.log(error)
        })
        this.toggle();
    }
    
    purchased(){
        this.child.componentWillMount()
        this.setState({purchase:!this.state.purchase})
        this.setState({modal:!this.state.modal})
    }

     retrieve(){
        this.componentDidMount()
    }
    
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
                var image = pastries[k].imageURL;
        let data = [
          product, price, quantity, seller, description, image
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
        if(this.state.redirect){
            return <Redirect to='/cart'/>;
           }
        return (
            <div>
            {this.props.userToken ? 
             (
             <div>
            <h1>ProductsPage</h1>
                <button onClick={()=>{ this.retrieve() }}> Display </button>
                <Table>
             		<thead>
             			<tr>
             				<th>#</th>
                            <th>Image</th>
             				<th>Product</th>
             				<th>Price</th>
             				<th>Quantity</th>
             				<th>Seller</th>
             				<th>Description</th>
             				<th>Add to Cart</th>
             			</tr>
             		</thead>
             		<tbody>

         {this.state.productList.map((item,index)=>{ 
             return(

             	<tr>
             		<th scope='row'>1</th>
                    <td><img src={item[5]} className="img-thumbnail shadow-sm" alt="sample image for now"/></td>
             		<td>{item[0]}</td>
             		<td>{item[1]}</td>
             		<td>{item[2]}</td>
             		<td>{item[3]}</td>
             		<td>{item[4]}</td>
                    <td>
             <Button color="btn btn-light" onClick={()=> {this.add(item)}}>Add</Button>
<Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} >
    <ModalHeader className="modalheaderAddtoCart" toggle={this.toggle.bind(this)}>{item[0]} Added to Cart</ModalHeader>
<ModalFooter className="modalfooterAddtoCart">
    <Button color="light" onClick={this.cartPage.bind(this)}>Cart</Button>{' '}
<Button color="warning" onClick={this.purchased.bind(this)}>Proceed to Checkout</Button>
</ModalFooter>
</Modal>
             <CheckoutModal onRef={ref => (this.child = ref)} propId={this.props.userToken.id} purchase={this.state.purchase} purchased={this.purchased.bind(this)}/>
                 </td>
             	</tr>

         )})}
         			</tbody>
         			</Table>
            </div>
             )
             :(
            <div>
            <h1>ProductsPage</h1>
                <button onClick={()=>{ this.retrieve() }}> Display </button>
                <Table>
             		<thead>
             			<tr>
             				<th>#</th>
                            <th>Image</th>
             				<th>Product</th>
             				<th>Price</th>
             				<th>Quantity</th>
             				<th>Seller</th>
             				<th>Description</th>
             				<th>Login to Add to Cart</th>
             			</tr>
             		</thead>
             		<tbody>

         {this.state.productList.map((item,index)=>{ 
             return(

             	<tr>
             		<th scope='row'>1</th>
                    <td><img src={item[5]} className="img-thumbnail shadow-sm" alt="sample image for now"/></td>
             		<td>{item[0]}</td>
             		<td>{item[1]}</td>
             		<td>{item[2]}</td>
             		<td>{item[3]}</td>
             		<td>{item[4]}</td>
             	</tr>

         )})}
         			</tbody>
         			</Table>
            </div>
)
}
</div>
);
}
}

export default ProductsPage;