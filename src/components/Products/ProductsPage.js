import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
 
class ProductsPage extends React.Component {
     constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.cartPage = this.cartPage.bind(this);
        this.state = {
            modal:false,
        };
    }
    cartPage(){
        this.props.history.push('/cart');
    }
    
    toggle(){
        this.setState({modal:!this.state.modal})
    }
    
    render() {
        return (
            <div>
               <h1>ProductsPage</h1>
                <p>ProductsPage body content. Will have a list of products, have sorting and filtering options, initilized filtering through the query params.</p>
               <Button color="btn btn-light" onClick={this.toggle.bind(this)}>Add to Cart</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} >
        <ModalHeader className="modalheaderAddtoCart" toggle={this.toggle.bind(this)}>Product Name/Pic Added to Cart</ModalHeader>
        <ModalFooter className="modalfooterAddtoCart">
          <Button color="light" onClick={this.cartPage.bind(this)}>Cart</Button>{' '}
          <Button color="warning" onClick={this.toggle.bind(this)}>Proceed to Checkout</Button>
        </ModalFooter>
      </Modal>
            </div>
         );
    }
}
//proceed to checkout button has no page currently, can add later

export default ProductsPage;