import { Dispatch } from 'redux';

export const SET_TOKEN = 'SET_TOKEN';
export const SAVE_TOKEN_IN_LOCAL_STORAGE = 'SAVE_TOKEN_IN_LOCAL_STORAGE';
export const LOGOUT = 'LOGOUT';

export const saveTokenInLocalStorage = (token: string) => {
    localStorage.setItem('token', token);

    return (dispatch: Dispatch) => {
        dispatch({
            type: SET_TOKEN,
            payload: {
                token: token
            }
        });
    }
}