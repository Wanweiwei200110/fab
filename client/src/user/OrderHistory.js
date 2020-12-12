import React, { Component } from 'react'
import {
    Card, CardBody,
    CardTitle, Container, CardHeader, CardFooter, ListGroup, ListGroupItem
} from 'reactstrap'
import datetime from 'date-and-time'

class OrderHistory extends Component {
    
    render() {
        let date
        const historyList = this.props.orderHistory.length ? (
            this.props.orderHistory.map((history, index) => {
                date = new Date(history.time)
                return (
                    <div key={index}>
                        <Card>
                            <CardHeader>
                                <h6>{ datetime.format(date, "MMM D Y, h:mm", false)  }</h6>
                            </CardHeader>
                            <CardBody>
                                <CardTitle>
                                    <h6>Order Information:</h6>
                                </CardTitle>
                                    <ListGroup>
                                    {history.items.map((item, index) => {
                                        return <ListGroupItem key={index+1}>{index+1}: {item.item} qty:{item.qty}</ListGroupItem>
                                    })}
                                </ListGroup>
                            </CardBody>
                            <CardFooter>Total: {history.total}$</CardFooter>
                        </Card>
                        <br></br>
                    </div>
                )
            })
        ) : (
                <div>No histories</div>
            )
        return (
            <Container>
                <br></br>
                {historyList}
            </Container>
        )
    }
}

export default OrderHistory