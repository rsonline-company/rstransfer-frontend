import { LOGOUT, SET_TOKEN } from '../actions/Auth';

interface Payload {
    token: string;
}

interface Action {
    type: string;
    payload: Payload;
}

const initialState = {
    token: null
}

const AuthReducer = (state = initialState, action: Action) => {
    switch(action.type) {
        case SET_TOKEN:
            console.log('save tokeb', action.payload.token);
            return {...state, token: action.payload.token};
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}
export default AuthReducer;