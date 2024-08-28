// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js');

// Your web app's Firebase configuration (replace with your own configuration)
const firebaseConfig = {
    apiKey: "AIzaSyAmJXcPzuJ4ZqM0seixQldP1YNqjYVQk94",
    authDomain: "mashreqwebapp.firebaseapp.com",
    projectId: "mashreqwebapp",
    storageBucket: "mashreqwebapp.appspot.com",
    messagingSenderId: "985947873345",
    appId: "1:985947873345:web:33a516ccb1aa60c080a6c0",
    measurementId: "G-JDR8H21Z1M"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon: '/favicon.ico', // Update with your own icon path
  });
});


self.addEventListener('push', (event) => {
    const data = event.data.json();
    const title = data.notification.title;
    const options = {
      body: data.notification.body,
      icon: '/favicon.ico', // Path to your icon
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });

  
