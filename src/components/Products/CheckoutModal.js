import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import Fire from '../Fire';
import { Redirect } from 'react-router'

class CheckoutModal extends React.Component {
    constructor(props) {
        super(props);  
        this.itemsPurchased = this.itemsPurchased.bind(this);
        this.purchasesRef = Fire.database().ref(`user/${this.props.propId}/purchase`);
        this.state = {
            currentCart:[],
            totalPrice:0,
            redirect: false,
        }
    }

    componentWillMount() {
        this.props.onRef(this)
        var prices = 0;
        const cartItems = [];
        Fire.database().ref(`user/${this.props.propId}/cart`).on('value',function (snapshot){
            let items = snapshot.val();
            for(let id in items){
                cartItems.push({id,...items[id]});
                prices = parseFloat(prices) + (parseFloat(items[id].price) * parseFloat(items[id].quantity));
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

    async itemsPurchased(){
        if(this.state.totalPrice == 0){
            alert("Your cart is empty")
        }
        else{
            let cartObj = {};
            console.log(this.state.currentCart)
            for(let i = 0; i <= this.state.currentCart; i++) {
                let cart = this.state.currentCart[i];
                cartObj[cart.id] = {
                    quantity: cart.quantity,
                    price: cart.price,
                    productName: cart.productName,
                    imageURL: cart.imageURL,
                    discount: cart.discount
                };
            }
            console.log("cartobg"+cartObj)
            let purchasedCart = {
                cart: cartObj,
                timeStamp: Date.now(),
                totalPrice: this.state.totalPrice,
                userID:this.props.propId
            }
            console.log("purchased cart"+purchasedCart)
            //add to purchase
            let userPurchases= (await Fire.database().ref(`user/${this.props.propId}`).once('value')).val().purchase;
            let purchaseRef = Fire.database().ref(`purchase`).push(purchasedCart)
            if(!userPurchases) {userPurchases = []}
            userPurchases.push(purchaseRef.key);

            //remove cart
            Fire.database().ref(`user/${this.props.propId}/cart`).remove();
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