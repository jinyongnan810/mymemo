import * as types from "./types"
import axios from "axios";
export const getMemos = () => (dispatch, getState) => {
    axios
        .get("/api/memos/")//, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: types.GET_MEMOS, payload: res.data });
        })
        .catch((err) => {
            console.log("メモ取得エラー")
            // const error = {
            //     msg: err.response.data,
            //     status: err.response.status
            // };
            // dispatch({
            //     type: GET_ERRORS,
            //     payload: error
            // });
        });
};
export const addMemo = (data) => (dispatch, getState) => {
    const memo = { title: 'temp title', content: '' }
    axios
        .post(`/api/memos/`, memo)
        .then((res) => {
            dispatch({ type: types.ADD_MEMO, payload: res.data });
        })
        .catch((err) => {
            console.log(`err:${JSON.stringify(err)}`)
            // dispatch(returnErrors(err.response.data, err.response.status));
        });
};
export const deleteMemo = (data) => (dispatch, getState) => {
    axios
        .delete(`/api/memos/${data}/`)
        .then((res) => {
            dispatch({ type: types.DELETE_MEMO, payload: data });
        })
        .catch((err) => {
            console.log(`err:${JSON.stringify(err)}`)
            // dispatch(returnErrors(err.response.data, err.response.status));
        });
};
export const saveMemo = (data) => (dispatch, getState) => {
    axios
        .get(`/api/memos/${data.id}/`)
        .then((res) => {
            const memo = res.data;
            if (data.title)
                memo.title = data.title;
            if (data.content)
                memo.content = data.content;
            axios
                .put(`/api/memos/${memo.id}/`, memo)
                .then((res) => {
                    dispatch({ type: types.UPDATE_MEMO, payload: res.data });
                })
                .catch((err) => {
                    console.log(`err:${JSON.stringify(err)}`)
                    // dispatch(returnErrors(err.response.data, err.response.status));
                });
        })
        .catch((err) => {
            // dispatch(returnErrors(err.response.data, err.response.status));
        });
};