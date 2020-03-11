import * as types from "../actions/types";

const initialState = {
    memos: [],
    currentMemo: {}
};
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_MEMOS: {
            return { currentMemo: {}, memos: action.payload }
        }
        case types.UPDATE_MEMO: {
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
        case types.SELECT_MEMO: {
            const id = action.payload;
            state.memos.find(memo => {
                if (memo.id == id) {
                    state.currentMemo = memo;
                    return true;
                } else return false;
            })
            return { ...state, currentMemo: state.currentMemo };
        }

        default: return state;
    }
};
