import React, { Component } from 'react'

class ItemContent extends Component {

    render() {
        const { item } = this.props
        const content = item ? (
            <div id="itemContentContainer">
                <h2 className="title">{item.title}</h2>
                <p className="text">{item.body}</p>
            </div>
        ) : (
                <div>Loading...</div>
            )

        return (
            <div>
                <h4>{content}</h4>
            </div>
        )
    }
}

export default ItemContent