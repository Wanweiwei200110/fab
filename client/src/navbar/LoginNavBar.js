import React, { Component } from 'react'
import {NavLink} from 'react-bootstrap'


class LoginNavBar extends Component {
    render() {
        return (
            <ul className="navbar-nav ml-auto">
               <li className="nav-item">
                    <NavLink href="/signin_up">Sign in / Sign up</NavLink>
                </li>
            </ul>
        )
    }
}
export default LoginNavBar