import * as types from './../_constants/game';
let dataUser = localStorage.getItem("dataUser") ? JSON.parse(localStorage.getItem("dataUser")) : null;
let dataBoardTrainingWithYourself = localStorage.getItem("dataBoardTrainingWithYourself") ? JSON.parse(localStorage.getItem("dataBoardTrainingWithYourself")) : null;
let dataBoardTrainingWithAI = localStorage.getItem("dataBoardTrainingWithAI") ? JSON.parse(localStorage.getItem("dataBoardTrainingWithAI")) : null;

const initState = {
    dataUser: dataUser,
    dataBoardTrainingWithYourself: dataBoardTrainingWithYourself,
    dataBoardTrainingWithAI: dataBoardTrainingWithAI,
    dataMessagesChatBoard: null,
    dataInfoChatBoard: null,
    dataChessBoard: null,
    dataChessmans: [],
    dataListChessBoard: []
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
                localStorage.setItem("dataBoardTrainingWithYourself", JSON.stringify(action.dataTraining));
            } else {
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
        case types.GAME_SET_DATA_MESSAGE_CHAT_BOARD:
            return {
                ...state,
                dataMessagesChatBoard: action.dataMessagesChatBoard
            }
        case types.GAME_SET_DATA_INFO_CHAT_BOARD:
            return {
                ...state,
                dataInfoChatBoard: action.dataInfoChatBoard
            }
        case types.GAME_SHOW_DATA_CHESS_BOARD:
            return {
                ...state,
                dataChessBoard: action.dataChessBoard
            }
        case types.GAME_SAVE_DATA_CHESS_BOARD:
            return {
                ...state,
                dataChessBoard: action.dataChessBoard
            }
        case types.GAME_SHOW_DATA_CHESSMANS:
            return {
                ...state,
                dataChessmans: action.dataChessmans
            }
        case types.GAME_SHOW_LIST_CHESS_BOARD:
            return {
                ...state,
                dataListChessBoard: action.dataListChessBoard
            }
        default:
            return state;
    }
}

export default gameReducer;
