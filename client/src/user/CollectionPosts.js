import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col
} from 'reactstrap';

class CollectionPosts extends Component { 

    render() {
        const { posts } = this.props.posts
        const postList = posts.length ? (
            posts.map(post => {
                return (
                    <Col sm="6">
                        <Card>
                            <CardImg top width="10%" src='../../assets/placeholder.png' alt="Card image cap" />
                            <CardBody>
                                <Link to={'/forum/' + post.id}>
                                    <CardTitle>{post.title}</CardTitle>
                                </Link>
                                <CardText>{post.body}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        ) : (
                <div>No posts</div>
            )
        return (
            <Row>
                {postList}
            </Row>
        )

    }
}

export default CollectionPosts