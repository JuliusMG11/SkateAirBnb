import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {

  apiKey: "AIzaSyBujjPkYfDouHjVvMm9lQdipNTw43crIpI",
  authDomain: "skateandbed-aa4d4.firebaseapp.com",
  databaseURL: "https://skateandbed-aa4d4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "skateandbed-aa4d4",
  storageBucket: "skateandbed-aa4d4.appspot.com",
  messagingSenderId: "348351938273",
  appId: "1:348351938273:web:9fbfb64c6cc00d2ba441a0",
  measurementId: "G-34VLPYLVCF"
};



  
let app = null;
if (!firebase.apps.length) {
    app =  firebase.initializeApp(firebaseConfig);
}


export default firebase;