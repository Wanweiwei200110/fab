import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PeoplePlusOne, PeopleMinusOne } from '@icon-park/react'

class AboutCreator extends Component {
    state = {
        username: this.props.author.username,
        profilePic: this.props.author.profilePic,
        intro: this.props.author.intro
    }

   
    render() {
        if (this.state.loading) {
            return (<p>loading...</p>) 
        } else {
            return (
                <div className="aboutContainer">
                    <a href={'/' + this.state.username + '/profile'}><h4 className="aboutName">{this.state.username}</h4></a>
                    <img className="aboutImage" src={this.state.profilePic} alt="profile" width="100px"></img>
                    <div className="aboutMore">
                        <p className="aboutIntro">{this.state.intro}</p>
                        <h5>Followers: {this.props.author.numFollowers}</h5>
                        {this.props.user !== this.state.username && !this.props.following && <button className="aboutButton" onClick={() => this.props.toggleFollow()}>
                            <PeoplePlusOne theme="outline" size="24" fill="#4a4a4a" strokeWidth={3} />{' '}
                            Follow
                        </button>}
                        {this.props.user !== this.state.username && this.props.following && <button className="aboutButton" onClick={() => this.props.toggleFollow()}>
                            <PeopleMinusOne theme="filled" size="24" fill="#000000" strokeWidth={3} />{' '}
                            Unfollow
                        </button>}
                    </div>
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


export default connect(mapStateToProps)(AboutCreator)