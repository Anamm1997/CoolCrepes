import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import Fire from './Fire';
import { Redirect } from 'react-router'

class CheckoutModal extends React.Component {
    constructor(props) {
        super(props);   
        this.itemsPurchased = this.itemsPurchased.bind(this);
        this.purchasesRef = Fire.database().ref('purchaseTest/Test');
        console.log("id for real  "+this.props.userToken.id)
        this.state = {
            currentCart:[],
            totalPrice:0,
            redirect: false,
        }
    }
    
     componentDidMount() {
        var prices = 0;
        const cartItems = [];
        Fire.database().ref(`user/${this.props.userToken.id}/cart`).on('value',function (snapshot){
            let items = snapshot.val();
            for(let item in items){
                cartItems.push({item,...items[item]});
                prices = parseFloat(prices) + parseFloat(items[item].price);
            }
        });
        prices = prices.toFixed(2);
        this.setState({
            currentCart: {cartItems}
        });
        this.setState({
            totalPrice: prices
        });
    }
    
    itemsPurchased(){
        if(this.state.totalPrice == 0){
            alert("Your cart is empty")
           }
        else{
            //add to purchaseTest
            this.purchasesRef.child("cart").push(this.state.currentCart);
            //remove cartTest, basically remove cart
            Fire.database().ref(`user/${this.props.userToken.id}/cart`).remove();
            this.setState({redirect:!this.state.redirect})
        }
    }

    render(){
        if(this.state.redirect){
            return <Redirect to='/thanks'/>;
           }
        return(
            <Modal isOpen={this.props.purchase} toggle={this.props.purchased}>
            <ModalHeader className="modalheaderAddtoCart" toggle={this.props.purchased}>Total: ${this.state.totalPrice}</ModalHeader>
            <ModalFooter className="modalfooterAddtoCart">
            <Button color="success" onClick={this.itemsPurchased.bind(this)} >Purchase</Button>{' '}
</ModalFooter>
</Modal>
)
}
}

export default CheckoutModal;