import { Dispatch } from 'redux';

export const SET_TOKEN = 'SET_TOKEN';
export const SAVE_TOKEN_IN_LOCAL_STORAGE = 'SAVE_TOKEN_IN_LOCAL_STORAGE';
export const LOGOUT = 'LOGOUT';

export const saveTokenInLocalStorage = (token: string) => {
    return (dispatch: Dispatch) => {
        localStorage.setItem('token', token);

        dispatch({
            type: SET_TOKEN,
            payload: {
                token: token
            }
        });
    }
}

export const logout = () => {
    return (dispatch: Dispatch) => {
        localStorage.clear();
        console.log('logout');

        dispatch({ type: LOGOUT });
    }
}