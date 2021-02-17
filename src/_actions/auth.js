import * as types from './../_constants/auth';
import firebase from "firebase";

export const signOut = () => async (dispatch) => {
    try {
        firebase
            .auth()
            .signOut()
            .then((response) => {
                dispatch({
                    type: types.AUTH_SIGN_OUT_SUCCESS
                });
            })
            .catch((error) => {
                dispatch({
                    type: types.AUTH_SIGN_OUT_ERROR,
                    payload: "...some error message for the user..."
                });
            });
    } catch (error) {
        dispatch({
            type: types.AUTH_SIGN_OUT_ERROR,
            payload: "...some error message for the user..."
        });
    }
}

export const setDataUser = (dataUserAuth) => {
    return {
        type: types.AUTH_SET_DATA_USER,
        dataUserAuth: dataUserAuth
    }
}
