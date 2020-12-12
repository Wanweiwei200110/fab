import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle,  Row, Col
} from 'reactstrap';

//use redux instead of axios
class CollectionItems extends Component {

    render() {
        const { items } = this.props.items
        const itemList = items.length ? (
            items.map(item => {
                return (
                    <Col sm="6">
                        <Card>
                            <CardImg top width="10%" src="../../assets/placeholder2.png" alt="Card image cap" />
                            <CardBody>
                                <Link to={'/shop/' + item.id}>
                                    <CardTitle>{item.title}</CardTitle>
                                </Link>
                                <CardText>{item.body}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        ) : (
                <div>No items</div>
            )
        return (
            <Row>
                {itemList}
            </Row>
        )

    }
}

export default CollectionItems