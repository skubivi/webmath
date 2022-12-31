import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { alertReducer } from "./alertReducer";
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
    modal: modalReducer,
    alerts: alertReducer,
    user: userReducer
})