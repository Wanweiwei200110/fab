import React, { Component } from 'react'
import { Form, Container, Row, Col } from 'react-bootstrap'
import '../css/Login.css'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {loginUser} from '../actions/AuthAction'


class Login extends Component {
    state = {
        username: '',
        password: '',
        usernameError: '',
        passwordError: ''
    }

    handleChangePwd = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        await this.props.loginUser(this.state.username, this.state.password, this.props)
    }
    

    render() {
        return (
            <div className="vertical-center">
            <Container>
            <Row>
                <Col>
                    <h3>Sign In</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={this.handleChange}/>
                    {/* <Form.Text className="text-danger">
                        {this.props.error.usernameError}
                    </Form.Text> */}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.handleChangePwd}/>
                    {/* <Form.Text className="text-danger">
                        {this.props.error.passwordError}
                    </Form.Text> */}
                    </Form.Group>
                    
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <button type="submit" onClick={this.onSubmit}>
                    Sign In
                </button>
            </Row>
            </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.userReducer.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        loginUser: (username, password, props) =>{ dispatch(loginUser(username, password, props)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))