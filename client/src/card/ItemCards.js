import React from 'react'
import { Link } from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Container, Row, Col
} from 'reactstrap';
import { Star, Shopping } from '@icon-park/react'

const itemCards = (props) => {
    const items = props.items
    const itemList = items.length ? (
        items.map(item => {
            return (
                <Col sm="4" key={item._id}>
                    <Card className="m-4">
                        <CardImg top width="10%" src={item.images[0]} alt="Card image cap" />
                        <CardBody>
                            <Link to={'/shop/' + item._id}>
                                <CardTitle><h5>{item.title.length < 50 ? item.title : item.title.slice(0, 50) + '...'}</h5></CardTitle>
                            </Link>
                            <CardText>{ item.body.length < 100 ? item.body : item.body.slice(0, 100) + '...'}</CardText>
                            <div className='row'>
                                <div className='col-2'>
                                    <Shopping theme="filled" size="24" fill="#50e3c2" />
                                </div>
                                <div className='col'>
                                    <p>{item.numBought}</p>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-2'>
                                    <Star theme="filled" size="24" fill="#50e3c2" />
                                </div>
                                <div className='col'>
                                    <p>{item.numCollects}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            )
        })
    ) : (
            <div>No items</div>
        )
    return (
        <Container>
            <Row>
                {itemList}
            </Row>
        </Container>
    )
  
}
export default itemCards
