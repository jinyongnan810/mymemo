import axios from "axios";
import { returnErrors } from "./messages";
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

// check user and load user
export const load_user = () => (dispatch, getState) => {
    //user loading
    dispatch({ type: USER_LOADING });
    const config = tokenConfig(getState);
    axios
        .get("/api/auth/user", config)
        .then((res) => {
            dispatch({ type: USER_LOADED, payload: res.data });
        })
        .catch((e) => {
            dispatch(returnErrors(e.response.data, e.response.status));
            dispatch({ type: AUTH_ERROR });
        });
};

// login user
export const login_user = (username, password) => (dispatch) => {
    //set headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const requestBody = JSON.stringify({ username, password });
    axios
        .post("/api/auth/login", requestBody, config)
        .then((res) => {
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        })
        .catch((e) => {
            dispatch(returnErrors(e.response.data, e.response.status));
            dispatch({ type: LOGIN_FAIL });
        });
};
// logout user
export const logout_user = () => (dispatch, getState) => {
    const config = tokenConfig(getState);
    axios
        .post("/api/auth/logout", null, config)
        .then((res) => {
            dispatch({ type: LOGOUT_SUCCESS });
        })
        .catch((e) => {
            dispatch(returnErrors(e.response.data, e.response.status));
        });
};
// register user
export const register_user = ({ username, password, email }) => (dispatch) => {
    //set headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const requestBody = JSON.stringify({ username, password, email });
    axios
        .post("/api/auth/register", requestBody, config)
        .then((res) => {
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        })
        .catch((e) => {
            dispatch(returnErrors(e.response.data, e.response.status));
            dispatch({ type: REGISTER_FAIL });
        });
};

export const tokenConfig = (getState, editing) => {
    //set headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    const token = getState().auth.token;
    if (token) {
        config["headers"]["Authorization"] = `Token ${token}`;
    }
    if (editing) {
        config["headers"]["X-CSRFToken"] = $("[name=csrfmiddlewaretoken]").val();
    }
    return config;
};