import React from 'react';
import {Card, Tabs} from "antd";
import ScheduleEventList from "./ScheduleEventList";

const {TabPane} = Tabs

const Index = () => {
    return (
        <Card>
            <Tabs defaultActiveKey="1" size={"large"}>
                <TabPane tab="Upcoming" key="1">
                    <ScheduleEventList futureDate={true}/>
                </TabPane>
                <TabPane tab="Past" key="2">
                    <ScheduleEventList futureDate={false}/>
                </TabPane>
            </Tabs>
        </Card>
    );
};

export default Index;