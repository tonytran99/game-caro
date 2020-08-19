import * as types from './../_constants/game';
let dataUser = localStorage.getItem("dataUser") ? JSON.parse(localStorage.getItem("dataUser")) : null;

const initState = {
    dataUser: dataUser,
}
const gameReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GAME_SAVE_DATA_USER:
            if (action.dataUser) {
                localStorage.setItem("dataUser", JSON.stringify(action.dataUser));
            } else {
                localStorage.removeItem("dataUser");
            }
            return {
                dataUser: action.dataUser
            }
        case types.GAME_SHOW_DATA_USER:
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

export default gameReducer;
