import React, { Component } from 'react'
import ReportedContainer from './ReportedContainer'
import { DocAdd } from '@icon-park/react'
import '../css/User.css'
import { Jumbotron, Container, Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';


class AdminHome extends Component {
    state = {
        adminname: 'admin',
        profilePic: '../../assets/admin.jpg',
        posts: [],
        comments: [],
        loading: true
    }

    async componentDidMount() {
        try {
            const posts = await fetch('/api/forum/reported', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const post_data = await posts.json()

            const comments = await fetch('/api/comments/reported', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const comment_data = await comments.json()

            this.setState({
                posts: post_data,
                comments: comment_data,
                loading: false
            })
        } catch(err) {
            console.log(err)
        }
    }

    deletePost(e, id) {
        try {
            e.preventDefault()
            fetch('/api/forum/' + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            let posts = this.state.posts.filter(post => {
                return (post._id !== id)
            })

            this.setState({
                posts
            })
        } catch (err) {
            console.log(err)
        }
    }

    unreportPost(e, id) {
        try {
            e.preventDefault()
            fetch('/api/forum/' + id + '/unreport', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
            })

            let posts = this.state.posts.filter(post => {
                return (post._id !== id)
            })

            this.setState({
                posts
            })
        } catch (err) {
            console.log(err)
        }
    }

    deleteComment(e, id) {
        try {
            e.preventDefault()
            fetch('/api/comment/' + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            let comments = this.state.comments.filter(comment => {
                return (comment._id !== id)
            })

            this.setState({
                comments
            })
        } catch (err){
            console.log(err)
        }
    }

    unreportComment(e, id) {
        try {
            e.preventDefault()
            fetch('/api/comment/' + id + '/unreport', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
            })

            let comments = this.state.comments.filter(comment => {
                return (comment._id !== id)
            })

            this.setState({
                comments
            })
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        if (this.state.loading) {
            return (<p>loading...</p>)
        } else {
            return (
                <div>
                    <Jumbotron fluid>
                        <Container fluid>
                            <Row>
                                <Col >
                                    <Container id="adminInfo">
                                        <img src={this.state.profilePic} alt="profile pic" width="100px"></img>
                                        <h1>{this.state.adminname}</h1>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>

                    <Container>
                        <Button id="newItemButton" outline variant="light" onClick={() => this.props.history.push('/newitem')}>
                            <DocAdd theme="outline" size="20" fill="#4a4a4a" /> {'  '}
                            New shop item
                        </Button>
                    </Container>
                    

                    <Container>
                        <ReportedContainer
                        posts={this.state.posts}
                        comments={this.state.comments}
                        deleteComment={(e, id) => this.deleteComment(e, id)}
                        deletePost={(e, id) => this.deletePost(e, id)}
                        unreportComment={(e, id) => this.unreportComment(e, id)}
                        unreportPost={(e, id) => this.unreportPost(e, id)}></ReportedContainer>
                    </Container>
                    
                </div>
            )
        }
    }
}


export default withRouter(AdminHome)