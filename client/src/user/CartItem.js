import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormControl, Row, Container, Col } from 'react-bootstrap'
import { Toast, ToastBody, ToastHeader, InputGroup } from 'reactstrap'

class CartItem extends Component {
    state = {
        qty: this.props.qty
    }

    changeQty = (e) => {
        e.preventDefault()
        if (e.target.value >= 0) {
            this.setState({
                qty: parseInt(e.target.value)
            })
        }
    }

    updateQty = (e, id, qty, ind) => {
        e.preventDefault()
        this.props.updateQty(id, qty, ind)
    }

    render () {
        return (
                <Toast>
                    <Link to={'/shop/' + this.props.item._id}>
                        <ToastHeader className="toastTitle"><h5>{this.props.item.title.length < 50 ? this.props.item.title : this.props.item.title.slice(0, 50) + '...'}</h5></ToastHeader>
                    </Link>
                    <Container>
                        <ToastBody>
                            <Row>
                                <Col>
                                    <img src={this.props.item.images[0]} alt='item pic' width="70px"></img>
                                </Col>
                                <Col>
                                    <h5>{this.props.item.body.length < 50 ? this.props.item.body : this.props.item.body.slice(0, 50) + '...'}</h5>
                                </Col>
                            </Row>
                            <br></br>
                            <h4>${this.props.item.price}</h4>
                            <Row>
                                <Col>
                                    <InputGroup className="mb-3">
                                        <FormControl type="number" value={this.state.qty} onChange={(e) => this.changeQty(e)}/>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <button onClick={(e) => this.updateQty(e, this.props.item._id, this.state.qty, this.props.ind)} >Update Qty</button>
                                </Col>
                            </Row>
                        </ToastBody>
                    </Container>
                </Toast>
        )
    }
}




export default CartItem