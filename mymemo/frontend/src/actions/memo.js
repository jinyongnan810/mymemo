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