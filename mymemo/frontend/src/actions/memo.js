import * as types from "./types"
import axios from "axios";
import { createMessage, returnErrors } from './messages'
export const getMemos = () => (dispatch, getState) => {
    axios
        .get("/api/memos/")//, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: types.GET_MEMOS, payload: res.data });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
export const addMemo = (config) => (dispatch, getState) => {
    const memo = { title: 'temp title', content: '' }
    axios
        .post(`/api/memos/`, memo, config)
        .then((res) => {
            dispatch({ type: types.ADD_MEMO, payload: res.data });
            dispatch(createMessage('memo created!'))
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
export const deleteMemo = (data, config) => (dispatch, getState) => {
    axios
        .delete(`/api/memos/${data}/`, config)
        .then((res) => {
            dispatch({ type: types.DELETE_MEMO, payload: data });
            dispatch(createMessage('memo deleted!'))
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
export const saveMemo = (data) => (dispatch, getState) => {
    axios
        .get(`/api/memos/${data.id}/`, data.config)
        .then((res) => {
            const memo = res.data;
            if (data.title)
                memo.title = data.title;
            if (data.content)
                memo.content = data.content;
            axios
                .put(`/api/memos/${memo.id}/`, memo, data.config)
                .then((res) => {
                    dispatch({ type: types.UPDATE_MEMO, payload: res.data });
                    dispatch(createMessage('memo updated!'))
                })
                .catch((err) => {
                    dispatch(returnErrors(err.response.data, err.response.status));
                });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};