import * as types from './../_constants/auth';
let dataUserAuth = localStorage.getItem("dataUserAuth") ? JSON.parse(localStorage.getItem("dataUserAuth")) : null;

const initState = {
    dataUserAuth: dataUserAuth,
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case types.AUTH_SIGN_OUT_SUCCESS:
            localStorage.removeItem("dataUserAuth");
            return {
                dataUserAuth: null
            }
        case types.AUTH_SIGN_OUT_ERROR:
            return {
                // dataUser: true
            }
        case types.AUTH_SET_DATA_USER:
            if (action.dataUserAuth) {
                localStorage.setItem("dataUserAuth", JSON.stringify(action.dataUserAuth));
            } else {
                localStorage.removeItem("dataUserAuth");
            }
            return {
                dataUserAuth: action.dataUserAuth
            }
        default:
            return state;
    }
}

export default authReducer;
