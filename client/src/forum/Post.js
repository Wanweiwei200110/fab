import React, { Component } from 'react'
import { connect } from 'react-redux'
import AboutCreator from './AboutCreator'
import PostContainer from './PostContainer'
import { Row, Col, Container } from 'reactstrap'
import { Like, Star, Shop } from '@icon-park/react'
import '../css/ItemAndPost.css'
import Carousel from 'react-bootstrap/Carousel'


class Post extends Component {
    state = {
        post_id: this.props.match.params.post_id,
        user: this.props.user,
        toggleLike: false,
        toggleCollect: false,
        toggleReport: false,
        post: null,
        author: null,
        comments: [],
        loading: true,
        liked: false,
        collected: false,
        following: false
    }

    toggleLike = () => {
        try {
            if (this.state.liked) {
                fetch('/api/forum/' + this.state.post_id + '/unlike', {
                    method: 'PATCH',
                    body: JSON.stringify({username: this.props.user}),
                    headers: { 'Content-Type': 'application/json' }
                })
            } else {
                fetch('/api/forum/' + this.state.post_id + '/like', {
                    method: 'PATCH',
                    body: JSON.stringify({username: this.props.user}),
                    headers: { 'Content-Type': 'application/json' }
                })
            }
            this.setState({
                liked: !this.state.liked
            })
        } catch (err) {
            console.log(err)
        }
    }

    toggleCollect = () => {
        try {
            if (this.state.collected) {
                fetch('/api/forum/' + this.state.post_id + '/uncollect', {
                    method: 'PATCH',
                    body: JSON.stringify({username: this.props.user}),
                    headers: { 'Content-Type': 'application/json' }
                })
            } else {
                fetch('/api/forum/' + this.state.post_id + '/collect', {
                    method: 'PATCH',
                    body: JSON.stringify({username: this.props.user}),
                    headers: { 'Content-Type': 'application/json' }
                })
            }
            this.setState({
                collected: !this.state.collected
            })
        }catch (err) {
            console.log(err)
        }
    }

    toggleVote(upvoted, downvoted, action, id, i) {
        try {
            if ((action === 'upvote' && upvoted) || (action === 'downvote' && downvoted)) {
                return
            }
            let up
            let down
            let votes = this.state.comments[i].votes
            if (action === 'upvote') {
                fetch('/api/' + id + '/comment', {
                    method: 'PATCH',
                    body: JSON.stringify({username: this.props.user, action, downvoted}),
                    headers: { 'Content-Type': 'application/json' }
                })
                down = false
                up = !downvoted
                votes += 1
            }
            
            else if (action === 'downvote') {
                fetch('/api/' + id + '/comment', {
                    method: 'PATCH',
                    body: JSON.stringify({username: this.props.user, action, upvoted}),
                    headers: { 'Content-Type': 'application/json' }
                })
                down = !upvoted
                up = false
                votes -= 1
            }
            const comment = {...this.state.comments[i], upvoted: up, downvoted: down, votes}
            this.setState({
                comments: [...this.state.comments.slice(0, i), comment, ...this.state.comments.slice(i+1)]
            })
        }catch (err) {
            console.log(err)
        }
    }


    reportPost = (e) => {
        try {
            e.preventDefault()
            fetch('/api/forum/' + this.state.post_id + '/report', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
            })
            alert('Thank you for your feedback. Our admins will soon handle it :)')
        } catch (err) {
            console.log(err)
        }
    }

    addComment = (comment) => {
        this.setState({
            comments: [...this.state.comments, comment]
        })
    }

    toggleFollow = () => {
        try {
            let numFollowers = this.state.author.numFollowers
            if (this.state.following) {
                fetch('/api/' + this.state.author.username + '/unfollow', {
                    method: 'PATCH',
                    body: JSON.stringify({username: this.props.user}),
                    headers: { 'Content-Type': 'application/json' }
                })
                numFollowers -= 1
            } else {
                fetch('/api/' + this.state.author.username + '/follow', {
                    method: 'PATCH',
                    body: JSON.stringify({username: this.props.user}),
                    headers: { 'Content-Type': 'application/json' }
                })
                numFollowers += 1
            }
            this.setState({
                following: !this.state.following,
                author: {...this.state.author, numFollowers}
            })
        }catch (err) {
            console.log(err)
        }
    }

    async componentDidMount() {
        try {
            // get post data from backend 
            const post_response = await fetch('/api/forum/' + this.state.post_id + '/' + this.props.user, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const post_data = await post_response.json()

            // get author data from backend 
            const author_response = await fetch('/api/forum/' + this.state.post_id + '/author/' + this.props.user, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const author_data = await author_response.json()
            const comments_response = await fetch('/api/' + this.state.post_id + '/comments/' + this.props.user, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const comments_data = await comments_response.json()
            
            this.setState({
                post: post_data.post,
                liked: post_data.liked,
                collected: post_data.collected,
                author: author_data.author,
                following: author_data.following,
                comments: comments_data,
                loading: false
            })
        } catch(err) {
            console.log(err)
        }
    }

render() {
    if (this.state.loading) {
        return (<p>loading...</p>)
    } else {
        const imageList = this.state.post.images.map((image, ind) => {
            return(<Carousel.Item className="carousel" key={ind}><img className="image" src={image} alt="post pic"></img></Carousel.Item>)
        })
        return (
            <Container>
                <Row>
                    <Col sm="8">
                        <Carousel>
                            {imageList}
                        </Carousel>
                    </Col>
                    <Col sm="4">
                        <Container>
                            <AboutCreator author={this.state.author} following={this.state.following} toggleFollow={this.toggleFollow}></AboutCreator>
                        </Container>
                        <Row>
                            <Container>
                                <button className="indButton" size="lg" onClick={() => this.toggleLike()}>
                                    {!this.state.liked && <Like theme="outline" size="20" />}
                                    {this.state.liked && <Like theme="filled" size="24" fill="#ee7f8d" strokeWidth={2} />}
                                    {'  '}Like
                                </button>
                            </Container>

                            <Container>
                                <button className="indButton" size="lg" onClick={() => this.toggleCollect()}>
                                    {!this.state.collected && <Star theme="outline" size="19" />}
                                    {this.state.collected && <Star theme="filled" size="24" fill="#fcef4e" strokeWidth={3} />}
                                    {'  '}Collect
                                </button>
                            </Container>

                            {this.state.post.link.length > 0 && <Container>
                                <button className="indButton" color="success" size="lg" onClick={() => this.props.history.push(this.state.post.link)}>
                                    <Shop theme="outline" size="20" />
                                    {'  '}Shop
                                </button>
                            </Container>}
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <PostContainer post={this.state.post} comments={this.state.comments} user={this.state.user} addComment={(comment) => this.addComment(comment)} toggleVote={(upvoted, downvoted, action, id, i) => this.toggleVote(upvoted, downvoted, action, id, i)} reportPost={(e) => this.reportPost(e)}></PostContainer>
                </Row>
            </Container>
        )
    }

}
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.currentUser
    }
}

export default connect(mapStateToProps)(Post)