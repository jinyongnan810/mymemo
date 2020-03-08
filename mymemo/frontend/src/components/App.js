import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
// import { Provider as AlertProvider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";
// import { Provider } from "react-redux";
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
            <div>
                Hello world
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
// export default App
