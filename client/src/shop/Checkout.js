import React, { Component } from 'react'
import OrderInfo from './OrderInfo'
import OrderSummary from './OrderSummary'
import { connect } from 'react-redux' 
import { Row, Col } from 'reactstrap'

class Checkout extends Component {
    state = {
        cart: [],
        loading: true,
        totalBeforeTax: 0
    }

    async componentDidMount() {
        try {
            const res = await fetch('/' + this.props.user + '/cart', {
                headers: {'Content-Type': 'application/json'}
            });
            const cart_data = await res.json()
            let total = 0
            cart_data.forEach(item => {
                total += item.item.price * item.qty
            })
            this.setState({
                cart: cart_data,
                totalBeforeTax: Math.round(total * 100) / 100, 
                loading: false
            })
        }catch (err) {
            console.log(err)
        }
    }

    render() {
        if (this.state.loading) {
            return (<p>loading...</p>)
        } else {
            return (
                <div>
                    <Row>
                        <Col sm="8">
                            <OrderInfo items={this.state.cart} totalBeforeTax={this.state.totalBeforeTax}></OrderInfo>
                        </Col>
                        <Col sm="4">
                            <OrderSummary items={this.state.cart} totalBeforeTax={this.state.totalBeforeTax} ></OrderSummary>
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.currentUser
    }
}


export default connect(mapStateToProps)(Checkout)