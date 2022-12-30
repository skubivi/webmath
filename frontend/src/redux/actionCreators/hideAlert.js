import { HIDE_ALERT } from "../actions/ALERTS";

export function hideAlert(alert) {
    return {
        type: HIDE_ALERT,
        payload: alert
    }
}