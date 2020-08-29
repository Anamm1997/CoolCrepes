import React from 'react';

class Comments extends React.Component{

    render() {

        return (
        <div>
            {this.props.comments && this.props.comments.length > 0 ?
                <ul>
                    {this.props.comments.map((history, index) => {
                        return (
                            <li key={index}>
                                {history}
                            </li>
                        )
                    })}
                </ul> 
                :
                <div>
                    No comments avalible
                </div>
    
            }
        </div>
        );
    }
           
}

export default Comments;