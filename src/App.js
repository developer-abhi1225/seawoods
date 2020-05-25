import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {history, store} from "./Stores";
import AppRoutes from './Components/MainApp'
import {BrowserRouter} from "react-router-dom";
import {Redirect, Route, Router, Switch} from "react-router";
import Login from "./Components/Auth/Components/Login";
import Signup from "./Components/Auth/Components/Signup";
import Appointment from "./Components/Appointments/Components/"

const RestrictedRoutes = ({component: Component, token, ...rest}) => {
    return <Route
        {...rest}
        render={() =>
            token ? (
                history.location.pathname !== "/login" ?
                    <Component/> : history.goBack()
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                    }}
                />
            )
        }
    />;
};

const NextApp = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path={"/login"} component={Login} />
                <Route exact path={"/signup"} component={Signup} />
                <Route exact path={"/appointment/:id"} component={Appointment} />
                <RestrictedRoutes path={"/"} token={localStorage.getItem("token")} component={AppRoutes}/>
            </Switch>
        </Router>
    )
}

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter history={history}>
                <NextApp />
            </BrowserRouter>
        </Provider>
    );
}

export default App;