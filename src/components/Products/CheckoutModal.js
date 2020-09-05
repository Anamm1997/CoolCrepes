import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import Fire from '../Fire';
import { Redirect } from 'react-router'

class CheckoutModal extends React.Component {
    constructor(props) {
        super(props);  
        this.itemsPurchased = this.itemsPurchased.bind(this);
        this.purchasesRef = Fire.database().ref(`user/${this.props.propId}/purchase`);
        this.GetCart = this.GetCart.bind(this);
        this.state = {
            currentCart:[],
            totalPrice:0,
            redirect: false,
        }
    }
    
    componentWillMount() {
        this.props.onRef(this)
        Fire.database().ref(`user/${this.props.propId}/cart`).on('value', this.GetCart.bind(this));
    }
    
    componentWillUnmount() {
        Fire.database().ref(`user/${this.props.propId}/cart`).off('value', this.GetCart.bind(this));
    }
    
    GetCart(snapshot) {
        let items = snapshot.val();
        let prices = 0;
        for(let item in items){
            prices += (parseFloat(items[item].price) * parseInt(items[item].quantity)*(1 - parseFloat(items[item].discount)));
        }
        prices = prices.toFixed(2);
        this.setState({
            currentCart: items,
            totalPrice: prices
        });
    }
    
    async itemsPurchased(){
        if(this.state.totalPrice === 0){
            alert("Your cart is empty")
        }
        else{
            let purchasedCart = {
                cart: this.state.currentCart,
                timeStamp: Date.now(),
                totalPrice: this.state.totalPrice,
                userID:this.props.propId
            }
            console.log(purchasedCart)
            //add to purchase
            let userPurchases= (await Fire.database().ref(`user/${this.props.propId}/purchases`).once('value')).val();
            let purchaseRef = Fire.database().ref(`purchase`).push(purchasedCart, error => {
                if(error) {
                    console.log(error);
                }
            });
            if(!userPurchases) {userPurchases = []}
            userPurchases.push(purchaseRef.key);

            Fire.database().ref(`user/${this.props.propId}`).update({purchases: userPurchases}, error => {
                if(error) {
                    console.log(error);
                }
            });
            
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
