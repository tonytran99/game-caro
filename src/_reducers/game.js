import * as types from './../_constants/game';

const initState = {
    dataUserDB: null,
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GAME_SAVE_DATA_USER:

            return {
                dataUser: action.dataUser
            }
        default:
            return state;
    }
}

export default authReducer;
