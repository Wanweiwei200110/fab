import React, { Component } from 'react'
import { Form, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {signUpUser} from '../actions/AuthAction'

class Signup extends Component {
    state = {
        username: '',
        password: '',
        confirmPwd: '',
        usernameError: '',
        passwordError: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    // implement later
    handleSubmit = async (e) => {
        e.preventDefault()
        // // check no blank input
        if (!this.state.username || !this.state.password || !this.state.confirmPwd){
            // remind message
            alert("Missing required information.")
        } else if(this.state.password !== this.state.confirmPwd){
            // check same password and confirm password
            // remind message 
            alert("Confirmed password differ from the password.")
        } else{
            // reset errors
            this.props.signUpUser(this.state.username, this.state.password, this.props)
        }
    }

    
    render() {
        return (
            <div className="vertical-center">
            <Container>
            <Row>
                <Col>
                    <h3>Sign Up</h3>
                </Col>
               
            </Row>
            <Row>
             
                <Col>
                    <p>Please fill in this form to create an account!</p>
                </Col>
            </Row>
    
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Control placeholder="Username" id="username" onChange={this.handleChange}/>
                            {/* <Form.Text className="text-danger">
                            {this.props.error.usernameError}
                            </Form.Text> */}
                        </Col>
                    </Form.Row>
                </Form>
            <br/>
            <Row>
                <Col>
                    <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="password" onChange={this.handleChange}/>
                    <br></br>
                    <Form.Control type="password" placeholder="Confirm Password" id="confirmPwd" onChange={this.handleChange}/>
                    {/* <Form.Text className="text-danger">
                        {this.props.error.passwordError}
                    </Form.Text> */}
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <button type="submit" onClick={this.handleSubmit} >
                    Sign Up
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
        signUpUser: (username, password, props) =>{ dispatch(signUpUser(username, password, props)) }
    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup))