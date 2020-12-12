import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import Followings from './Followings'
import Followers from './Followers'
import OrderHistory from './OrderHistory'
import classnames from 'classnames'
import PostCards from '../card/PostCards'

const ProfileContainer = (props) => {
    const { posts, orderHistory } = props
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div id="postContent">
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
                        Following
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        Followers
                    </NavLink>
                </NavItem>
                {props.user === props.target && <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '4' })}
                        onClick={() => { toggle('4'); }}
                    >
                        Order History
                    </NavLink>
                </NavItem>}
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <PostCards type='post' posts={posts}></PostCards>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <Followings followings={props.followings} unfollow={(user) => props.unfollow(user)}></Followings>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Col sm="12">
                            <Followers followers={props.followers} followings= {props.followings}></Followers>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="4">
                    <Row>
                        <Col sm="12">
                            <OrderHistory orderHistory={orderHistory}></OrderHistory>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    )
}


export default ProfileContainer