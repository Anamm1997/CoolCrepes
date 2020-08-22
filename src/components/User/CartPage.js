import React from 'react';
import { Table, Jumbotron, Container, Card, CardBody, CardTitle } from 'reactstrap';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.checkout = this.checkout.bind(this);
    }
    checkout(){
        alert("Thank you for Shopping");//change to modal later maybe
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
                        <tr>
                        <td className="flex-row">
                            <img src="https://resources.matcha-jp.com/original/2019/12/09-92536.jpeg" className="img-thumbnail shadow-sm" alt="sample image for now"/>
                            <div className="ml-3 text-dark font-weight-bold">Pikachu Cupcake</div>
                        </td>
                        <td className="align-middle">10</td>
                        <td className="align-middle">$5.99</td>
                        <td className="align-middle"><a href="" type="button" className="removeItem"> Remove item </a></td>
                        </tr>
                        <tr>
                        <td className="flex-row"> 
                            <img src="https://kirbiecravings.com/wp-content/uploads/2019/04/cherry-blossom-raindrop-cake-19.jpg"  className="img-thumbnail shadow-sm" alt="sample image for now"/>
                            <div className="ml-3 text-dark font-weight-bold">Cherry Blossom Raindrop Cake</div>
                        </td>
                        <td className="align-middle">9000</td>
                        <td className="align-middle">$10.50</td>
                        <td className="align-middle"><a href="" type="button" className="removeItem"> Remove item </a></td>
                        </tr>
                        <tr>
                        <td className="flex-row">
                            <img src="https://i.pinimg.com/originals/0d/6e/f3/0d6ef39aae6e6b3ae8623eba63fbdc33.jpg"  className="img-thumbnail shadow-sm " alt="sample image for now"/>
                            <div className="ml-3 text-dark font-weight-bold">Disney Cheesecake</div>
                        </td>
                        <td className="align-middle">200</td>
                        <td className="align-middle">$6.50</td>
                        <td className="align-middle"><a href="/" type="button" className="removeItem"> Remove item </a></td>
                        </tr>
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