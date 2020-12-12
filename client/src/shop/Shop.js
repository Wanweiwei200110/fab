import React, { Component } from 'react'
import ItemCards from '../card/ItemCards'
import SearchBox from '../SearchBox'
import '../css/ItemAndPost.css'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'

class Shop extends Component {
    state ={
        searchField: '',
        items: [],
        loading: true
    }

    handleChange = (e) => {
        this.setState({searchField: e.target.value})
    }

    async componentDidMount() {

        try {
            const response = await fetch('/api/shop', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })

            const data = await response.json()
            this.setState({
                items: data,
                loading: false
            })
            
        } catch (err) {
            console.log(err)
        }
    
    }

    render() {
        if (this.state.loading) {
            return (<p>loading...</p>) 
        } else {
            const { searchField } = this.state
            const filteredItems = this.state.items.filter(item => (
                item.title.toLowerCase().includes(searchField.toLowerCase())
            ))

            const carousel = this.state.items.map((item, ind) => 
                { return (<Carousel.Item className="carousel-shop" key={ind}>
                    <Link to={'/shop/' + item._id}>
                        <img
                        className="d-block w-100 carouselImage"
                        src={item.images[0]}
                        alt="item img"
                        />
                        <Carousel.Caption>
                        <h3>{item.title.length < 50 ? item.title : item.title.slice(0, 50) + '...'}</h3>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>)
                })
            return (
                <Container>
                    <Carousel className="carousel">
                        {carousel}
                    </Carousel>
                    <Container className="searchContainer">
                        <SearchBox id="itemSearchBox" placeholder="Search for items..." handleChange={this.handleChange}></SearchBox>
                    </Container>
                    <br></br>
                    <ItemCards items ={filteredItems}></ItemCards>
                </Container>
                    
            )
        }
    }
}


export default Shop


