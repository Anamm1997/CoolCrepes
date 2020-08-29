import React from 'react';
import Fire from '../Fire';

class Comments extends React.Component{
    constructor(props) {
        super(props);
        this.user = '-MFTSBN1m1w_IzeQAnOZ';
        this.product = '-MFn-pgAHccnS8E5b_iC';
        

        this.commentRef = Fire.database().ref('commentTest');
        this.productRef = Fire.database().ref('productTest');
        this.userRef = Fire.database().ref('user');
        
        this.state = {
            comments: [],
            message: ''
        };

        this.createComment = this.createComment.bind(this);
        this.loadComments = this.loadComments.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getProductInfo = this.getProductInfo.bind(this);
        this.sortComments = this.sortComments.bind(this);
        this.loadReplys = this.loadReplys.bind(this);
    }

    createComment() {
        let randNum = Math.floor(Math.random() * 100);
        let comment = {
            text: `Some Comment #${randNum}`,
            userID: this.user,
            productID: this.product,
            replys: [],
            timeStamp: Date.now()
        }

        let newComment = this.commentRef.push(comment, error => {
            if(error) {
                console.log(error);
            }
            else {
                console.log('Success');
            }
        })

        console.log(newComment);
    }

    async loadReplys(index, id) {
        console.log(this.state.comments[index]);
        console.log(id);
    }

    async loadComments(snapshot) {
        let comments = [];
        let data = snapshot.val();
        
        if (data) {
            for(let key in data) {
                comments.push({
                    ...data[key],
                    id: key
                });
            }
            
            await this.getUserInfo(comments);
            await this.getProductInfo(comments);

            this.setState({
                comments: comments
            });
        }
        else {
            this.setState({ message: 'Error in reading database.'});
        }

    }

    async getUserInfo(comments) {
        for (let i = 0; i < comments.length; i++) {
            let snapshot = await this.userRef.child(comments[i].userID).once('value');
            let data = snapshot.val();
            
            if (data) {
                comments[i].profileURL =  data.profileURL;
                comments[i].userName = `${data.firstName} ${data.lastName}`;
            }else {
                comments[i].profileURL =  '';
                comments[i].userName = 'Name Not Found';
            }
        }
    }

    async getProductInfo(comments) {
        for (let i = 0; i < comments.length; i++) {
            let snapshot = await this.productRef.child(comments[i].productID).once('value');
            if (snapshot.val()) {
                comments[i].productName = snapshot.val().product;
            }else {
                comments[i].productName = 'Product Not Found';
            }
        }
    }

    sortByProducts(data) {
        return data.sort((a, b) => {
            if(a.productName < b.productName) {
                return -1;
            }
            else if(a.productName > b.productName) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }

    sortComments(method) {
        let comments = this.state.comments;

        switch (method) {
            case 'product':
                comments = this.SortByProducts(comments);
                break;
        
            default:
                break;
        }

        this.setState({
            comments: comments
        });
    }

    componentDidMount() {
        this.commentRef.on('value', this.loadComments);
    }

    componentWillUnmount() {
        this.commentRef.off('value', this.loadComments);
    }

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
                    <div>
                        No comments avalible
                        <button className="btn btn-primary" onClick={this.createComment}>Ceate Comment</button>
                    </div>
                    <div>
                        {this.state.comments.map((comment, index) => {
                            return (
                            <div className="card" key={comment.id}>
                                <div className="row no-gutter">
                                    <div className="col col-sm-4">
                                        <img src={comment.profileURL} className="img-fluid" alt="Profile"/>
                                    </div>
                                    <div className="col col-sm-8">
                                        <div className="card-body">
                                            <div className="card-title clearfix">
                                                <span className="float-left px-2 py-1">{comment.userName} @ {comment.productName}</span>
                                                <span className="float-right text-muted px-2 py-1">{(new Date(comment.timeStamp)).toDateString()}</span>
                                            </div>
                                            <hr />
                                            <p className="card-text text-left">{comment.text}</p>
                                            {comment.replys && 
                                                <button className="btn btn-primary" onClick={() => {this.loadReplys(index, comment.id)}}>
                                                    {comment.replys.length} replys
                                                </button>
                                            }
                                        </div>
                                    </div>

                                </div>
                                
                            </div>
                            );}
                        )}
                        <p>{this.state.message}</p>
                    </div>
                </div>
    
            }
        </div>
        );
    }
           
}

export default Comments;