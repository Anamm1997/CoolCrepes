import React from 'react';
import { Table, Jumbotron, Container, Card, CardBody, Button, Input,InputGroup } from 'reactstrap';
import Fire from '../Fire';
import CheckoutModal from '../../components/CheckoutModal';

//change Test to this.props.userToken.id
//change ref url to cartTest to test remove
//Final should be something like this user/${this.props.userToken.id}/Cart
//user/${this.props.userToken.id}/Cart/${e}
//user/${this.props.userToken.id}/Cart/${item}/${quantity}
//const item = Fire.database().ref(`user/Test/Cart/`);

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.checkout = this.checkout.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.state = {
            itemsList: [],
            checkout: false,
        };    
    }

    componentDidMount() {
        const firebaseList = [];
        Fire.database().ref(`user/${this.props.userToken.id}/cart`).on('value',function (snapshot){
            let items = snapshot.val();
            for(let item in items){
                firebaseList.push({item,...items[item]});
            }
        });
        this.setState({
            itemsList: firebaseList
        });
    }

    checkout(e){
        this.setState({checkout:!this.state.checkout})
        this.child.componentWillMount()
    }

    removeItem(e){   
        const item = Fire.database().ref(`user/${this.props.userToken.id}/cart/${e}`);
        item.remove().then(() => {
                this.componentDidMount();
                console.log(e + ' successfully deleted!')
            }).catch(function(error) {
                console.error(error)
            });
    }
    
    updateQuantity(item,quantity,change){
            if (change === "decrease" && quantity!=1){
                quantity-=1;
            }
            else if (change === "increase"){
                quantity+=1;
            }
            Fire.database().ref(`user/${this.props.userToken.id}/cart/${item}`).update({'quantity':quantity})
            this.child.componentWillMount()
            this.componentDidMount();
        }
    
    render() {
        return (
            <div>
            <Jumbotron fluid className="py-5">
            <Container fluid>
            <h1 className="display-3">Shopping Cart</h1>
            </Container>
            </Jumbotron>
            <div className="container-fluid">
            <div className="row">
            <Table className="col-lg-8 m-4">
            <thead>
            <tr>
            <th className="text-left">Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
            </tr>
            </thead>

            <tbody>

            {this.state.itemsList.map((item,index)=>{
            let itemPrice = parseFloat(item.price)*parseInt(item.quantity);
            itemPrice = itemPrice.toFixed(2);
            return(
                <tr>
                <td className="flex-row">
                <img src={item.imageURL} className="img-thumbnail shadow-sm" alt="sample image for now"/>
                <div className="ml-3 text-dark font-weight-bold">{item.item}</div>
                </td>

                <td className="align-middle">
                <InputGroup className="d-flex justify-content-center">
                          <Input type="button" value="-" className="minusButton btn btn-outline-danger col-2" onClick={() => {this.updateQuantity(item.item,item.quantity,"decrease")}} />
                          
                    <Input type="number" className="col-2 bg-white" value={item.quantity}  disabled="true"/>

                        <Input type="button" value="+" className="btn btn-outline-success col-2"onClick={() => {this.updateQuantity(item.item,item.quantity,"increase")}} />
                    </InputGroup>
                </td>

                <td className="align-middle">${itemPrice}</td>

                <td className="align-middle"><a type="button" onClick={() => {this.removeItem(item.item)}}> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg> </a></td>
        </tr>
        )})}

            </tbody>
</Table>
<Card tag="a" onClick={this.checkout.bind(this)} className="cardHoverGradientColor col-lg-3 h-25 d-inline-block" style={{marginTop: "1.2%",padding:"0px"}}>
    <CardBody className="cardBodyHoverGradientColor">
    <h3>Checkout</h3>
</CardBody>
</Card>
</div>
</div>
<CheckoutModal onRef={ref => (this.child = ref)} propId={this.props.userToken.id} purchase={this.state.checkout} purchased={this.checkout.bind(this)}/>
</div>
);
}
}

export default CartPage;