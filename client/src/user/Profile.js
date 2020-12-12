import React, { Component } from 'react'
import ProfileContainer from './ProfileContainer'
import IntroContainer from './IntroContainer'
import { Container, Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import firebase from "firebase"
import "../css/User.css"


class Profile extends Component {
    state = {
        username: '',
        profilePic: '',
        intro: '',
        posts: [],
        orderHistory: [],
        followings: [],
        followers: [],
        loading: true,
        upload: false
    }

    changeIntro = (intro) => {
        try {
            this.setState({
                intro
            })
            fetch('/' + this.state.username + '/intro', {
                method: 'PATCH',
                body: JSON.stringify({ intro }),
                headers: {'Content-Type': 'application/json'}
            })
        }catch (err) {
            console.log(err)
        }
    }

    handleChange = () => {
        this.setState({
            intro: this.props.user.introduction
        })
    }

    unfollow = (user) => {
        try {
            let followings = this.state.followings.filter(following => {
                return following.username !== user
            })
            this.setState({
                followings
            })
            fetch('/' + user + '/unfollow', {
                method: 'PATCH',
                body: JSON.stringify({ username: this.state.username }),
                headers: { 'Content-Type': 'application/json' }
            })
        }catch (err) {
            console.log(err)
        }
    }

    async componentDidMount() {
        try{
            const username = this.props.match.params.username
            
            const profile = await fetch('/' + username + '/get', {
                headers: {'Content-Type': 'application/json'}
            });
            const profile_data = await profile.json()

            const followings = await fetch('/' + username + '/followings', {
                headers: {'Content-Type': 'application/json'}
            });
            const followings_data = await followings.json()

            const followers = await fetch('/' + username + '/followers', {
                headers: {'Content-Type': 'application/json'}
            });
            const followers_data = await followers.json()

            const order_history = await fetch('/' + username + '/orders/get', {
                headers: {'Content-Type': 'application/json'}
            });
            const order_history_data = await order_history.json()

            this.setState({
                username: profile_data.username,
                profilePic: profile_data.profilePic,
                intro: profile_data.intro,
                orderHistory: order_history_data,
                followings: followings_data,
                followers: followers_data,
                loading: false
            })
            const res = await fetch('/' + username + '/posts/get', {
                headers: {'Content-Type': 'application/json'}
            })
            const val = await res.json()
            this.setState({
                posts: val.posts
            })

        } catch (err) {
            console.log(err)
        }
    }

    upload = async (e) => {
        try {
            const file = e.target.files[0]
            const ref = firebase.storage().ref('profilePics/' + this.state.username)
            await ref.put(file)
            const url = await ref.getDownloadURL()
            fetch('/api/profile/' + this.state.username, {
                method: 'POST',
                body: JSON.stringify({ url }),
                headers: { 'Content-Type': 'application/json' }
            })
            this.setState({
                profilePic: url
            })
        }catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <div className="profileContainer">
                    <Container fluid>
                        <Row>
                            <Col>
                                <img src = {this.state.profilePic} alt="profile pic" width="100px"></img>
                                {this.props.user === this.state.username && <button className="uploadBtn" onClick={()=>this.setState({upload: !this.state.upload})}>
                                    {!this.state.upload ? "Upload profile picture" : "Finish"}
                                </button>}   
                                {this.state.upload && <input id="fileButton" type="file" onChange={(e)=>this.upload(e)}/>}                             
                                <h1>{this.state.username}</h1>
                            </Col>
                            <Col>
                                <IntroContainer className="intro-container" intro={this.state.intro} user={this.props.user} changeIntro={(intro) => this.changeIntro(intro)} target={this.state.username}></IntroContainer>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div>
                {this.state.loading ? (<div>Loading...</div>) : (
                    <Container>
                        <Row>
                            <ProfileContainer posts={this.state.posts} followings={this.state.followings} followers={this.state.followers} orderHistory={this.state.orderHistory} user={this.props.user} target={this.state.username} unfollow={(user) => this.unfollow(user)}></ProfileContainer>
                        </Row>
                    </Container>
                )}
                    
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


export default connect(mapStateToProps)(Profile)