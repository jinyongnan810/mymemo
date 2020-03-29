import { combineReducers } from "redux";
import memos from "./memo"
import alerts from './alerts'
import auth from './auth'
export default combineReducers({
    memos,
    alerts,
    auth
});