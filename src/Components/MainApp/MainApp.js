import React, {Component} from "react";
import {connect} from 'react-redux';
import {Layout, Spin} from "antd";
import NavBar from "../NavBar";
import isEmpty from "lodash/isEmpty";
import {resetAuth, userLogin} from "../Auth/Actions";

const {Content} = Layout;

class MainApp extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        if (this.props.auth.loginStatus === false || isEmpty(this.props.auth.userDetails)) {
            this.props.userLogin(JSON.parse(localStorage.getItem("token")))
        }
    }

    logout = e => {
        localStorage.clear("token");
        this.props.resetAuth()
        this.props.history.push("/login")
    }

    render() {
        return (
            <Spin spinning={this.props.auth.loading}>
                <Layout>
                    <Content>
                        <NavBar auth={this.props.auth} logout={this.logout}/>
                        <div style={{background: "#fff !important", padding: "50px", minHeight: "280px"}}>
                            {this.props.auth.loginStatus ? this.props.children : ""}
                        </div>
                    </Content>
                </Layout>
            </Spin>
    );
    }
}

const mapStateToProps = state => {
    return {
        auth : state.auth
    }
}
const mapDispatchToProps = {
    userLogin,
    resetAuth
}
export default connect(mapStateToProps,mapDispatchToProps)(MainApp)