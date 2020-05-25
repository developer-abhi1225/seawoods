import React, {Component} from 'react';
import {Card, List} from "antd";
import moment from "moment";
import filter from "lodash/filter"
import difference from "lodash/difference"
class TimePicker extends Component {

    constructor() {
        super();
        this.state = {
            timeSlots:[]
        }
    }

    componentDidMount() {
        try{
            let startTime = moment("10:00",'HH:mm');
            const data = [];
            do {
                data.push(startTime.format("HH:mm A"))
                startTime.add(15, 'minutes')

            }while(startTime.format("HH:mm") !== "17:15")
            this.setState({timeSlots:data})
        }
        catch(err){
            console.log("err",err.message)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.appointmentData.event_date !== prevProps.appointmentData.event_date){
            const dateFilter = filter(this.props.scheduleEvents, item => {
                const scheduleDate = moment(item.event_date).format("YYYY-MM-DD")
                const appointmentDate = moment(this.props.appointmentData.event_date).format("YYYY-MM-DD")
                return scheduleDate === appointmentDate
            })
            if(dateFilter.length){
                try{
                    let startTime = moment("10:00",'HH:mm') ;
                    const data = [];
                    const removeTime = [];
                    do {
                        dateFilter.forEach(date => {
                            const scheduleStartTime = moment(date.from_time,"HH:mm")
                            const scheduleEndTime = moment(date.to_time,"HH:mm")
                            const startTimeEqualToScheduleStartTime = startTime.format("HH:mm") === scheduleStartTime.format("HH:mm")
                            const startTimeEqualToScheduleEndTime = startTime.format("HH:mm") === scheduleEndTime.format("HH:mm")
                            if(startTime.isBetween(scheduleStartTime,scheduleEndTime) || startTimeEqualToScheduleStartTime || startTimeEqualToScheduleEndTime){
                                    removeTime.push(startTime.format("HH:mm A"))
                            }
                        })
                        data.push(startTime.format("HH:mm A"))
                        startTime.add(15, 'minutes')
                    }while(startTime.format("HH:mm") !== "17:15")
                    this.setState({timeSlots:difference(data,removeTime)})
                }
                catch(err){
                    console.log("err",err.message)
                }
            }
        }
    }

    renderListItems = item => {
        const selected = this.props.appointmentData.from_time === item
        return <List.Item onClick={() => {this.props.setEventTime(item)}} className={`${selected ? "timePicker selected":"timePicker"}`}><span>{item}</span></List.Item>
    }

    render() {
        return (
            <Card title={"Time Slot"}>
                <List dataSource={this.state.timeSlots} renderItem={this.renderListItems}/>
            </Card>
        );
    }
}

export default TimePicker;