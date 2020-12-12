import React from 'react'
import { Form } from 'react-bootstrap'
import './css/Forum.css'

const SearchBox = ({ placeholder, handleChange }) => {
    return(
        <div>
            <br></br>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="search" placeholder={placeholder} onChange = {handleChange}/>
                </Form.Group>
            </Form>
        </div>
    )
}

export default SearchBox;