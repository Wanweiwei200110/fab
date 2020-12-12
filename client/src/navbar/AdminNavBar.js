import React, { Component } from 'react'
import {NavDropdown} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutUser } from '../actions/AuthAction'

class AdminNavBar extends Component {
    render() {
        const handleLogout = (username) => {
            this.props.logOutUser()
            this.props.history.push("/")
        }
        return (
            <ul className="navbar-nav ml-auto">
                <NavDropdown title={"Hi! admin"} id="basic-nav-dropdown" className="active">
                    <NavDropdown.Item href={'/admin'}>Admin Home</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => handleLogout('admin')}>Log out</NavDropdown.Item>
                </NavDropdown>
            </ul>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        logOutUser: () =>{ dispatch(logOutUser()) }
    }
}
export default connect(null, mapDispatchToProps)(withRouter(AdminNavBar))