import * as types from "../actions/types";

const initialState = {
    memos: [],
    currentMemo: {}
};
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_MEMOS: {
            return { ...state, memos: action.payload }
        }
        default: return state;
    }
};
