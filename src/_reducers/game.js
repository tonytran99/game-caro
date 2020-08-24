import * as types from './../_constants/game';
let dataUser = localStorage.getItem("dataUser") ? JSON.parse(localStorage.getItem("dataUser")) : null;
let dataBoardTrainingWithYourself = localStorage.getItem("dataBoardTrainingWithYourself") ? JSON.parse(localStorage.getItem("dataBoardTrainingWithYourself")) : null;
let dataBoardTrainingWithAI = localStorage.getItem("dataBoardTrainingWithAI") ? JSON.parse(localStorage.getItem("dataBoardTrainingWithAI")) : null;
// let dataAllUsers = localStorage.getItem("dataAllUsers") ? JSON.parse(localStorage.getItem("dataAllUsers")) : null;

const initState = {
    dataUser: dataUser,
    dataBoardTrainingWithYourself: dataBoardTrainingWithYourself,
    dataBoardTrainingWithAI: dataBoardTrainingWithAI,
    // dataChatBoard: null,
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
                ...state,
                dataUser: action.dataUser
            }
        case types.GAME_SHOW_DATA_USER:
            if (action.dataUser) {
                localStorage.setItem("dataUser", JSON.stringify(action.dataUser));
            } else {
                localStorage.removeItem("dataUser");
            }
            return {
                ...state,
                dataUser: action.dataUser
            }
        case types.GAME_SAVE_DATA_BOARD_TRAINING_WITH_YOURSELF:
            if (action.dataTraining) {
                console.log('setItem')
                localStorage.setItem("dataBoardTrainingWithYourself", JSON.stringify(action.dataTraining));
            } else {
                console.log('removeItem')
                localStorage.removeItem("dataBoardTrainingWithYourself");
            }
            return {
                ...state,
                dataBoardTrainingWithYourself: action.dataTraining
            }
        case types.GAME_SAVE_DATA_BOARD_TRAINING_WITH_AI:
            if (action.dataTraining) {
                localStorage.setItem("dataBoardTrainingWithAI", JSON.stringify(action.dataTraining));
            } else {
                localStorage.removeItem("dataBoardTrainingWithAI");
            }
            return {
                ...state,
                dataBoardTrainingWithAI: action.dataTraining
            }
        case types.GAME_SET_DATA_CHAT_BOARD:
            console.log(action.dataChatBoard)
            return {
                ...state,
                dataChatBoard: action.dataChatBoard
            }
        // case types.GAME_SHOW_DATA_ALL_USERS:
        //     if (action.dataAllUsers) {
        //         localStorage.setItem("dataAllUsers", JSON.stringify(action.dataAllUsers));
        //     } else {
        //         localStorage.removeItem("dataAllUsers");
        //     }
        //     return {
        //         dataAllUsers: action.dataAllUsers
        //     }
        default:
            return state;
    }
}

export default gameReducer;
