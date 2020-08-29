import React from 'react';

class PurchaseHistory extends React.Component {

    render() {

        return (
        <div>
            {this.props.purchases && this.props.purchases.length > 0?
                <ul>
                    {this.props.purchases.map((history, index) => {
                        return (
                            <li key={index}>
                                {history}
                            </li>
                        )
                    })}
                </ul> 
                :
                <div>
                    No history avalible
                </div>
    
            }
        </div>
        );
    }
           
}

export default PurchaseHistory;