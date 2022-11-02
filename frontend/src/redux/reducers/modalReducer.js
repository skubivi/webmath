import { HIDE_SIGNUP, SHOW_SIGNUP } from "../actions/MODAL";

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

        default: return state;
    }
}