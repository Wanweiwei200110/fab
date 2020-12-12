import React from 'react'
import { Link } from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Container, Row, Col
} from 'reactstrap'
import { Like, Star } from '@icon-park/react'

const CollectionCards = (props) => {
    const posts = props.posts
    const postList = posts.length ? (
        posts.map(post => {
            return (
                <Col sm="4" key={post._id}>
                    <Card className="m-4">
                        <CardImg top width="10%" src={post.images[0]} alt="Card image cap" />
                        <CardBody>
                            <Link to={'/forum/' + post._id}>
                                <CardTitle><h5>{post.title.length < 50 ? post.title : post.title.slice(0, 50) + '...'}</h5></CardTitle>
                            </Link>
                            <CardText>{post.body.length < 100 ? post.body : post.body.slice(0, 100) + '...'}</CardText>
                            <div className='row'>
                                <div className='col-2'>
                                    <Like theme="filled" size="24" fill="#50e3c2" />
                                </div>
                                <div className='col'>
                                    <p>{post.numLikes}</p>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-2'>
                                    <Star theme="filled" size="24" fill="#50e3c2"  />
                                </div>
                                <div className='col'>
                                    <p>{post.numCollects}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            )
        })
    ) : (
            <div>No posts</div>
        )
    return (
        <Container>
            <Row>
                {postList}
            </Row>
        </Container>
    )
}

export default CollectionCards
