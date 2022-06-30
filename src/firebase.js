// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';

const firebaseConfig = {
 apiKey: "AIzaSyBVSAiFp1L2tEZ7nfIJAcMNzwKK4rR_ni8",
 authDomain: "parbat-5db79.firebaseapp.com",
 databaseURL: "https://parbat-5db79-default-rtdb.firebaseio.com",
 projectId: "parbat-5db79",
 storageBucket: "parbat-5db79.appspot.com",
 messagingSenderId: "894642265818",
 appId: "1:894642265818:web:d9269918c486c79aa34fe3",
 measurementId: "G-PCHTMG85RJ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);