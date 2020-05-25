import React, {Component} from 'react';
import Dashboard from '../Dashboard'
import { Route, Router, Switch} from "react-router";
import {history} from "../../Stores";
import MainApp from './MainApp'
const Routes = ({component: Component,  ...rest}) =>  <Route { ...rest} render={() => <MainApp history={history}><Component /></MainApp> }/>

class AppRoutes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Routes exact={true} path={'/dashboard'} component={Dashboard} />
                </Switch>
            </Router>
        )
    }
}

export default AppRoutes;