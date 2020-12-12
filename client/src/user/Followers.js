import React, { Component } from 'react'
class Followers extends Component {

    render() {
        const followerList = this.props.followers.map((follower, ind) => {
            return (
                <div className="followingContainer" key={ind}>
                    <a href={'/' + follower.username + '/profile'}>
                        <img className="followPic" src={follower.profilePic} alt="profile"></img>
                        <h5 className="followName">{follower.username}</h5>   
                    </a>             
                </div>
            )
        })
        return (
            <div>
                {followerList.length ? followerList : <div>No followers</div>}
            </div>
        )
    }
}

export default Followers