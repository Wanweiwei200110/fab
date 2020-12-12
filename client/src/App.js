import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import Forum from './forum/Forum'
import Shop from './shop/Shop'
import MainLogin from './login-signup/MainLogin'
import Collections from './user/Collections'
import Cart from './user/Cart'
import Post from './forum/Post'
import Item from './shop/Item'
import Profile from './user/Profile'
import AdminHome from './admin/AdminHome'
import Checkout from './shop/Checkout'
import NewPost from './forum/NewPost'
import NewItem from './shop/NewItem'
import Footer from './Footer'
import NotFoundPage from './NotFoundPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import { connect } from 'react-redux'

const App = (props) => {
    if (!props.user) {
        return (<MainLogin></MainLogin>)
    }
    
    if (props.usertype === 'admin') {
        return (
            <div className="App">
                <Header/>
                <div className="warpper-content">
                <Switch>
                    <Route path='/newitem' component={NewItem}></Route>
                    <Route path='/forum/:post_id' component={Post}></Route>
                    <AdminHome />
                </Switch>
                </div>
                <Footer className="footer"></Footer>
            </div>
        )
    }

    else{
        return (
            <div className="App">
            <Header/>
            <div className="warpper-content">
            <Switch>
                <Route exact path='/' component={Forum}></Route>
                <Route path='/forum/:post_id' component={Post}></Route>
                <Route path='/shop/:item_id' component={Item}></Route>
                <Route path='/:username/profile' component={Profile}></Route>
                <Route path='/shop' component={Shop}></Route>
                <Route path='/signin_up' component={MainLogin}></Route>
                <Route path='/newpost' component={NewPost}></Route>
                <Route path='/:username/cart' component={Cart}></Route>
                <Route path='/:username/checkout' component={Checkout}></Route>
                <Route path='/:username/collections' component={Collections}></Route>
                <Route path="*" component={NotFoundPage} />
            </Switch>
            </div>
            <Footer className="footer"></Footer>
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.currentUser,
        usertype: state.userReducer.usertype
    }
}

export default connect(mapStateToProps)(App);