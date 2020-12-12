import React from 'react'
import Login from './Login'
import Signup from './Signup'
import { Container, Row, Col } from 'react-bootstrap'

const MainLogin = () => {
    return (
        <Container>
            <Row>
                <Col><Login></Login></Col>
                <Col><Signup></Signup></Col>
            </Row>
            
        </Container>
    )
}

export default MainLogin