import firebase from 'firebase/app';
import 'firebase/storage';

firebase.initializeApp({
    apiKey: 'AIzaSyBCUeyx_VUdt7CyTFAX5JoSJmpeNqRSItg',
    authDomain: 'game-caro-a57c5.firebaseapp.com',
    storageBucket: 'gs://game-caro-a57c5.appspot.com/',
    databaseURL: 'https://game-caro-a57c5.firebaseio.com/'
});

const storage = firebase.storage();

export {
    storage, firebase as default
}