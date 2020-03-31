import { GET_ERRORS, CREATE_MESSAGE } from '../actions/types'

const initialState = {
    status: null,
    msg: {}
}
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS: {
            return {
                status: action.payload.status,
                msg: action.payload.msg,
                time: Date.now()
            }
        }
        case CREATE_MESSAGE: {
            return {
                status: 200,
                msg: action.payload,
                time: Date.now()
            }
        }
        default: return state
    }
}