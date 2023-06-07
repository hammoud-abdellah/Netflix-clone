import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyDBvRukOCs4boRMs2goGaQEOZKfwKoMlck",
    authDomain: "netflix-clone-v3-1f3b1.firebaseapp.com",
    projectId: "netflix-clone-v3-1f3b1",
    storageBucket: "netflix-clone-v3-1f3b1.appspot.com",
    messagingSenderId: "571417635116",
    appId: "1:571417635116:web:a22a20744b2cf3783a6489",
    measurementId: "G-SV755DC3X3"
  };

const firebase = Firebase.initializeApp(config);



export { firebase };