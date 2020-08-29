import React from 'react';
import { Table, Jumbotron, Container, Card, CardBody, CardTitle, Button } from 'reactstrap';
import Fire from '../Fire';
//change Test to this.props.userToken.id
//change ref url to cartTest to test remove
class CartPage extends React.Component {

    constructor(props) {
        super(props);
        this.checkout = this.checkout.bind(this);
        this.removeItem = this.removeItem.bind(this)
        this.state = {
            itemsList: []
        };    
    }

    componentDidMount() {
        const firebaseList = [];
        Fire.database().ref(`user/Test/Cart`).on('value',function (snapshot){
            let items = snapshot.val();
            for(let item in items){
                firebaseList.push({item,...items[item]});
            }
        });
        this.setState({
            itemsList: firebaseList
        });
    }

    checkout(){
        alert("Thank you for Shopping");//change to modal later maybe
    }

    removeItem(e){   
        const item = Fire.database().ref(`user/Test/Cart/${e}`);
        item.remove().then(() => {
            // usersRef.delete().then(() => {
                this.componentDidMount();
                console.log(e + ' successfully deleted!')
            }).catch(function(error) {
                console.error(error)
            });
    }

    render() {
        return (
            <div>
            <Jumbotron fluid className="py-5">
            <Container fluid>
            <h1 class="display-3">Shopping Cart</h1>
            </Container>
            </Jumbotron>
            <div class="container-fluid">
            <div class="row">
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
            return(
                <tr>
                <td className="flex-row">
                <img src={item.imageURL} className="img-thumbnail shadow-sm" alt="sample image for now"/>
                <div className="ml-3 text-dark font-weight-bold">{item.productName}</div>
                </td>

                <td className="align-middle">{item.quantity}</td>
                <td className="align-middle">{item.price}</td>

                <td className="align-middle"><a type="button" onClick={() => {this.removeItem(item.item)}}> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg> </a></td>
        </tr>
        )})}

            </tbody>
</Table>
<Card tag="a" onClick={this.checkout.bind(this)} className="col-lg-3 h-25 d-inline-block" style={{marginTop: "1.2%",padding:"0px"}}>
    <CardBody>
    <h3>Total : TotalCost</h3>
<CardTitle>Checkout</CardTitle>
</CardBody>
</Card>
</div>
</div>
</div>
);
}
}

export default CartPage;
