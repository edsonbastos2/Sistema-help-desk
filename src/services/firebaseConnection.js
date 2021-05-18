import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyDyLOuTdrvGpyQyujhCMsqpkBkIce6lT6o",
    authDomain: "project-singular-oficial.firebaseapp.com",
    projectId: "project-singular-oficial",
    storageBucket: "project-singular-oficial.appspot.com",
    messagingSenderId: "555219097450",
    appId: "1:555219097450:web:204e9ad5451c468fb4f713",
    measurementId: "G-L0Q6SD0HVD"
  };

  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

  export default firebase;