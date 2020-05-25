import React, {Component} from 'react';
import {Button, Card, Form, Input, notification, Row} from "antd";
import {connect} from 'react-redux';
import {userLogin} from "../Actions";

class Login extends Component {
    constructor() {
        super();
    }

    submit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.userLogin(values)
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("this.props.auth.loginStatus",this.props.auth)
        if (this.props.auth.loginStatus) {
            console.log("pushing histort",this.props.history)
            this.props.history.push("/dashboard")
        } else if (this.props.auth.loginStatus === false) {
            notification.error({message:"Something went wrong. Please try again later"})
        }
    }

    render() {
        return (
            <div className={"login-container"}>
                <Row type={"flex"} justify={"space-around"}>
                    <Card className={"login"} bordered title={"Login"}>
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
                            <Form.Item label={"Choose a password with atleast 8 characters"}>
                                {
                                    this.props.form.getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Password must be present."
                                            },
                                            {
                                                min: 8,
                                                message: "Password must be atleast of 8 characters"
                                            }
                                        ]
                                    })(
                                        <Input type={"password"}/>
                                    )
                                }
                            </Form.Item>

                            <Row style={{marginTop:"10px"}} type={"flex"} justify={"space-between"}>
                                <Form.Item>
                                    <Button loading={this.props.auth.loading} type={"primary"}
                                            htmlType={"submit"}> Login </Button>
                                </Form.Item>
                                <Button style={{float: "right"}} type={"primary"} onClick={() => {
                                    this.props.history.push("/signup")
                                }}> Sign In </Button>
                            </Row>


                        </Form>
                    </Card>
                </Row>
            </div>
        );
    }
}

const loginForm = Form.create({name: "loginForm"})(Login)
const mapStatetoProps = state => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = {
    userLogin
}
export default connect(mapStatetoProps, mapDispatchToProps)(loginForm);