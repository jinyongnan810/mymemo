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
                msg: action.payload.msg
            }
        }
        case CREATE_MESSAGE: {
            return {
                status: 200,
                msg: action.payload
            }
        }
        default: return state
    }
}