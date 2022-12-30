import { SHOW_ALERT } from "../actions/ALERTS";

export function showAlert(alert) {
    return {
        type: SHOW_ALERT,
        payload: alert
    }
}