import * as types from "../_constants/game";
import firebase from "./firebase";

export const saveDataUser = (userId, dataUser) => {
    // firebase.database().ref('users/' + userId).set({
    //     username: name,
    //     email: email,
    //     profile_picture : imageUrl
    // });
    return {
        type: types.GAME_SAVE_DATA_USER,
        dataUser: dataUser
    }
}