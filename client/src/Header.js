import UserNavBar from './navbar/UserNavBar'
import LoginNavBar from './navbar/LoginNavBar'
import AdminNavBar from './navbar/AdminNavBar'
import { NavLink } from 'react-bootstrap'
import React from 'react'
import { connect } from 'react-redux'

const Header = (props) => {
    let links = null
    if (props.user){
        if (props.usertype === 'admin') {
            links = <AdminNavBar></AdminNavBar>
        } else {
            links = <UserNavBar user = {props.user}/>
        }
    }else{
        links = <LoginNavBar />
    }

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            {props.usertype !== 'admin' && <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink href="/">Posts</NavLink>
                    </li>
                    <li className="nav-itema active">
                        <NavLink href="/shop">Shop</NavLink>
                    </li>
                </ul>
            </div>}

            {props.usertype !== 'admin' && <div className="mx-auto order-0">
                <a className="navbar-brand mx-auto" href="/">FAB</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>}
            
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    {links}
                </ul>
            </div>
        </nav>
    )
}
    
const mapStateToProps = (state) => {
    return {
        user: state.userReducer.currentUser,
        usertype: state.userReducer.usertype
    }
}

export default connect(mapStateToProps)(Header)