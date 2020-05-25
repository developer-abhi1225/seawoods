import React, {Component} from 'react';
import {Button, Card, Form, Input} from "antd";

class PersonalDetails extends Component {

    submitDetails = e => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err){
                this.props.submitDetails(values)
            }
        })
    }

    render() {
        return (
            <Card title={"Personal Details"}>
                <Form layout={"inline"} onSubmit={this.submitDetails}>
                    <Form.Item label={"First Name"}>
                        {
                            this.props.form.getFieldDecorator('first_name',{
                                rules:[
                                    {
                                        required:true,
                                        message:"First Name is required"
                                    }
                                ]
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item label={"last Name"}>
                        {
                            this.props.form.getFieldDecorator('last_name',{
                                rules:[
                                    {
                                        required:true,
                                        message:"Last Name is required"
                                    }
                                ]
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item label={"Email"}>
                        {
                            this.props.form.getFieldDecorator('email',{
                                rules:[
                                    {
                                        required:true,
                                        message:"Email is required"
                                    }
                                ]
                            })(<Input type={"email"} />)
                        }
                    </Form.Item>
                    <Button style={{float:"right"}} type={"primary"} htmlType={"submit"}> Schedule Event</Button>
                </Form>
            </Card>
        );
    }
}

const personalDetailsForm = Form.create({name:"personalDetailsForm"})(PersonalDetails)
export default personalDetailsForm;