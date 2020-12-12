import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Form, Row } from 'react-bootstrap'
import './css/Forum.css'
import { Report } from '@icon-park/react'
import { connect } from 'react-redux'

class NewComment extends Component {
    state = {
        content: '',
        user: this.props.user
    }

    //picture updating later 
    //neet to update message remind for 
    handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const comment_response = await fetch('/' + this.props.post_id + '/comment', {
                method: 'POST',
                body: JSON.stringify({ 
                    author: this.state.user, 
                    content: this.state.content
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            let comment_data = await comment_response.json()
            comment_data = {...comment_data, profilePic: this.props.profilePic}
            this.props.handleComment(comment_data)
        }catch (err) {
            console.log(err)
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return (
            <div id='newPostForm'>
                {/* <h3>Create a new comment for the post</h3> */}
                <Form>
                    <Form.Group as={Row} size="lg">
                        <Form.Label column sm="12" >
                            Have something to say? Write your comments here!
                            {this.props.type === 'post' && 
                            <button className="indButton" variant="light" size="lg" onClick={(e) => this.props.reportPost(e)}>
                                <Report theme="outline" size="20" />
                                {'  '}Report
                            </button>}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group controlId="content">
                        <Form.Control as="textarea" rows={8}
                            placeholder="Please be polite!"
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Button outline block variant="primary" type="submit" onClick={this.handleSubmit}>
                        Comment
                </Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.currentUser,
        profilePic: state.userReducer.profilePic
    }
}


export default connect(mapStateToProps)(NewComment)

