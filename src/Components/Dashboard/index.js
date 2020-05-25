import React from 'react';
import {Tabs} from 'antd'
import EventTypes from '../EventTypes/Components';
import ScheduledEvents from '../ScheduledEvents/Components';
const {TabPane}=Tabs

function Index(props) {
    return (
        <Tabs defaultActiveKey="1" size={"large"}>
            <TabPane tab="Event Types" key="1">
                <EventTypes />
            </TabPane>
            <TabPane tab="Scheduled Events" key="2">
                <ScheduledEvents />
            </TabPane>
        </Tabs>
    );
}

export default Index;