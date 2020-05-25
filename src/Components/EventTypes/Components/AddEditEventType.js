import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, Radio, Row} from "antd";

const AddEditEventType = props => {
    const [hideCustomDurationField, hideVisibility] = useState(true);

    useEffect(() => {
        if(props.data.event_duration && [15,30,45,60].indexOf(data.event_duration) <= -1){
            hideVisibility(false)
        }
    },props.data.event_duration)

    const handleCustomDurationFieldVisibility = e => e.target.value ? hideVisibility(true) : hideVisibility(false)
    const submitForm = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                let {event_name, event_duration, event_custom_duration} = values;
                const payload = {
                    event_name,
                    event_duration : event_duration ? event_duration : event_custom_duration
                }
                props.onSubmitEventType({id: props.data.id ? props.data.id : -1, payload})
            }
        })
    }
    const {data} = props;
    return (
        <div className={"addEditEventType"}>
            <Form layout={"vertical"} wrapperCol={{span: 20}} onSubmit={submitForm}>
                <Form.Item label={"Event Name"}>
                    {
                        props.form.getFieldDecorator("event_name", {
                            rules:
                                [
                                    {
                                        required: true,
                                        message: "Please enter event name."
                                    }
                                ],
                            initialValue: data.event_name ? data.event_name : ""

                        })(<Input/>)
                    }
                </Form.Item>
                <Form.Item label={"Event Duration"}>
                    {
                        props.form.getFieldDecorator('event_duration', {
                            rules: [
                                {
                                    required: true,
                                    message: "Please enter event duration."
                                }
                            ],
                            initialValue: !data.event_duration ? 15 : data.event_duration && [15, 30, 45, 60].indexOf(data.event_duration) > -1 ? data.event_duration : 0

                        })(<Radio.Group onChange={handleCustomDurationFieldVisibility}>
                            <Radio.Button value={15}>15 Mins</Radio.Button>
                            <Radio.Button value={30}>30 Mins</Radio.Button>
                            <Radio.Button value={45}>45 Mins</Radio.Button>
                            <Radio.Button value={60}>60 Mins</Radio.Button>
                            <Radio.Button value={0}>Custom Mins</Radio.Button>
                        </Radio.Group>)
                    }
                </Form.Item>
                <Form.Item
                    style={{display: `${hideCustomDurationField ? "none" : "block"}`}}
                    label={"Event Custom Duration"}
                >
                    {
                        props.form.getFieldDecorator('event_custom_duration', {
                            rules: [
                                {
                                    required: true,
                                    message: "Please enter event custom duration."
                                }
                            ],
                            initialValue: data.event_duration && [15, 30, 45, 60].indexOf(data.event_duration) <= -1 ? data.event_duration : 15
                        })
                        (<InputNumber
                            min={15}
                            max={120}
                        />)
                    }
                </Form.Item>
                <Row>
                    <div className={"footerButtons"}>
                        <Button>
                            Cancel
                        </Button>
                        <Button type={"primary"} htmlType={"submit"}>
                            Save
                        </Button>
                    </div>
                </Row>
            </Form>
        </div>
    );
};
const AddEditEventTypeForm = Form.create({name: "addForm"})(AddEditEventType)
export default AddEditEventTypeForm;