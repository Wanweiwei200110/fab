import React, { Component }  from 'react'
import { Button, Collapse } from 'reactstrap'
import { Form } from 'react-bootstrap'
import { Edit } from '@icon-park/react'

class IntroContainer extends Component {
    state = {
        isOpen: false,
        intro: ''
    }

    handleChange = (e) => {
        this.setState({
            intro: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.changeIntro(this.state.intro)
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    componentDidMount() {
        this.setState({
            intro: this.props.intro
        })
    }

    render () {
        return (
            <div>
                <p>{this.props.intro}</p>
                {this.props.user === this.props.target && <div>
                    <button onClick={() => this.setState({isOpen: !this.state.isOpen})} style={{ marginBottom: '1rem' }}>
                        <Edit theme="outline" size="24" fill="#ffffff" strokeWidth={3} />{' '}Edit Introduction
                    </button>
                    <Collapse isOpen={this.state.isOpen}>
  
                        <Form>
                            <Form.Group controlId="commentText">
                                <Form.Control as="textarea" rows={8}
                                    placeholder="Write your new intro here"
                                    onChange={(e) => this.handleChange(e)} />
                            </Form.Group>
                            <Button outline block variant="primary" type="submit" onClick={(e) => this.handleSubmit(e)}>
                                Done
                            </Button>
                        </Form>
                        
                    </Collapse>
                </div>}
            </div>
        )
    }
    
}

export default IntroContainer