import React, { Component } from 'react'
import PostCards from '../card/PostCards'
import SearchBox from '../SearchBox'
import { Container, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { DocAdd } from '@icon-park/react'
import "../css/Forum.css"

class Forum extends Component {
    state ={
        user: this.props.user,
        searchField: '',
        posts: [],
        loading: true
    }

    handleChange = (e) => {
        this.setState({searchField: e.target.value})
    }

    async componentDidMount() {
        try {
            const response = await fetch('/forum', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            const data = await response.json()
            this.setState({
                posts: data,
                loading: false
            })
            
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        if (this.state.loading) {
            return (<p>loading...</p>) 
        } else {
            const { searchField } = this.state
            const filteredPosts = this.state.posts.filter(post => (
                post.title.toLowerCase().includes(searchField.toLowerCase())
            ))
            return (
                <Container>
                    <Container>
                        <img id='fabImage' src='../../assets/fab.PNG' alt="display"></img>
                        <h1 id='fab' className='center'>F.A.B</h1>
                    </Container>
                    <br></br>                
                    <Container id="searchContainer">
                        <Button outline variant="light" onClick={() => this.state.user ? this.props.history.push('/newpost') : alert("Please login first")}>
                            <DocAdd theme="outline" size="20" fill="#4a4a4a" /> {'  '}
                            New Post
                        </Button>
                        <SearchBox id="postSearchBox" placeholder="Search for posts..." handleChange={this.handleChange}></SearchBox>
                    </Container>
                    <PostCards posts={filteredPosts} admin={false}></PostCards>
                </Container>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.currentUser
    }
}

export default connect(mapStateToProps)(Forum)
