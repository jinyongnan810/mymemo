import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
    static propTypes = {
        alerts: PropTypes.object.isRequired,
    };
    componentDidUpdate(previousProps) {
        const { alert, alerts } = this.props;
        if (alerts.status != 200 && (alerts.status != previousProps.alerts.status || alerts.msg != previousProps.alerts.msg)) {
            if (alerts.msg) {
                alert.error(`${alerts.status}:${JSON.stringify(alerts.msg)}`);
                console.error(`${alerts.status}:${JSON.stringify(alerts.msg)}`)
            }
        }
        if (alerts.status == 200 && alerts.msg != previousProps.alerts.msg) {
            if (alerts.msg) {
                alert.success(alerts.msg);
            }
        }
    }
    render() {
        return <Fragment />;
    }
}
const mapStateToProps = (state) => ({
    alerts: state.alerts
});

export default connect(mapStateToProps)(withAlert()(Alerts));