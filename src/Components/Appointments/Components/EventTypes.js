import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestEventTypes} from "../../EventTypes/Actions";
import {Avatar, Card, List} from "antd";


class EventTypes extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.requestEventTypes({user_id: this.props.user_id})
    }

    renderList = item => {
        console.log("item",item)
        return (
            <List.Item
                className={`${item.id === this.props.appointmentData.event_id ? "eventTypes selected" : "eventTypes"}`}
                onClick={() => {
                    this.props.setEventType(item.id)
                }}>
                <span>{`${item.event_name} - `}{`${item.event_duration} Mins`}</span>
            </List.Item>
        )
    }

    render() {
        return (
            <Card title={"Event Type"}>
                <List dataSource={this.props.event_types} renderItem={this.renderList}/>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        event_types: state.eventTypes.event_types
    };
}

const mapDispatchToProps = {
    requestEventTypes
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventTypes);