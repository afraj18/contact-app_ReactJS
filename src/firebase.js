import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAxpx_lZbDO5Gl1R8I2hPFHn2QxL0F6v8Y",
    authDomain: "contact-app-88c76.firebaseapp.com",
    projectId: "contact-app-88c76",
    storageBucket: "contact-app-88c76.appspot.com",
    messagingSenderId: "191458507726",
    appId: "1:191458507726:web:5591ce833f75db4879499f"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app;