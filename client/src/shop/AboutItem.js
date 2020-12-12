import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ShoppingCart, Star, ShoppingCartDel } from '@icon-park/react'
import '../css/ItemAndPost.css'

class AboutItem extends Component {
    
    render() {
        const { item } = this.props
        return (
            <div className="aboutContainer">
                <h3 className="aboutName">Interested?</h3>
                <img className="aboutImage" src={item.images[0]} alt="item" width="100px"></img>
                <div className="aboutMore">
                    <h5 className="aboutIntro">${item.price}</h5>
                    <button className="aboutButton" size="lg" onClick={()=>this.props.toggleCollect()}>
                        {!this.props.collected && <Star theme="outline" size="19" />}
                        {this.props.collected && <Star theme="filled" size="24" fill="#fcef4e" strokeWidth={3} />}
                        {'  '}Collect
                    </button> 
                    <button className="aboutButton" size="lg" onClick={()=>this.props.toggleCart()}> 
                        {!this.props.inCart && <ShoppingCart theme="outline" size="20" />}
                        {this.props.inCart && <ShoppingCartDel theme="filled" size="24" fill="#92db41" strokeWidth={3} />}
                        {"  "}Add to cart
                    </button> 
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.currentUser
    }
}

export default connect(mapStateToProps,)(AboutItem)

