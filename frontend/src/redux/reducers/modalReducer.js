import { HIDE_SIGNUP, SHOW_LOGIN, SHOW_SIGNUP, HIDE_LOGIN } from "../actions/MODAL";

const initialState = {
    signup: false,
    login: false
}

export const modalReducer = (state = initialState, action) => {
    switch(action.type) {
        case SHOW_SIGNUP: return { 
            ...state, signup: true
        }
        case HIDE_SIGNUP: return {
            ...state, signup: false
        }   

        case SHOW_LOGIN: return {
            ...state, login: true
        }
        case HIDE_LOGIN: return {
            ...state, login: false
        }

        default: return state;
    }
}