import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth.isLoading) {
                    return "loading...";
                } else if (!auth.isAuthenticated) {
                    return <Redirect to="/login" />;
                }
                return <Component {...props} />;
            }}
        />
    );
};
const mapStateToAuth = (state) => ({
    auth: state.auth
});
export default connect(mapStateToAuth)(PrivateRoute);