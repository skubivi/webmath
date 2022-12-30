import { HIDE_ALERT, SHOW_ALERT } from "../actions/ALERTS";

const initialState = {
    alerts: []
}

function alertsWithoutAlert(alert, alerts) {
    return alerts.filter((e) => {
        return e.id !== alert.id;
    })
}

export function alertReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_ALERT: 
            return {
                ...state, alerts: [...state.alerts, action.payload]
            }
        case HIDE_ALERT: 
            return {
                ...state, alerts: alertsWithoutAlert(action.payload, state.alerts)
            }
        default: return state;
    }
}