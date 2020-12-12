import React, { useState } from 'react'
import ItemContent from './ItemContent'
import Comments from '../Comments'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames'
import NewComment from '../NewComment'

const ItemContainer = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const handleComment = (comment) => { 
        props.addComment(comment)
        setActiveTab('2')
    }
    return (
        <div className="content">
            <br></br>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Content
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Comments
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        Write Comment
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <ItemContent item={props.item}></ItemContent>
                </TabPane>
                <TabPane tabId="2">
                    <Comments admin={false} comments={props.comments} toggleVote={(upvoted, downvoted, action, id, i) => props.toggleVote(upvoted, downvoted, action, id, i)}></Comments>
                </TabPane>
                <TabPane tabId="3">
                    <NewComment type="item" item_id={props.item._id} handleComment={(comment) => handleComment(comment)}></NewComment>
                </TabPane>
            </TabContent>
        </div>
    )
}

export default ItemContainer