import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

class CheckoutModal extends React.Component {
    constructor(props) {
        super(props);   
        this.itemsPurchased = this.itemsPurchased.bind(this);
    }

    itemsPurchased(){
        this.props.history.push('/thanks');
    }

    render(){
        return(
            <Modal isOpen={this.props.purchase} toggle={this.props.purchased}>
            <ModalHeader className="modalheaderAddtoCart" toggle={this.props.purchased}>Total: $test</ModalHeader>
            <ModalFooter className="modalfooterAddtoCart">
            <Button color="success" onClick={this.itemsPurchased} >Purchase</Button>{' '}
</ModalFooter>
</Modal>
)
}
}

export default CheckoutModal;