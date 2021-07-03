// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDCbBPl0OUHdF7ebMTLGRUfqYsQFIw4d4k",
  authDomain: "messa-69e78.firebaseapp.com",
  projectId: "messa-69e78",
  storageBucket: "messa-69e78.appspot.com",
  messagingSenderId: "968346524816",
  appId: "1:968346524816:web:82951b598e3313fff00c15",
  measurementId: "G-RK3TW4MRGQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();



export { auth, provider };
export default db;
