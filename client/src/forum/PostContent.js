import React, { Component } from 'react'
import '../css/ItemAndPost.css'
class PostContent extends Component {
    
    render() {
        const {post} = this.props
        const content = post ? (
            <div className="mx-auto">
                <h4 className="title">{post.title}</h4>
                <p className="text">{post.body}</p>
            </div>
        ) : (
                <div>Loading...</div>
            )

        return (
            <div>
                {content}
            </div>
        )
    }
}

export default PostContent