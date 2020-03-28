import { combineReducers } from "redux";
import memos from "./memo"
import alerts from './alerts'
export default combineReducers({
    memos,
    alerts
});