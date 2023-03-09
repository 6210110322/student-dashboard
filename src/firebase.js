import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCnnTmXLLnBJfop_pIt5yNOhKSQSOSPIZM",
    authDomain: "student-dashboard-c4730.firebaseapp.com",
    projectId: "student-dashboard-c4730",
    storageBucket: "student-dashboard-c4730.appspot.com",
    messagingSenderId: "106751180900",
    appId: "1:106751180900:web:9b533464b5467c9df7df71"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then().catch(error => console.log(error))
}

export { db, auth, provider, signInWithGoogle }