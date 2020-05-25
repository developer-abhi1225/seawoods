import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Form, Input, notification, Row} from "antd";
import {createUser} from "../Actions";



class Signup extends Component {

    validateConfirmPass = (rule,value,callback) => {
        const password = this.props.form.getFieldValue("password");
        if(password && password !== value){
            callback("Password doesnot match")
        }
        callback()
    }

    submit = e => {
        e.preventDefault();
        this.props.form.validateFields((err,values) => {
            if(!err){
                this.props.createUser(values);
            }
        })
        this.props.createUser()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.auth.createStatus !== prevProps.auth.createStatus && this.props.auth.createStatus){
            notification.success({message:"User created successfully"})
            this.props.history.push("/login")
        }
    }

    render() {
        return (
            <div className={"login-container"}>
                <Row type={"flex"} justify={"space-around"}>
                    <Card className={"login"} bordered title={"Sign Up"}>
                        <Form onSubmit={this.submit}>
                            <Form.Item label={"Enter your email to get started"}>
                                {
                                    this.props.form.getFieldDecorator('email', {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Email must be present."
                                            }
                                        ]
                                    })(
                                        <Input type={"email"}/>
                                    )
                                }
                            </Form.Item>
                            <Form.Item label={"Enter your First name"}>
                                {
                                    this.props.form.getFieldDecorator('first_name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: "first name must be present."
                                            }
                                        ]
                                    })(
                                        <Input />
                                    )
                                }
                            </Form.Item>
                            <Form.Item label={"Enter your Last name"}>
                                {
                                    this.props.form.getFieldDecorator('last_name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: "last name must be present."
                                            }
                                        ]
                                    })(
                                        <Input />
                                    )
                                }
                            </Form.Item>
                            <Form.Item label={"Choose a password with atleast 8 characters"}>
                                {
                                    this.props.form.getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Password must be present."
                                            },
                                            {
                                                min : 8,
                                                message:"Password must be atleast of 8 characters"
                                            }
                                        ]
                                    })(
                                        <Input type={"password"}/>
                                    )
                                }
                            </Form.Item>
                            <Form.Item label={"Confirm password"}>
                                {
                                    this.props.form.getFieldDecorator('confirm_password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Password must be present."
                                            },
                                            {
                                                validator:this.validateConfirmPass
                                            }
                                        ]
                                    }
                                    )(
                                        <Input type={"password"}/>
                                    )
                                }
                            </Form.Item>
                            <Form.Item>
                                <Button loading={this.props.auth.loading} type={"primary"} htmlType={"submit"}> Signup </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Row>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {auth:state.auth};
}

const mapDispatchToProps = {
    createUser
}

const asd = Form.create()(Signup)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(asd);