import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Provider } from "react-redux";
import Header from "./layouts/Header";
import List from "./layouts/List";
import Content from "./layouts/Content";
import store from "../store";
import Dashboard from "./layouts/Dashboard";
// import {
//     HashRouter as Router,
//     Route,
//     Switch,
//     Redirect
// } from "react-router-dom"


export class App extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <Header />
                    <Dashboard />
                </Fragment>
            </Provider>

        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
// export default App
