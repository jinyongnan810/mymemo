import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Header from "./layouts/Header";
import store from "../store";
import Dashboard from "./layouts/Dashboard";
import Register from "./accounts/Register";
import Login from "./accounts/Login";
import Alerts from "./layouts/Alerts";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";
import { load_user } from "../actions/auth";

const alertOptions = {
    timeout: 3000,
    position: "bottom center"
};
export class App extends Component {
    componentDidMount() {
        store.dispatch(load_user());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <Switch>
                                <PrivateRoute exact path="/" component={Dashboard} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                            </Switch>
                        </Fragment>
                    </Router>
                </AlertProvider>

            </Provider>

        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
// export default App
