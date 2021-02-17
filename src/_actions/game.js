import * as types from "../_constants/game";
import firebase from "./../firebase";

export const saveDataUser = (userId, dataUser) => {
    firebase.database().ref('users/' + userId).set(dataUser);
    return {
        type: types.GAME_SAVE_DATA_USER,
        dataUser: dataUser
    }
}

export const showDataUser = (userId) => {
    return (dispatch) => {
        firebase.database().ref('users/' + userId).once('value', (snap) => {
            if (snap.val()) {
                dispatch({
                    type: types.GAME_SHOW_DATA_USER,
                    dataUser: snap.val()
                })
            }
        });
    }
}

export const saveDataBoardTrainingWithYourself = (dataTraining) => {
    return {
        type: types.GAME_SAVE_DATA_BOARD_TRAINING_WITH_YOURSELF,
        dataTraining: dataTraining
    }
};

export const saveDataBoardTrainingWithAI = (dataTraining) => {
    return {
        type: types.GAME_SAVE_DATA_BOARD_TRAINING_WITH_AI,
        dataTraining: dataTraining
    }
}

export const setDataMessagesChatBoard = (idChatBox) => {
    return (dispatch) => {
        firebase.database().ref('messages/' + idChatBox).on('value', (snap) => {
            if (snap.val()) {
                dispatch({
                    type: types.GAME_SET_DATA_MESSAGE_CHAT_BOARD,
                    dataMessagesChatBoard: snap.val()
                })
            }
        });
    }
}

export const setDataInfoChatBoard = (idChatBox) => {
    return (dispatch) => {
        firebase.database().ref('chats/' + idChatBox).on('value', (snap) => {
            if (snap.val()) {
                dispatch({
                    type: types.GAME_SET_DATA_INFO_CHAT_BOARD,
                    dataInfoChatBoard: snap.val()
                })
            }
        });
    }
}

export const showDataChessBoard = (idChessBoard) => {
    return (dispatch) => {
        firebase.database().ref('chessBoards/' + idChessBoard).on('value', (snap) => {
            if (snap.val()) {
                dispatch({
                    type: types.GAME_SHOW_DATA_CHESS_BOARD,
                    dataChessBoard: snap.val()
                });
            }
        });
    };
};

export const saveDataChessBoard = (idChessBoard, dataChessBoard) => {
    firebase.database().ref('chessBoards/' + idChessBoard).set(dataChessBoard);
    return {
        type: types.GAME_SAVE_DATA_CHESS_BOARD,
        dataChessBoard: dataChessBoard
    };
};

export const showDataChessmans = () => {
    return (dispatch) => {
        firebase.database().ref('chessmans/').on('value', (snap) => {
            if (snap.val()) {
                let dataChessmansTemp = [];
                Object.keys(snap.val()).map((key, index)=>{
                    dataChessmansTemp.push(snap.val()[key]);
                });
                // sort
                dataChessmansTemp.sort((chessmanA, chessmanB) => {
                    return (
                        chessmanB.default - chessmanA.default
                    );
                });
                // filter default = 1
                const dataChessmansDefault = dataChessmansTemp.filter((data) => {
                    return data.default;
                }).sort((chessmanA, chessmanB) => {
                    return (
                        chessmanB.updateAt - chessmanA.updateAt
                    );
                });
                // filter default = 0
                const dataChessmansNotDefault = dataChessmansTemp.filter((data) => {
                    return !data.default;
                }).sort((chessmanA, chessmanB) => {
                    return (
                        chessmanB.updateAt - chessmanA.updateAt
                    );
                });
                dataChessmansTemp = dataChessmansDefault.concat(dataChessmansNotDefault);

                dispatch({
                    type: types.GAME_SHOW_DATA_CHESSMANS,
                    dataChessmans: dataChessmansTemp
                });
            }
        });
    };
};

export const showListChessBoard = () => {
    return (dispatch) => {
        firebase.database().ref('chessBoards/').orderByChild('chessBoardOpen').equalTo(true).on('value', (snap) => {
            if (snap.val()) {
                let dataListChessBoardTemp = [];
                Object.keys(snap.val()).map((key, index)=>{
                    dataListChessBoardTemp.push(snap.val()[key]);
                });
                dispatch({
                    type: types.GAME_SHOW_LIST_CHESS_BOARD,
                    dataListChessBoard: dataListChessBoardTemp
                });
            }
        });
    };
};