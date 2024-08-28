// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAmJXcPzuJ4ZqM0seixQldP1YNqjYVQk94",
    authDomain: "mashreqwebapp.firebaseapp.com",
    projectId: "mashreqwebapp",
    storageBucket: "mashreqwebapp.appspot.com",
    messagingSenderId: "985947873345",
    appId: "1:985947873345:web:33a516ccb1aa60c080a6c0",
    measurementId: "G-JDR8H21Z1M"
  };

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
