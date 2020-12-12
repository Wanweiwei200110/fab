import React, { useState } from 'react'
import PostCards from '../card/PostCards'
import Comments from '../Comments'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import classnames from 'classnames'

//remove these later
const ReportedContainer = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Reported Posts
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Reported Comments
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <PostCards posts={props.posts} admin={true} deletePost={(e, id) => props.deletePost(e, id)} unreportPost={(e, id) => props.unreportPost(e, id)}></PostCards>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <Comments comments={props.comments} admin={true} deleteComment={(e, id) => props.deleteComment(e, id)} unreportComment={(e, id) => props.unreportComment(e, id)}></Comments>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    )
}

export default ReportedContainer