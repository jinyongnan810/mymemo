import * as types from "../actions/types";

const initialState = {
    memos: [],
    currentMemo: {},
    searching: ""
};
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_MEMOS: {
            const memos = action.payload;
            const sorted = memos.sort((a, b) => {
                return new Date(b.update_at) - new Date(a.update_at);
            })
            return { ...state, currentMemo: {}, memos: sorted }
        }
        case types.ADD_MEMO: {
            const newMemo = action.payload;
            state.memos.unshift(newMemo);
            return { ...state, currentMemo: newMemo };
        }
        case types.UPDATE_MEMO: {
            const newMemo = action.payload;
            const memos = state.memos.slice();
            memos.find(memo => {
                if (memo.id == newMemo.id) {
                    memo.title = newMemo.title;
                    memo.content = newMemo.content;
                    return true;
                }
                return false;
            });
            if (state.currentMemo.id == newMemo.id) {
                return { ...state, memos: memos, currentMemo: newMemo };
            } else {
                return { ...state, memos: memos };
            }

        }
        case types.DELETE_MEMO: {
            const id = action.payload;
            const oldMemos = state.memos.slice();
            const index = oldMemos.findIndex(memo => {
                if (memo.id == id) {
                    return true;
                }
                return false;
            })
            if (index > -1) {
                oldMemos.splice(index, 1);
            }

            if (state.currentMemo.id == id) {
                state.currentMemo = {}
            }
            return { ...state, memos: oldMemos, currentMemo: state.currentMemo };
        }
        case types.SELECT_MEMO: {
            const id = action.payload;
            state.memos.find(memo => {
                if (memo.id == id) {
                    state.currentMemo = memo;
                    return true;
                } else return false;
            })
            return { ...state, ...state, currentMemo: state.currentMemo };
        }
        case types.SEARCH_CHANGED: {
            return { ...state, searching: action.payload }
        }
        default: return state;
    }
};
