import React from 'react';
import Fire from '../Fire';
import CommentPanel from './CommentPanel';

class Comments extends React.Component{
    constructor(props) {
        super(props);

        this.commentRef = Fire.database().ref('commentTest');
        this.userRef = Fire.database().ref('user');
        
        this.state = {
            comments: [],
            message: ''
        };

        this.loadComments = this.loadComments.bind(this);
        this.sortComments = this.sortComments.bind(this);
        this.createReply = this.createReply.bind(this);
    }

    async createReply(comment, text) {
        let userData = await this.userRef.child(this.props.userToken.id).once('value');
        let user = userData.val();
        
        let reply = {
            text: text,
            userID: this.props.userToken.id,
            userName: `${user.firstName} ${user.lastName}`,
            profileURL: user.profileURL,
            productID: comment.productID,
            productName: comment.productName,
            replys: [],
            timeStamp: Date.now()
        };

        let newComment = this.commentRef.push(reply, error => {
            if(error) {
                console.log(error);
            }
        });

        await this.updateComment(comment, newComment.key)
        // await this.updateUser(this.props.userToken.id, user, newComment.key);

        this.loadComments();
    }

    async updateUser(userId, user, commentId) {
        let commentList = user.comments;
        if (commentList && commentList.length > 0) {
            commentList.push(commentId);
        }
        else {
            commentList = [commentId];
        }


        await this.userRef.child(userId).update({comments: commentList}, error => {
            if(error) {
                console.log(error);
            }
        });
    }

    async updateComment(comment, replyId) {
        let replyList = comment.replys;
        if (replyList && replyList.length > 0) {
            replyList.push(replyId);
        }
        else {
            replyList = [replyId];
        }


        await this.commentRef.child(comment.id).update({replys: replyList}, error => {
            if(error) {
                console.log(error);
            }
        });
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

                replyComments.push({
                    ...data,
                    id: replys[i] 
                });
            }
        }
        return replyComments;
    }

    loadComments() {
        for (let i = 0; i < this.props.comments.length; i++) {
            this.commentRef.child(this.props.comments[i]).once('value', snapshot => {
                let data = snapshot.val();
                if (data) {
                    this.retriveReplys(data.replys).then(replyComments => {
                        let comment = {
                            ...data,
                            replyComments: replyComments,
                            id: snapshot.key
                        };
    
                        this.setState(state => {
                            let commentsList = state.comments;
                            commentsList[i] = comment;
    
                            return {comments: commentsList};
                        });
                    });
                }
            });
            
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

    async componentDidMount() {
        if(!this.props.comments || this.props.comments <= 0) return;

        this.loadComments();
    }

    render() {

        return (
        <div>
            {this.state.comments && this.state.comments.length > 0 ?
                <div>
                    <ul className="list-group">
                        {
                            this.state.comments.map((comment, index) => {
                                return (
                                    <li key={comment.id} className="list-group-item flex-column align-items-start">
                                        <CommentPanel comment={comment} submitReplyHandler={this.createReply}/>
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

export default Comments;