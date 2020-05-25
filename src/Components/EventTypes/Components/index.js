import React from 'react';
import {connect} from "react-redux";
import {Button, Card, Divider, Drawer, Row, Icon, Empty, notification, message} from "antd";
import {Link} from "react-router-dom";
import EventTypeCard from "./EventTypeCard";
import AddEditEventType from "./AddEditEventType";
import {addEventTypes, requestEventTypes, updateEventTypes} from "../Actions";
import get from "lodash/get"
import isEmpty from "lodash/isEmpty"
import {CopyToClipboard} from "react-copy-to-clipboard";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addEventTypeDrawerVisibility: false,
            eventDrawerData: {},
        }
    }

    componentDidMount() {
        const {eventTypes, auth} = this.props;
        if (isEmpty(eventTypes.event_types)) {
            this.props.requestEventTypes({user_id: auth.userDetails.id})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {auth} = this.props;
        if (prevProps.eventTypes.updateStatus !== this.props.eventTypes.updateStatus && this.props.eventTypes.updateStatus) {
            notification.success({message: "Record has been updated successfully"});
            this.props.requestEventTypes({user_id: auth.userDetails.id})
            this.toggleDrawerVisibility()
        } else if (this.props.eventTypes.updateStatus === false) {
            notification.error({message: "Something went wrong please try again later"});
        }

        if (prevProps.eventTypes.createStatus !== this.props.eventTypes.createStatus && this.props.eventTypes.createStatus) {
            notification.success({message: "Record has been created successfully"});
            this.props.requestEventTypes({user_id: auth.userDetails.id})
            this.toggleDrawerVisibility()
        } else if (this.props.eventTypes.createStatus === false) {
            notification.error({message: "Something went wrong please try again later"});
        }
    }

    toggleDrawerVisibility = () => this.setState({addEventTypeDrawerVisibility: !this.state.addEventTypeDrawerVisibility,})

    addNewEventType = () => {
        this.setState({
            eventDrawerData: {},
            addEventTypeDrawerVisibility: true
        })
    }

    editEventType = payload => {
        this.setState({
            eventDrawerData: payload,
            addEventTypeDrawerVisibility: true
        })
    }

    submitEventType = payload => {
        const {userDetails} = this.props.auth
        payload = {...payload, user_id: userDetails.id}
        payload.id === -1 ? this.props.addEventTypes(payload) : this.props.updateEventTypes(payload)
    }

    render() {
        const {event_types, loading} = this.props.eventTypes;
        return (
            <React.Fragment>
                <Card bordered={true} loading={loading}>
                    <Row gutter={30} type={"flex"} justify={"space-between"}>
                        <CopyToClipboard text={`${window.location.origin}/appointment/${this.props.auth.userDetails.id}`} onCopy={() => {message.info("Copied to clipboard")}}>
                            <div className={"share-link"}>
                                <b>My Link</b>
                                <p>{`Schedule a meeting with ${this.props.auth.userDetails.first_name} ${this.props.auth.userDetails.last_name}`}</p>
                            </div>
                        </CopyToClipboard>
                        <div>
                            <Button onClick={this.addNewEventType} ghost type={"primary"}
                                    icon={<Icon type={"add"}/>}> New Event Type</Button>
                        </div>
                    </Row>
                    <Divider/>
                    <Row gutter={30}>
                        {
                            !event_types.length ? <Empty/> : event_types.map(item => <EventTypeCard data={item}
                                                                                                    onEditEventType={this.editEventType}/>)
                        }
                    </Row>
                </Card>
                <Drawer
                    title={`${isEmpty(this.state.eventDrawerData) ? "Add" : "Edit"} Event Type`}
                    width={"40%"}
                    placement={"right"}
                    closable={false}
                    destroyOnClose
                    visible={this.state.addEventTypeDrawerVisibility}
                    onClose={this.toggleDrawerVisibility}
                >
                    <React.Fragment>
                        <AddEditEventType data={this.state.eventDrawerData} onSubmitEventType={this.submitEventType}/>
                    </React.Fragment>
                </Drawer>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        eventTypes: get(state, "eventTypes", {}),
        auth: get(state, "auth", {})
    }
}

const mapDispatchToProps = {
    requestEventTypes,
    updateEventTypes,
    addEventTypes
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);