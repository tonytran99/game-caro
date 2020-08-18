import * as types from './../_constants/auth';
import firebase from "firebase";

export const signOut = () => async (dispatch) => {
    console.log('AAAAAAAa')
    // firebase.auth().signOut();
    // return {
    //     type: types.AUTH_SIGN_OUT,
    //     isSignedIn: false
    // }
    try {
        firebase
            .auth()
            .signOut()
            .then((response) => {
                console.log('AAAAAAAAAAAAAAAAAAAAAAA')
                dispatch({
                    type: types.AUTH_SIGN_OUT_SUCCESS
                });
            })
            .catch((error) => {
                console.log('AAAAAAAAAAAAAAAAAAAAAAA')
                dispatch({
                    type: types.AUTH_SIGN_OUT_ERROR,
                    payload: "...some error message for the user..."
                });
            });
    } catch (error) {
        console.log('AAAAAAAAAAAAAAAAAAAAAAA')
        dispatch({
            type: types.AUTH_SIGN_OUT_ERROR,
            payload: "...some error message for the user..."
        });
    }
}

export const setDataUser = (dataUser) => {
    return {
        type: types.AUTH_SET_DATA_USER,
        dataUser: dataUser
    }
}