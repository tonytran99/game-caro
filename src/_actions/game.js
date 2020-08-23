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