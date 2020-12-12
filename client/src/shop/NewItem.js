import React, { Component } from 'react'
import { Form, Row } from 'react-bootstrap'
import '../css/Forum.css'
import { connect } from 'react-redux'
import { createNewItem } from '../actions/ItemAction'

class NewItem extends Component {
    state = {
        title: '',
        body: '',
        price: '',
        user: this.props.user,
        images: []
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.usertype !== 'admin'){
            this.props.addItem(this.state.title, this.state.body, this.state.images, this.state.price, this.props)
        }else{
            alert("Not authorized to publish item info.")
        }
     }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    saveImgs = (e) => {
        this.setState({
            images: e.target.files
        })
    }

    render() {
        return (
            <div id='newItemForm'>
                <h2>Post a new item</h2>
               <Form>
                    <Form.Group as={Row} controlId="titleMessage" size="lg">
                        <Form.Label column sm="8" >
                        It's time to be creative!
                        </Form.Label>
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Control placeholder="Item Title" onChange={this.handleChange}/>
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Control placeholder="Item Price" onChange={this.handleChange}/>
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                    <input id="fileButton" type="file" multiple onChange={(e) => this.saveImgs(e)}/>
                    <Form.Group controlId="body">
                        <Form.Label></Form.Label>
                        <Form.Control as="textarea" rows={8} placeholder="Item Description" onChange={this.handleChange}/>
                    </Form.Group>
                    <button type="submit" onClick={this.handleSubmit}>
                        Post
                    </button>
                </Form> 
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

const mapDispatchToProps = (dispatch) => {
    return{
        addItem: (title, body, imageLink, price, props) =>{ dispatch(createNewItem(title, body, imageLink, price, props))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewItem)