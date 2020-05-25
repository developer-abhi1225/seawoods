import React from 'react';
import {connect} from 'react-redux';
import {Avatar, Col, Collapse, List, Pagination, Row} from "antd";
import {getScheduledEvents} from "../Actions";
import find from "lodash/find";
import forEach from "lodash/forEach";
import map from "lodash/map";
import moment from "moment";

const {Panel} = Collapse;
class ScheduleEventList extends React.Component{
    constructor() {
        super();
        this.state = {
            eventListData:{}
        }
    }

    componentDidMount() {
        const {userDetails} = this.props.auth;
        const filters = {
            page:1,
            limit:10,
            key:"event_date",
            sort:"asc",
        }
        this.props.getScheduledEvents({user_id:userDetails.id , filters})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.scheduleEvents.scheduleEvents !== prevProps.scheduleEvents.scheduleEvents){
            const data = {};
            forEach(this.props.scheduleEvents.scheduleEvents,item => {
                const date = moment(item.event_date).format("DD-MMM-YYYY")
                if(!data[date]){
                    data[date] = [];
                }
                data[date].push(item)
            });
            this.setState({
                eventListData:data
            })
        }
    }

    renderList = item => {
        const event = find(this.props.event_types,{id:item.event_id}) ?.event_name
        return(
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<Row>
                        <Col lg={12} md={12}>
                            {item.from_time} - {item.to_time}
                        </Col>
                        <Col lg={12} md={12}>
                            <span>{`${item.first_name} ${item.last_name}`}</span>
                        </Col>
                    </Row>}
                    description={
                        <Row  type={"flex"} align={"middle"} >
                            <Col lg={12} md={12}>
                            </Col>
                            <Col lg={12} md={12}>
                                <span>EventType <b>{event}</b></span>
                            </Col>
                        </Row>
                    }
                />
                <div>

                </div>
            </List.Item>
        )
    }

    renderPanels = () => {
        let count = 0;
        return  map(this.state.eventListData,(item, index) =>{
                count++
                return <Panel key={count} header={index}>
                    <List
                        itemLayout="horizontal"
                        dataSource={item}
                        renderItem={this.renderList}
                    />
                </Panel>
        }
        )
    }

    pageChange = (page, pageSize) => {
        const filters = {
            page:page,
            limit:pageSize,
            key:"event_date",
            sort:"asc",
        }
        const {userDetails} = this.props.auth;
        this.props.getScheduledEvents({user_id:userDetails.id , filters})
    }

    render() {
        return (
            <div>
                <Row>
                    <Collapse accordion={true}>
                        {this.renderPanels()}
                    </Collapse>
                </Row>
                <br/>
                <Row type={"flex"} justify={"end"}>
                    <Pagination
                        onChange={this.pageChange}
                        current={1}
                        pageSize={10}
                        showTotal={() => `Displaying 3 of 3 items`}
                        total={100}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        auth:state.auth,
        scheduleEvents: state.scheduleEvents,
        event_types: state.eventTypes.event_types
    }
}
const mapDispatchToProps = {
    getScheduledEvents
}
export default connect(mapStateToProps,mapDispatchToProps)(ScheduleEventList);