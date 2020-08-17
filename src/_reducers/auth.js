import firebase from "firebase";
import * as types from './../_constants/auth';

let isSignedIn = false;


const initState = {
    isSignedIn: isSignedIn,
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case types.AUTH_SIGN_OUT_SUCCESS:
            return {
                isSignedIn: action.isSignedIn
            }
        case types.AUTH_SIGN_OUT_ERROR:
            return {
                isSignedIn: true
            }
        case types.AUTH_SET_IS_SIGNED_IN:
            return {
                isSignedIn: action.isSignedIn
            }
        default:
            return state;
    }
}

export default authReducer;
