import { SET_USER, DELETE_USER } from '../actions/USER'

const initialState = {
    user: null,
    isAuth: false
}

export function userReducer(state=initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                user: action.payload,
                isAuth: true
            }
        case DELETE_USER:
            return {
                ...initialState
            }
        default: return state
    }
}