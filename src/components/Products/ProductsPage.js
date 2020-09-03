import React from 'react';
import CheckoutModal from '../../components/CheckoutModal';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { Redirect } from 'react-router'
import Fire from '../Fire';

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.cartPage = this.cartPage.bind(this);
        this.purchased = this.purchased.bind(this);
        this.retrieve = this.retrieve.bind(this);
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
        if(this.state.redirect){
            return <Redirect to='/cart'/>;
           }
        return (
            <div>
            {this.props.userToken ? 
             (
             <div>
             <Button color="btn btn-light" onClick={this.toggle.bind(this)}>Add to Cart</Button>
<Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} >
    <ModalHeader className="modalheaderAddtoCart" toggle={this.toggle.bind(this)}>Product Name/Pic Added to Cart</ModalHeader>
<ModalFooter className="modalfooterAddtoCart">
    <Button color="light" onClick={this.cartPage.bind(this)}>Cart</Button>{' '}
<Button color="warning" onClick={this.purchased.bind(this)}>Proceed to Checkout</Button>
</ModalFooter>
</Modal>
             <CheckoutModal onRef={ref => (this.child = ref)} propId={this.props.userToken.id} purchase={this.state.purchase} purchased={this.purchased.bind(this)}/>
                </div>)
             :(
            <div>
            <h1>ProductsPage</h1>
            <p>ProductsPage body content. Will have a list of products, have sorting and filtering options, initilized filtering through the query params.</p>
</div>
)
}
</div>
);
}
}
//proceed to checkout button has no page currently, can add later

export default ProductsPage;