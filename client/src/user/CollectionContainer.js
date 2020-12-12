import React, { useState } from 'react'
import CollectionCards from '../card/CollectionCards'
import ItemCards from '../card/ItemCards'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container } from 'reactstrap'
import classnames from 'classnames'

const CollectionContainer = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    
    return (
        <Container>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Posts
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Items
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <br></br>
                    <Row>
                        <Col sm="12">
                            <CollectionCards type='collection' posts = {props.posts}></CollectionCards>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                <br></br>
                    <Row>
                        <Col sm="12">
                            <ItemCards type='item' items = {props.items}></ItemCards>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </Container>
    )
}

export default CollectionContainer