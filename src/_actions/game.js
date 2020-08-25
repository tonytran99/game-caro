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

// export const showDataAllUsers = (dataAllUsers) => {
//     return {
//         type: types.GAME_SHOW_DATA_ALL_USERS,
//         dataAllUsers: dataAllUsers
//     }
// }

export const setDataMessagesChatBoard = (idChatBox) => {
    return (dispatch) => {
        firebase.database().ref('messages/' + idChatBox).on('value', (snap) => {
            if (snap.val()) {
                console.log(snap.val());
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
                console.log(snap.val());
                dispatch({
                    type: types.GAME_SET_DATA_INFO_CHAT_BOARD,
                    dataInfoChatBoard: snap.val()
                })
            }
        });
    }
}