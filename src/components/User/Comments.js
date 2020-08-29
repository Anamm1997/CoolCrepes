import React from 'react';
import Fire from '../Fire';
import CommentPanel from './CommentPanel';

class Comments extends React.Component{
    constructor(props) {
        super(props);

        this.commentRef = Fire.database().ref('commentTest');
        this.productRef = Fire.database().ref('productTest');
        this.userRef = Fire.database().ref('user');
        
        this.state = {
            comments: [],
            message: ''
        };

        this.createComment = this.createComment.bind(this);
        this.loadComments = this.loadComments.bind(this);
        this.sortComments = this.sortComments.bind(this);
        this.loadReplysHandler = this.loadReplysHandler.bind(this);
    }

    createComment() {
        let randNum = Math.floor(Math.random() * 100);
        let comment = {
            text: `Some Comment #${randNum}`,
            userID: '-MFTSBN1m1w_IzeQAnOZ',
            userName: 'Mahfuz Anam',
            profileURL: "https://firebasestorage.googleapis.com/v0/b/coolcrepe-d97ac.appspot.com/o/profileImages%2Fanamm9510%40gmail.comicon_mountain.png?alt=media&token=b706ac65-a6c2-43e4-babc-cb585daa1a82",
            productID: '-MFn-pgAHccnS8E5b_iC',
            productName: "Pinapple",
            replys: [
                '-MFvSh6TzU_wAk7CxFne',
                '-MFvSvnIcMRdwZ6ZDMqy'
            ],
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

        console.log(newComment.path.pieces_[1]);
    }

    async loadReplysHandler(index, id) {
        console.log(this.state.comments[index]);  
    }

    async retriveReplys(replys) {
        if (!replys)
            return []
        
        let replyComments = [];
        for(let i = 0; i < replys.length; i++) {
            let snapshot = await this.commentRef.child(replys[i]).once('value');
            let data = snapshot.val();
            if (data) {
                if (data.replys) {
                    data['replyComments'] = await this.retriveReplys(data.replys);
                }

                replyComments.push(data);
            }
        }
        return replyComments;
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

            for (let i = 0; i < comments.length; i++) {
                comments[i]['replyComments'] = await this.retriveReplys(comments[i].replys);
            }

            this.setState({
                comments: comments
            });
        }
        else {
            this.setState({ message: 'Error in reading database.'});
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
                        <ul className="list-group">
                            {
                                this.state.comments.map((comment, index) => {
                                    return (
                                        <li key={comment.id} className="list-group-item flex-column align-items-start">
                                            <CommentPanel comment={comment} />
                                        </li>
                                        )
                                })
                            }
                        </ul>
                        <p>{this.state.message}</p>
                    </div>
                </div>
    
            }
        </div>
        );
    }
           
}

export default Comments;