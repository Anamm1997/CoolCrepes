import firebase from 'firebase';
import 'firebase/auth';

//later use env stuff
const config = {
    apiKey: "AIzaSyA6RqCT2kc0uY4OnCI0tupEp1UWw9Gx1jE",
    authDomain: "coolcrepe-d97ac.firebaseapp.com",
    databaseURL: "https://coolcrepe-d97ac.firebaseio.com",
    projectId: "coolcrepe-d97ac",
    storageBucket: "coolcrepe-d97ac.appspot.com",
    messagingSenderId: "1045869884126",
    appId: "1:1045869884126:web:e17293ddeaa50b1854c84f",
    measurementId: "G-X5X5GXFNW8"
  };

const Fire = firebase.initializeApp(config)
//Fire.auth().setPersistence(Fire.auth.Auth.Persistence.SESSION);

export default Fire; 