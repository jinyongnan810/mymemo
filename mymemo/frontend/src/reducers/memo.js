import * as types from "../actions/types";

const initialState = {
    memos: [],
    currentMemo: {}
};
export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_MEMOS: {
            const memos = action.payload;
            console.log(`before:${JSON.stringify(memos.map(memo => memo.title))}|${JSON.stringify(memos.map(memo => memo.update_at))}`)
            const sorted = memos.sort((a, b) => {
                return new Date(b.update_at) - new Date(a.update_at);
            })
            console.log(`after:${JSON.stringify(sorted.map(sorted => sorted.title))}|${JSON.stringify(sorted.map(sorted => sorted.update_at))}`)

            return { currentMemo: {}, memos: sorted }
        }
        case types.ADD_MEMO: {
            const newMemo = action.payload;
            state.memos.unshift(newMemo);
            return { ...state, currentMemo: newMemo };
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
