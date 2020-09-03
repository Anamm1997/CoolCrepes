import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import Fire from './Fire';

class CheckoutModal extends React.Component {
    constructor(props) {
        super(props);   
        this.itemsPurchased = this.itemsPurchased.bind(this);
        this.purchasesRef = Fire.database().ref('purchaseTest');
        this.state = {
            totalPrice:0,
        }
    }
    
     componentDidMount() {
        var prices = 0;
        Fire.database().ref(`cartTest`).on('value',function (snapshot){
            let items = snapshot.val();
            for(let item in items){
                prices = parseFloat(prices) + parseFloat(items[item].price);
            }
        });
        prices = prices.toFixed(2);
        this.setState({
            totalPrice: prices
        });
        console.log(this.state.totalPrice)
    }
    
    itemsPurchased(){
        //add to purchaseTest
        //remove from cartTest
        this.props.history.push('/thanks');
    }

    render(){
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