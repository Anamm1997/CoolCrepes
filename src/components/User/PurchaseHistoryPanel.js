import React from 'react';

function PurchaseHistoryPanel(props) {
    
    let totalDiscount = 0;
    let totalPrice = 0;

    if (props.purchase.cart) {
        for (let cartId in props.purchase.cart) {
            totalPrice += props.purchase.cart[cartId].price;
            totalDiscount += (props.purchase.cart[cartId].price * props.purchase.cart[cartId].discount);
        }
    }
    
    return (
    <div className="row">
        <div className="col-12">
            <div className="alert alert-primary" role="alert">{(new Date(props.purchase.timeStamp)).toLocaleString()}</div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">Product</th>
                            <th scope="col" className="text-center">Quantity</th>
                            <th scope="col" className="text-right">Price</th>
                            <th scope="col" className="text-left">Saved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.purchase.cart && Object.entries(props.purchase.cart).map(([cartId, item]) => {
                            return (
                                <tr key={props.purchase.id + cartId}>
                                    <td className="align-middle"><img src={item.imageURL} alt={item.productName} className="img-fluid medium-img" /> </td>
                                    <td className="align-middle">{item.productName}</td>
                                    <td className="align-middle">{item.quantity}</td>
                                    <td className="text-right align-middle">{item.price}</td>
                                    <td className="text-left text-success align-middle">- {item.discount * 100}%</td>
                                </tr>
                            );
                        })
                        }
                        
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Sub-Total</td>
                            <td className="text-right">{totalPrice}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total Savings</td>
                            <td className="text-right text-success">-{totalDiscount}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><strong>Total</strong></td>
                            <td className="text-right"><strong>{props.purchase.totalPrice}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}

export default PurchaseHistoryPanel;