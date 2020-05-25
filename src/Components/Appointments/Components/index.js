import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserDetails, resetAppointments} from "../Actions";
import {Avatar, Button, Card, Col, Modal, notification, Result, Row, Spin, Steps} from "antd";
import EventTypes from "./EventTypes";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker"
import PersonalDetails from "./PersonalDetails";
import find from "lodash/find";
import filter from "lodash/filter";
import moment from "moment";
import {createScheduleEvent, getScheduledEvents} from "../../ScheduledEvents/Actions";

const {Step} = Steps;


class Index extends Component {
    constructor() {
        super();
        this.state = {
            stepNumber: 0,
            appointmentData: {}
        }
    }

    setStepNumber = number => {
        this.setState({
            stepNumber: number
        })
    }

    componentDidMount() {
        this.props.getScheduledEvents({user_id: this.props.match.params.id})
        this.props.getUserDetails({user_id: this.props.match.params.id})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.appointments.createSchedule !== prevProps.appointments.createSchedule && this.props.appointments.createSchedule){
            notification.success({message:"Record created successfully"})
        }

    }

    setEventType = id => {
        this.setState({
            ...this.state,
            appointmentData: {
                ...this.state.appointmentData,
                event_id: id,
            },
            stepNumber: 1
        })
    }

    setEventDate = date => {
        this.setState({
            ...this.state,
            appointmentData: {
                ...this.state.appointmentData,
                event_date: date,
            },
            stepNumber: 2
        })
    }

    setEventTime = time => {
        const event = find(this.props.event_types, {id: this.state.appointmentData.event_id})
        if (event) {
            const from_time = time;
            const to_time = moment(time, 'HH:mm').add(event.event_duration, "minutes").format("HH:mm A")
            this.setState({
                ...this.state,
                appointmentData: {
                    ...this.state.appointmentData,
                    from_time,
                    to_time,
                },
                stepNumber: 3
            })
        }
    }

    submitDetails = formData => {
        const {event_id, event_date, from_time, to_time} = this.state.appointmentData;
        const payload = {
            ...formData,
            ...this.state.appointmentData,
            user_id:this.props.match.params.id
        }
        if(!event_id){
            notification.error({message:"Please select an event type"})
            return
        }
        if(!event_date){
            notification.error({message:"Please select an event date"})
            return
        }
        if(!from_time || !to_time){
            notification.error({message:"Please select an event time"})
            return
        }
        this.props.createScheduleEvent(payload)
    }

    closeModal = () => {
        this.setState({
            stepNumber: 0,
            appointmentData: {}
        },() => {this.props.resetAppointments(); this.props.getScheduledEvents({user_id: this.props.match.params.id})
        })
    }

    render() {
        const {userDetails} = this.props.appointments
        const eventType = filter(this.props.event_types,{id:this.state.appointmentData.event_id})
        const eventDate = this.state.appointmentData.event_date ?this.state.appointmentData.event_date.format("dddd, MMM DD, YYYY") : ""
        const eventTime = this.state.appointmentData.from_time ? `${this.state.appointmentData.from_time} to ${this.state.appointmentData.to_time}`:""
        const name =this.state.appointmentData.first_name ? `${this.state.appointmentData.first_name.charAt(0).toUpperCase()}${this.state.appointmentData.last_name.charAt(0).toUpperCase()}` : ""
        return (
            <Spin spinning={this.props.appointments.loading || this.props.scheduleEvents.loading } >
                <Row className={"appointment-container"}>
                    <Card className={"navbar-dark bg-primary"} style={{textAlign: "center", marginBottom: "20px"}}>
                        <Avatar size={"large"} src={userDetails.avatar}/>
                        <Card.Meta
                            description={"Welcome to my scheduling page. Please follow the instructions to add an event to my calendar"}
                            title={
                                <h3>{userDetails.first_name ? userDetails.first_name : ""} {userDetails.last_name ? userDetails.last_name : ""}</h3>}
                        />
                    </Card>
                </Row>
                <Row>
                    <Card className={"steps-container"}>
                        <Steps onChange={this.setStepNumber} current={this.state.stepNumber}>
                            <Step title="Event Type"
                                  description ={eventType.length ?  `${eventType[0].event_name} - ${eventType[0].event_duration} Mins` : ""}/>
                            <Step title="Date" description={eventDate ? eventDate : ""}/>
                            <Step title="Time Slot" description={eventTime}/>
                            <Step title="Personal Details" description={name}/>
                        </Steps>
                        <Row gutter={30} className={"steps-content appointment"}>
                            <div className={"appointment-container"}>
                                <Col lg={6} md={6}>
                                    <EventTypes appointmentData={this.state.appointmentData}
                                                user_id={this.props.match.params.id} setEventType={this.setEventType}/>
                                </Col>
                            </div>
                            <div className={"appointment-container"} hidden={!(this.state.stepNumber >= 1)}>
                                <Col lg={6} md={6}>
                                    {this.state.stepNumber >= 1 ? <DatePicker scheduleEvents={this.props.scheduleEvents.scheduleEvents} setEventDate={this.setEventDate}/> : ""}
                                </Col>
                            </div>
                            <div className={"appointment-container"} hidden={!(this.state.stepNumber >= 2)}>
                                <Col lg={6} md={6}>
                                    {this.state.stepNumber >= 1 ?
                                        <TimePicker
                                                    scheduleEvents={this.props.scheduleEvents.scheduleEvents}
                                                    appointmentData={this.state.appointmentData}
                                                    setEventTime={this.setEventTime}/> : ""}
                                </Col>
                            </div>
                            <div className={"appointment-container"} hidden={!(this.state.stepNumber === 3)}>
                                <Col lg={6} md={6}>
                                    {this.state.stepNumber === 3 ? <PersonalDetails submitDetails={this.submitDetails}/> : ""}
                                </Col>
                            </div>
                        </Row>
                    </Card>
                </Row>
                <Modal
                    visible={this.props.scheduleEvents.createSchedule}
                    footer={null}
                >
                    <Result
                        status={"success"}
                        title={"Confirmed"}
                        subTitle={`You are confirmed with ${userDetails.first_name} ${userDetails.last_name}`}
                        extra={[
                            <Button key="buy" onClick={this.closeModal}>Close</Button>,
                            <Button type="primary" onClick={this.closeModal} key="console">
                                Schedule another event
                            </Button>
                        ]}
                    />
                </Modal>
            </Spin>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        appointments: state.appointments,
        event_types: state.eventTypes.event_types,
        scheduleEvents:state.scheduleEvents

    };
}
const mapDispatchToProps = {
    getUserDetails,
    resetAppointments,
    createScheduleEvent,
    getScheduledEvents
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);