import React from 'react';
import Card from "antd/es/card";
import {Button, Col} from "antd";

const EventTypeCard = (props) => {
    const {event_name, event_duration} = props.data
    return (
        <Col md={6} className={"eventTypeCardContainer"}>
            <Card className={"eventTypeCard"} hoverable actions={[<Button onClick={() => {props.onEditEventType(props.data)}} type={"link"}> Edit </Button>]}>
                <h4>{event_name}</h4>
                <p>{`${event_duration} Mins`}</p>
            </Card>
        </Col>
    );
};

export default EventTypeCard;