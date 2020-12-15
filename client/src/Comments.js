import React, { Component } from 'react'
import { UpOne, DownOne, Report, Delete, EmotionHappy } from '@icon-park/react'
import { Row } from 'reactstrap'
import './css/Comments.css'
import { connect } from 'react-redux'

class Comments extends Component {
    state = {
        loading: true
    }

    reportComment = (e, id) => {
        try {
            e.preventDefault()
            fetch('/api/comment/' + id + '/report', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
            })
            alert('Thank you for your feedback. Our admins will soon handle it :)')
        }catch (err) {
            console.log(err)
        } 
    }

    render() {
        const comments = this.props.comments
        const commentList = comments.length && !this.props.loading ? (
            comments.map((comment, index) => {
            return (
                <div className="indComment" key={index}>
                    <div className="commentProfile">
                        {!this.props.admin && <img className="commentProfilePic" src={comment.profilePic} alt="profile"></img>}
                        <h4 className="commentHeader">{comment.author}</h4>
                    </div>
                    <div>
                        <p className="commentText">{comment.content}</p>
                    </div>
                    <div className="commentButtons">
                        {this.props.admin ? 
                        <Row>
                            <button className="commentButton deleteBtn" onClick={(e) => this.props.deleteComment(e, comment.id)}>
                                <Delete theme="outline" size="18" fill="#ffffff" /> {" "}
                                Delete
                            </button>
                            <button className="commentButton okBtn" onClick={(e) => this.props.unreportComment(e, comment.id)}>
                                <EmotionHappy theme="outline" size="18" fill="#ffffff" /> {" "}
                                Mark as ok
                            </button>
                        </Row>
                        : <div>
                            <button className="commentButton" onClick={() => this.props.toggleVote(comment.upvoted, comment.downvoted, 'upvote', comment.id, index)}>
                                {comment.upvoted ? <UpOne theme="filled" size="24" fill="#333"/> : <UpOne theme="outline" size="24" fill="#333" />}
                            </button>
                            <p className='commentButton'>{comment.votes}</p>
                            <button className="commentButton" onClick={() => this.props.toggleVote(comment.upvoted, comment.downvoted, 'downvote', comment.id, index)}>
                                {comment.downvoted ? <DownOne theme="filled" size="24" fill="#333"/> : <DownOne theme="outline" size="24" fill="#333" />}
                            </button>
                            <button className="commentButton" onClick={(e) => this.reportComment(e, comment.id)}>
                                <Report theme="outline" size="24" fill="#333" />
                            </button>
                        </div>}
                    </div>
                </div>
            )
        })
    ) : (
            <div>No comments</div>
        )
        return (
            <div>
                {commentList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.currentUser
    }
}

export default connect(mapStateToProps)(Comments)
