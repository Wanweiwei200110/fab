import React, { Component } from 'react'
import { PeopleMinusOne } from '@icon-park/react'
import "../css/User.css"
class Followings extends Component {
    handleClick = (username) => {
        this.props.unfollow(username)
    }
    render() {
        const followingList = this.props.followings.map(following => {
            return (
                <div className="followingContainer" key={following.id}>
                    <a href={'/' + following.username + '/profile'}>
                        <img className="followPic" src={following.profilePic} alt="profile"></img>
                        <h5 className="followName">{following.username}</h5>
                    </a>
                    <button className="unfollowButton" onClick={() => this.handleClick(following.username)}>
                        <PeopleMinusOne theme="filled" size="24" fill="#000000" strokeWidth={3} />{' '}
                        Unfollow
                    </button>
                </div>
            )
        })
        return (
            <div>
                {followingList.length ? followingList : <div>No followings</div>}
            </div>
        )
    }
}


export default Followings
