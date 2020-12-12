import React, { Component } from 'react'
import { Col, Form, FormGroup, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { withRouter } from "react-router";

class OrderInfo extends Component {
  state = {
    taxRates: [
      { province: 'AB', tax: 0.05 },
      { province: 'BC', tax: 0.12 },
      { province: 'MB', tax: 0.12 },
      { province: 'NB', tax: 0.15 },
      { province: 'NL', tax: 0.15 },
      { province: 'NS', tax: 0.15 },
      { province: 'ON', tax: 0.13 },
      { province: 'PE', tax: 0.15 },
      { province: 'QC', tax: 0.14975 },
      { province: 'SK', tax: 0.11 },
      { province: 'NT', tax: 0.05 },
      { province: 'NU', tax: 0.05 },
      { province: 'YT', tax: 0.05 }
    ],
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    province: '',
    totalBeforeTax: this.props.totalBeforeTax, 
    total: this.props.totalBeforeTax
  }

  handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!this.state.firstName || !this.state.lastName || !this.state.address || !this.state.province) {
        alert('Missing required information.')
      } else {
        let items = []
        for (let i = 0; i < this.props.items.length; i++) {
          items.push({item: this.props.items[i].item._id, qty: this.props.items[i].qty, title: this.props.items[i].item.title})
        }

        //fetch post request
        await fetch('/api/' + this.props.user + '/order/post', {
          method: 'POST',
          body: JSON.stringify({username: this.props.user, firstname: this.state.firstName, lastname: this.state.lastName, email: this.state.email, phoneNum: this.state.phone, address: this.state.address, province: this.state.province, items: items, total: this.state.total}),
          headers: {'Content-Type': 'application/json'}
        });

        // clean up this user's cart
        await fetch('/api/' + this.props.user + '/cart/clean', {
          method: 'PATCH',
          body: JSON.stringify({username: this.props.user}),
          headers: {'Content-Type': 'application/json'}
        });

        alert('Thank you for shopping!')
        this.props.history.push('/')
      }
    }catch (err) {
      console.log(err)
    }
  }

  handleChange = (e) => {
    const prov = this.state.taxRates.filter(province => {
      return province.province === e.target.value
    })
    if (prov.length === 1) {
      const total = Math.round(this.props.totalBeforeTax * (1 + prov[0].tax) * 100) / 100
      this.setState({ total })
      this.setState({ province: e.target.value })
    } else {
      this.setState({
        province: '',
        total: this.props.totalBeforeTax
      })
    }
  }

  render() {
    return (
      <div>
        <br></br>
        <Form className="orderInfoFields">
          <FormGroup row>
            <Col sm={{ size: 10, offset: 1 }}>
              <Input name="firstName" id="firstName" placeholder="First Name" onChange={e => this.setState({ firstName: e.target.value })} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 10, offset: 1 }}>
              <Input name="lastName" id="lastName" placeholder="Last Name" onChange={e => this.setState({ lastName: e.target.value })} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 10, offset: 1 }}>
              <Input type="phone" id="phone" placeholder="Phone" onChange={e => this.setState({ phone: e.target.value })} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 10, offset: 1 }}>
              <Input type="email" id="email" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 10, offset: 1 }}>
              <Input type="address" id="address" placeholder="Address" onChange={e => this.setState({ address: e.target.value })} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 10, offset: 1 }}>
              <Input type="select" id="province" placeholder="Province" onChange={e => this.handleChange(e)}>
                <option>Select Province</option>
                <option>AB</option>
                <option>BC</option>
                <option>MB</option>
                <option>NB</option>
                <option>NL</option>
                <option>NT</option>
                <option>NS</option>
                <option>NU</option>
                <option>ON</option>
                <option>PE</option>
                <option>QC</option>
                <option>SK</option>
                <option>YT</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 1 }}>
              <h3>Total: ${Math.round(this.state.total * 100) / 100}</h3>
              <button onClick={e => this.handleSubmit(e)}>Checkout</button>
            </Col>
          </FormGroup>
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

export default connect(mapStateToProps)(withRouter(OrderInfo))