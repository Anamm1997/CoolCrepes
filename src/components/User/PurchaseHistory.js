import React from 'react';
import Fire from '../Fire';
import PurchaseHistoryPanel from './PurchaseHistoryPanel';

class PurchaseHistory extends React.Component {
    constructor(props) {
        super(props);

        this.purchasesRef = Fire.database().ref('purchaseTest');
        this.userRef = Fire.database().ref('user');
        
        this.state = {
            purchases: [],
            message: ''
        };

        this.loadHistory = this.loadHistory.bind(this);
    }

    async loadHistory() {
        let purchasesList = []
        for (let i = 0; i < this.props.purchases.length; i++) {
            let snapshot = await this.purchasesRef.child(this.props.purchases[i]).once('value');
            let purchase = snapshot.val();

            if(purchase) {
                purchasesList.push({
                    ...purchase,
                    id: snapshot.key
                });
            }
        }

        this.setState({ purchases: purchasesList });
    }

    componentDidMount() {
        if (!this.props.purchases || this.props.purchases.length <= 0) return;

        this.loadHistory();
    }

    render() {

        return (
        <div>
            {this.state.purchases && this.state.purchases.length > 0 ?
                <div>
                    <ul className="list-group">
                        {
                            this.state.purchases.map((purchase, index) => {
                                return (
                                    <li key={purchase.id} className="list-group-item flex-column align-items-start">
                                        <PurchaseHistoryPanel purchase={purchase}/>
                                    </li>
                                    )
                            })
                        }
                    </ul>
                    <p>{this.state.message}</p>
                </div>
                :
                <div className="alert alert-primary" role="alert">
                    No comment history avalible for user.
                </div>
    
            }
        </div>
        );
    }
           
}

export default PurchaseHistory;