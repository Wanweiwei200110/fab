import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import { Container} from 'react-bootstrap'
import { connect } from 'react-redux' 
import '../css/Cart.css'
class Cart extends Component {
    state = {
        cart: [],
        loading: true,
        total: 0
    }

    updateQty = (id, qty, i) => {
        try {
            let cart
            if (qty !== this.state.cart[i].qty) {
                fetch('/shop/' + id + '/cart', {
                    method: 'PATCH',
                    body: JSON.stringify({username: this.props.user, qty}),
                    headers: { 'Content-Type': 'application/json' }
                })
                if (qty > 0) {
                    const item = {...this.state.cart[i], qty}
                    cart = [...this.state.cart.slice(0, i), item, ...this.state.cart.slice(i+1)]
                } else {
                    cart = [...this.state.cart.slice(0, i), ...this.state.cart.slice(i+1)]
                }
                let total = 0
                cart.forEach(item => {
                    total += item.item.price * item.qty
                })
                this.setState({
                    total: Math.round(total * 100) / 100, 
                    cart
                })
            } 
        }catch (err) {
            console.log(err)
        }
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
                total: Math.round(total * 100) / 100, 
                loading: false
            })
        }catch (err) {
            console.log(err)
        }
    }
    
    render() {
        const itemList = this.state.cart.length ? (
            this.state.cart.map((item, ind) => {
                return (
                    <div className="cartList" key={item.item._id}>
                        <CartItem item={item.item} qty={item.qty} ind={ind} updateQty={(id, qty, i) => this.updateQty(id, qty, i)}></CartItem>
                    </div> 
                )
            })
        ) : (
                <div className="cartList">
                    No items
                    <br></br>
                </div>
            )
            if (this.state.loading) {
                return (<p>loading...</p>)
            } else {
                return (
                    <div>
                        <br></br>
                        <Container>
                            {itemList}
                            <h5 className="total">Total: ${this.state.total}</h5>
                            <Link to={'/' + this.props.user + '/checkout'}>
                                <button className="checkoutBut" radiant="light" disabled={this.state.cart.length === 0} >Checkout</button>
                            </Link>
                        </Container>
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


export default connect(mapStateToProps)(Cart)