import React, { useState } from 'react';

function CommentPanel(props) {
    const [showReply, setShowReply] = useState(false);
    const [reply, setReply] = useState('');

    const toggleReplys = () => {
        setShowReply(!showReply);
    }

    const handleReplyChange = e => {
        setReply(e.target.value);
    }

    const submitReply = async e => {
        e.preventDefault();
        props.submitReplyHandler(props.comment, reply);
        setReply('');
    }

    return (
        <div className="card" key={props.comment.id}>
            <div className="card-body">
                <div className="card-title d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                        <img src={props.comment.profileURL} className="img-fluid small-img" alt="Profile"/>
                        {props.comment.userName} @ {props.comment.productName}
                        </h5>
                    <small>{(new Date(props.comment.timeStamp)).toDateString()}</small>
                </div>
                <hr />
                <p className="card-text text-left">{props.comment.text}</p>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Comment..." aria-label="Comment..." aria-describedby="basic-addon2" 
                            name='reply' value={reply} onChange={handleReplyChange}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={submitReply}>Reply</button>
                    </div>
                </div>
                {props.comment.replys && props.comment.replys.length > 0 &&
                    <button className="btn btn-info btn-small" onClick={toggleReplys}>
                        {showReply ? 'Hide replys' : `${props.comment.replys.length} replys`}
                    </button>
                }
                {
                    showReply && props.comment.replys && props.comment.replys.length > 0 &&
                    <ul className="list-group">
                        {props.comment.replyComments.map((reply, index) => {
                            return (
                                <li key={index+reply.id} className="list-group-item flex-column align-items-start">
                                    <CommentPanel comment={reply} submitReplyHandler={props.submitReplyHandler}/>
                                </li>)
                        })}
                    </ul>
                }
            </div>
        </div>
    );
}

export default CommentPanel;