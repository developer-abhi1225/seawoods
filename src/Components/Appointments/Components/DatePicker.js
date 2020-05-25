import React, {Component} from 'react';
import {Calendar, Card} from "antd";
import moment from "moment";
import difference from "lodash/difference";
import filter from "lodash/filter";
class DatePicker extends Component {

    disabledDates = date => {
        return !date.isAfter(moment()) || this.disableDate(date)
    }

     disableDate = date => {
        const dateFilter = filter(this.props.scheduleEvents, item => {
            const scheduleDate = moment(item.event_date).format("YYYY-MM-DD")
            const appointmentDate = moment(date).format("YYYY-MM-DD")
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
                return !difference(data,removeTime).length
            }
            catch(err){
                console.log("err",err.message)
            }
        }
        else{
            return false
        }

    }
    render() {
        return (
            <Card title={"Date"}>
                <Calendar fullscreen={false} onSelect={this.props.setEventDate} disabledDate={this.disabledDates}  />
            </Card>
        );
    }
}

export default DatePicker;