import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer";
import { alertReducer } from "./alertReducer";

export const rootReducer = combineReducers({
    modal: modalReducer,
    alerts: alertReducer
})