import React from 'react';
import CheckoutModal from './CheckoutModal';
import { Redirect } from 'react-router'
import Fire from '../Fire';
import { Table, Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

class FeaturedPage extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.cartPage = this.cartPage.bind(this);
        this.purchased = this.purchased.bind(this);
        this.add = this.add.bind(this);

        this.retrievePastries = this.retrievePastries.bind(this);
        this.readUserCart = this.readUserCart.bind(this);

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
        let quantity = 1;
        if(Object.keys(this.state.userCart).includes(items.id)) {
            quantity = 1 + this.state.userCart[items.id].quantity;
        }

        let cartItem = {...this.state.userCart};
        cartItem[items.id] = {
            quantity: quantity,
            price: items.price,
            productName: items.productName,
            imageURL: items.imageURL,
            discount: items.discount
        };
         
        Fire.database().ref(`user/${this.props.userToken.id}`).update({cart: cartItem}, error => {
            if(error) {
                console.log(error);
            }
        });
        this.toggle();
        this.child.componentWillMount()
    }

    purchased(){
        this.setState({purchase:!this.state.purchase})
        this.setState({modal:!this.state.modal})
    }

    retrievePastries(snapshot) {
        var pastries = snapshot.val();
        let data = [];

        for(let key in pastries) {
            if(pastries[key].isFeatured === true){
                data.push({id: key, ...pastries[key]});
            }
        }

        this.setState({
            productList : data,
        });
    }

    readUserCart(snapshot) {
        let user = snapshot.val();
        if(user && user.cart) {
            this.setState({userCart: user.cart});
        }
        else{
            this.setState({userCart: {}});
        }

    }

    componentDidMount() {
        Fire.database().ref('product').on('value', this.retrievePastries);   
        if(this.props.userToken) {
            Fire.database().ref(`user/${this.props.userToken.id}`).on('value', this.readUserCart);
        }
    }

    componentWillUnmount() {
        Fire.database().ref('product').off('value', this.retrievePastries);
        if(this.props.userToken) {
            Fire.database().ref(`user/${this.props.userToken.id}`).off('value', this.readUserCart);
        }
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
                
                <Table>
             		<thead>
             			<tr>
             				<th>#</th>
                            <th>Image</th>
             				<th>Product</th>
             				<th>Price</th>
             				<th>Discount</th>
             				<th>Quantity</th>
             				<th>Description</th>
             				<th>Add to Cart</th>
             			</tr>
             		</thead>
             		<tbody>
                        {this.state.productList.map((item,index)=>{ 
                            if (!item.isSelling) {
                                return null;
                            }
                            else {
                                return(
                                    <tr key={item.id}>
                                        <th scope='row'>1</th>
                                        <td><img src={item.imageURL} className="img-thumbnail shadow-sm" alt="sample image for now"/></td>
                                        <td>{item.productName}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td className='text-success'>-{item.discount * 100}%</td>
                                        <td>{item.stockQuantity}</td>
                                        <td>{item.description}</td>
                                        <td>
                                        <Button color="btn btn-light" onClick={()=> {this.add(item)}}>Add</Button>
                                        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} >
                                            <ModalHeader className="modalheaderAddtoCart" toggle={this.toggle.bind(this)}>Product Added to Cart</ModalHeader>
                                            <ModalFooter className="modalfooterAddtoCart">
                                                <Button color="light" onClick={this.cartPage.bind(this)}>Cart</Button>{' '}
                                                <Button color="warning" onClick={this.purchased.bind(this)}>Proceed to Checkout</Button>
                                            </ModalFooter>
                                        </Modal>
                                        <CheckoutModal onRef={ref => (this.child = ref)} propId={this.props.userToken.id} purchase={this.state.purchase} purchased={this.purchased.bind(this)}/>
                                    </td>
                                    </tr>

                                )
                            }
                        }
                        )}
         			</tbody>
         			</Table>
            </div>
             )
             :(
            <div>
            <h1>ProductsPage</h1>

                <Table>
             		<thead>
             			<tr>
             				<th>#</th>
                            <th>Image</th>
             				<th>Product</th>
             				<th>Price</th>
             				<th>Discount</th>
             				<th>Quantity</th>
             				<th>Description</th>
             				<th>Login to Add to Cart</th>
             			</tr>
             		</thead>
             		<tbody>

         {this.state.productList.map((item,index)=>{
             return(

                <tr key={item.id}>
                    <th scope='row'>1</th>
                    <td><img src={item.imageURL} className="img-thumbnail shadow-sm" alt="sample image for now"/></td>
                    <td>{item.productName}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td className='text-success'>-{item.discount * 100}%</td>
                    <td>{item.stockQuantity}</td>
                    <td>{item.description}</td>
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

export default FeaturedPage;
