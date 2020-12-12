import React, { Component } from 'react'
import { Form, Row } from 'react-bootstrap'
import '../css/Forum.css'
import { connect } from 'react-redux'
import { createNewPost } from '../actions/PostAction'
import { Delete } from '@icon-park/react'
class NewPost extends Component {
    state = {
        title: '',
        body: '',
        user: this.props.user,
        images: [],
        items: [],
        filteredItems: [],
        link: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.user){
            this.props.addPost(this.state.title, this.state.body, this.state.images, this.state.user, this.state.link, this.props)
        }else{
            alert("No user loged in.")
        }
    }

    onInputChange = (word) => {
        let items = this.state.items.filter(item => {
            return item.title.includes(word)
        })
        this.setState({
            filteredItems: items
        })
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

    setLink = (item) => {
        this.setState({
            link: '/shop/' + item._id
        })
    }

    async componentDidMount() {
        try {
            const response = await fetch('/api/shop', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            this.setState({
                items: data
            })
            
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div id='newPostForm'>
                <h2>Create a new post</h2>
                <Form>
                    <Form.Group as={Row} controlId="titleMessage" size="lg">
                        <Form.Label column sm="8" >
                        It's time to be creative!
                        </Form.Label>
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Control placeholder="Your Post Title" onChange={this.handleChange}/>
                        <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                    <input id="fileButton" type="file" multiple onChange={(e) => this.saveImgs(e)}/>

                    <Form.Group controlId="body">
                        <Form.Label></Form.Label>
                        <Form.Control as="textarea" rows={8} placeholder="Your Post Content" onChange={this.handleChange}/>
                    </Form.Group>
                    <div>Link to shop item (optional): {this.state.link}</div> 
                    {this.state.link.length > 0 && <button className="linkBtn" onClick={() => this.setState({link: ''})}>
                        <Delete theme="outline" size="24" fill="#000000"/>{'    '}Remove
                    </button>}
                    <div className="search-bar-dropdown">
                        <input
                            id="search-bar"
                            type="text"
                            className="form-control"
                            placeholder="Search for a shop item"
                            onChange={(e) => this.onInputChange(e.target.value)}
                        />
                        <ul id="results" className="list-group" >
                            {this.state.filteredItems.map((item, index) => {
                            return (
                                <button
                                type="button"
                                key={index}
                                onClick = {() => this.setLink(item)}
                                className="list-group-item list-group-item-action"
                                >
                                {item.title}
                                </button>
                            );
                            })}
                        </ul>
                        </div>
                        <br></br>
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
        user: state.userReducer.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addPost: (title, body, imageLink, auth, link, props) =>{ dispatch(createNewPost(title, body, imageLink, auth, link, props))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewPost)