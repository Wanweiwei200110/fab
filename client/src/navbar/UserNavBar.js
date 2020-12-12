import React, { Component } from 'react'
import { NavDropdown, NavLink} from 'react-bootstrap'
import { Shopping, Star } from '@icon-park/react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logOutUser } from '../actions/AuthAction'

class UserNavBar extends Component {
    render() {
        const handleLogout = (username) => {
            this.props.logOutUser()
            this.props.history.push("/")
        }
        return (
            <ul className="navbar-nav ml-auto">
                <NavDropdown title={"Hi! " + this.props.user} id="basic-nav-dropdown" className="active">
                    <NavDropdown.Item href={'/' + this.props.user + '/profile'}>My profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={()=>handleLogout(this.props.user)}>Log out</NavDropdown.Item>
                </NavDropdown>
                <li>
                    <NavLink href={'/' + this.props.user + '/cart'}>
                        <Shopping theme="outline" size="20" fill="#333" />
                    </NavLink>
                </li>
                <li>
                    <NavLink href={'/' + this.props.user + '/collections'}>
                        <Star theme="outline" size="20" fill="#333" />
                    </NavLink>
                </li>
            </ul>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logOutUser: () =>{ dispatch(logOutUser()) }
    }
}
export default connect(null, mapDispatchToProps)(withRouter(UserNavBar))