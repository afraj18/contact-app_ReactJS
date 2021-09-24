import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'


const app = firebase.initializeApp({
    apiKey: "AIzaSyAx490Kfv57Ex-ofxPKw1-CT4jsNBxJ_lU",
    authDomain: "contact-app-auth.firebaseapp.com",
    databaseURL: "https://contact-app-auth-default-rtdb.firebaseio.com",
    projectId: "contact-app-auth",
    storageBucket: "contact-app-auth.appspot.com",
    messagingSenderId: "658110251083",
    appId: "1:658110251083:web:eec75304343bbb33d4cdce"
});


export const database = firebase.database();
export const auth = app.auth()
export default app