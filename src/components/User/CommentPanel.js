import React from 'react';

function CommentPanel(props) {
    return (
        <div className="card" key={props.comment.id}>
            <div className="card-body">
                <div class="card-title d-flex w-100 justify-content-between">
                    <h5 class="mb-1">
                        <img src={props.comment.profileURL} className="img-fluid small-img" alt="Profile"/>
                        {props.comment.userName} @ {props.comment.productName}
                        </h5>
                    <small>{(new Date(props.comment.timeStamp)).toDateString()}</small>
                </div>
                {/* <div className="card-title clearfix">
                    <span className="float-left px-2 py-1">{props.comment.userName} @ {props.comment.productName}</span>
                    <span className="float-right text-muted px-2 py-1">{(new Date(props.comment.timeStamp)).toDateString()}</span>
                </div> */}
                <hr />
                <p className="card-text text-left">{props.comment.text}</p>
                {
                    props.comment.replys &&
                    <ul className="list-group">
                        {props.comment.replyComments.map((reply, index) => {
                            return (
                                <li key={index+reply.id} className="list-group-item flex-column align-items-start">
                                    <CommentPanel comment={reply}/>
                                </li>)
                        })}
                    </ul>
                }
            </div>
        </div>
    );
}

export default CommentPanel;