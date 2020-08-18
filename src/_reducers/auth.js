import * as types from './../_constants/auth';
let dataUser = localStorage.getItem("dataUser") ? JSON.parse(localStorage.getItem("dataUser")) : null;

const initState = {
    dataUser: dataUser,
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case types.AUTH_SIGN_OUT_SUCCESS:
            localStorage.removeItem("dataUser");
            return {
                dataUser: null
            }
        case types.AUTH_SIGN_OUT_ERROR:
            return {
                // dataUser: true
            }
        case types.AUTH_SET_DATA_USER:
            if (action.dataUser) {
                localStorage.setItem("dataUser", JSON.stringify(action.dataUser));
            } else {
                localStorage.removeItem("dataUser");
            }
            return {
                dataUser: action.dataUser
            }
        default:
            return state;
    }
}

export default authReducer;
