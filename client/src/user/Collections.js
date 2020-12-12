import React, { Component } from 'react'
import CollectionContainer from './CollectionContainer'

class Collections extends Component {
    state = {
        user: null,
        posts: [],
        items: [],
        loading: true,
    }
    async componentDidMount() {
        try{
            const username = this.props.match.params.username

            const user = await fetch('/' + username + '/get', {
                headers: {'Content-Type': 'application/json'}
            });

            const user_data = await user.json()
            
            const posts = await fetch('/' + username + '/collections/post', {
                headers: {'Content-Type': 'application/json'}
            });
            const posts_data = await posts.json()

            const items = await fetch('/' + username + '/collections/item', {
                headers: {'Content-Type': 'application/json'}
            });
            const items_data = await items.json()

            this.setState({
                user: user_data,
                posts: posts_data,
                items: items_data,
                loading: false
            })

        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <br></br>
                {this.state.loading ? <div>Loading...</div> : <CollectionContainer user={this.state.user} posts={this.state.posts} items={this.state.items}></CollectionContainer>}
            </div>
        )
    }
}

export default Collections
