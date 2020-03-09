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
        case types.UPDATE_MEMOS: {
            const newMemo = action.payload;
            state.memos.find(memo => {
                if (memo.id == newMemo.id) {
                    memo.title = newMemo.title;
                    memo.content = newMemo.content;
                    return true;
                }
                return false;
            });

            return state;
        }
        default: return state;
    }
};
