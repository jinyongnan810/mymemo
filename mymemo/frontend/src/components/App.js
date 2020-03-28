import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Header from "./layouts/Header";
import store from "../store";
import Dashboard from "./layouts/Dashboard";
import Alerts from "./layouts/Alerts";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// import {
//     HashRouter as Router,
//     Route,
//     Switch,
//     Redirect
// } from "react-router-dom"

const alertOptions = {
    timeout: 3000,
    position: "bottom center"
};
export class App extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Fragment>
                        <Header />
                        <Alerts />
                        <Dashboard />
                    </Fragment>
                </AlertProvider>

            </Provider>

        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
// export default App
