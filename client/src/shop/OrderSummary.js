import React from 'react'
import { Toast, ToastBody, Row, Col } from 'reactstrap'

const OrderSummary = (props) => {
    const { items, totalBeforeTax } = props
    const itemList = items.length ? (
        items.map(item => {
            return (
                <Toast key={item.item._id}>
                    <ToastBody>
                        <Row>
                            <Col>
                                <img src={item.item.images[0]} alt='item pic' width="70px"></img>
                            </Col>
                        </Row>
                        <Row>
                            <Col><h5>{item.item.title.length < 30 ? item.item.title : item.item.title.slice(0, 30) + '...'}</h5></Col>
                        </Row>
                        <br></br>
                        <h5>${item.item.price}</h5>
                        <Row>
                            <Col>
                                Quantity: {item.qty}
                            </Col>
                        </Row>
                    </ToastBody>
                </Toast>
            )
        })
    ) : (
            <div>No items</div>
        )
    return (
        <div>
            <br></br>
            {itemList}
            <p>Total before tax: ${Math.round(totalBeforeTax * 100) / 100}</p>
        </div>
    )
}
export default OrderSummary