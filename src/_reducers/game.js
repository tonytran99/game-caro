import * as types from './../_constants/game';
let dataUser = localStorage.getItem("dataUser") ? JSON.parse(localStorage.getItem("dataUser")) : null;
let dataBoardTrainingWithYourself = localStorage.getItem("dataBoardTrainingWithYourself") ? JSON.parse(localStorage.getItem("dataBoardTrainingWithYourself")) : null;
let dataBoardTrainingWithAI = localStorage.getItem("dataBoardTrainingWithAI") ? JSON.parse(localStorage.getItem("dataBoardTrainingWithAI")) : null;

const initState = {
    dataUser: dataUser,
    dataBoardTrainingWithYourself: dataBoardTrainingWithYourself,
    dataBoardTrainingWithAI: dataBoardTrainingWithAI
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
        case types.GAME_SAVE_DATA_BOARD_TRAINING_WITH_YOURSELF:
            if (action.dataTraining) {
                console.log('setItem')
                localStorage.setItem("dataBoardTrainingWithYourself", JSON.stringify(action.dataTraining));
            } else {
                console.log('removeItem')
                localStorage.removeItem("dataBoardTrainingWithYourself");
            }
            return {
                dataBoardTrainingWithYourself: action.dataTraining
            }
        case types.GAME_SAVE_DATA_BOARD_TRAINING_WITH_AI:
            if (action.dataTraining) {
                localStorage.setItem("dataBoardTrainingWithAI", JSON.stringify(action.dataTraining));
            } else {
                localStorage.removeItem("dataBoardTrainingWithAI");
            }
            return {
                dataBoardTrainingWithAI: action.dataTraining
            }
        default:
            return state;
    }
}

export default gameReducer;
