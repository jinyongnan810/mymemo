import * as types from "./types"
import axios from "axios";
import { createMessage, returnErrors } from './messages'
import { tokenConfig } from "./auth";
export const getMemos = () => (dispatch, getState) => {
    axios
        .get("/api/memos/", tokenConfig(getState, false))
        .then((res) => {
            dispatch({ type: types.GET_MEMOS, payload: res.data });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response ? err.response.data : 'unknown error', err.response ? err.response.status : 500));
        });
};
export const addMemo = () => (dispatch, getState) => {
    const memo = { title: 'new memo', content: '### title' }
    axios
        .post(`/api/memos/`, memo, tokenConfig(getState, true))
        .then((res) => {
            dispatch({ type: types.ADD_MEMO, payload: res.data });
            dispatch(createMessage('memo created!'))
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
export const deleteMemo = (data) => (dispatch, getState) => {
    axios
        .delete(`/api/memos/${data}/`, tokenConfig(getState, true))
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
        .get(`/api/memos/${data.id}/`, tokenConfig(getState, false))
        .then((res) => {
            const memo = res.data;
            if (data.title)
                memo.title = data.title;
            if (data.content)
                memo.content = data.content;
            axios
                .put(`/api/memos/${memo.id}/`, memo, tokenConfig(getState, true))
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