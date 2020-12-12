import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemContainer from './ItemContainer'
import AboutItem from './AboutItem'
import { Col, Container, Row } from 'reactstrap'
import '../css/ItemAndPost.css'
import Carousel from 'react-bootstrap/Carousel'


class Item extends Component {
    state = {
        item_id: this.props.match.params.item_id,
        user: this.props.user,
        item: null,
        comments: [],
        collected: false,
        inCart: false,
        loading: true,
    }

    addComment = (comment) => {
        this.setState({
            comments: [...this.state.comments, comment]
        })
    }

    toggleCollect = () => {
        try {
            if (this.state.collected) {
                fetch('/api/shop/' + this.state.item_id + '/uncollect', {
                    method: 'PATCH',
                    body: JSON.stringify({username: this.props.user}),
                    headers: { 'Content-Type': 'application/json' }
                })
            } else {
                fetch('/api/shop/' + this.state.item_id + '/collect', {
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

    toggleCart = () => {
        try {
            if (this.state.inCart) {
                fetch('/api/shop/' + this.state.item_id + '/cart', {
                    method: 'PATCH',
                    body: JSON.stringify({username: this.props.user, qty: 0}),
                    headers: { 'Content-Type': 'application/json' }
                })
            } else {
                fetch('/api/shop/' + this.state.item_id + '/cart', {
                    method: 'PATCH',
                    body: JSON.stringify({username: this.props.user, qty: 1}),
                    headers: { 'Content-Type': 'application/json' }
                })
            }
            this.setState({
                inCart: !this.state.inCart
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
            console.log('votte', i)
            let up
            let down
            let votes = this.state.comments[i].votes
            if (action === 'upvote') {
                console.log('upvote')
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
        } catch (err) {
            console.log(err)
        }
    }

    async componentDidMount() {
        try {
            // get post data from backend 
            const post_response = await fetch('/api/shop/' + this.state.item_id + '/' + this.props.user, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const post_data = await post_response.json()

            const comments_response = await fetch('/api/' + this.state.item_id + '/comments/' + this.props.user, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const comments_data = await comments_response.json()
    
            this.setState({
                item: post_data.item,
                collected: post_data.collected,
                inCart: post_data.inCart,
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
            const imageList = this.state.item.images.map((image, ind) => {
                return(<Carousel.Item className="carousel" key={ind}><img className="image" src={image} alt="post pic"></img></Carousel.Item>)
            })
            return (
                <Container>
                    <Row sm="8">
                        <Col>
                            <Carousel>
                                {imageList}
                            </Carousel>
                        </Col>
                        <Col sm="4">
                            <Container>
                                <AboutItem item={this.state.item} collected={this.state.collected} inCart={this.state.inCart} toggleCollect={this.toggleCollect} toggleCart={this.toggleCart}></AboutItem>
                            </Container>
                        </Col>
                    </Row>
                    <Row>
                        <ItemContainer item={this.state.item} comments={this.state.comments} user={this.state.user} addComment={(comment) => this.addComment(comment)}  toggleVote={(upvoted, downvoted, action, id, i) => this.toggleVote(upvoted, downvoted, action, id, i)}></ItemContainer>
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

export default connect(mapStateToProps)(Item)
