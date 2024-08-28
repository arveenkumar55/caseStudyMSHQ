import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector } from "react-redux";
import './App.css';
import Header from './components/NewHeader';
import Profile from './pages/profile';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassowrd from './pages/Forgot'

import PasswordChange from './pages/PasswordChange'
import { messaging, getToken, onMessage } from './firebase';

const App = () => {
  const { user } = useSelector((state) => state.authReducer);
  const navigateTo = useNavigate();

  console.log('user', user)

  const VAPID_KEY = 'BKHN_LFGhNRxg2WRpAUdS_dg9Lmy6XVidbP_9W9WeJRjV3-jbglBdmiKmq7BTaal8V9eyqWD6yloOgRNrnf8tlQ';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
  
  // if(!Object.keys(user).length) {
    
  //   return <Login/>
  // } 
  useEffect(() => {
    // Request permission and get token
    const requestPermission = async () => {
      console.log('Requesting permission...');
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // Get registration token
        const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
        if (currentToken) {
          console.log('Current token:', currentToken);
          // Save the token to your server or use it as needed
        } else {
          console.log('No registration token available.');
        }
      } else {
        console.log('Notification permission denied.');
      }
    };

    requestPermission();

    // Handle incoming messages when the app is in the foreground
    onMessage(messaging, (payload) => {
      console.log('Message received:', payload);
      // Customize notification here
      const { title, body } = payload.notification;
      new Notification(title, { body, icon: '/favicon.ico' });
    });
  }, []);
  return (
  <>
   {Object.keys(user).length > 0  &&
      
      <Header />
   }
    {/* <main className="bg-light min-vh-100 d-flex py-5">
      <div className="container-lg pt-3 pt-md-5">
        <div className="row mx-0 justify-content-center pt-3"> */}
          <div>
            <Routes>
              {Object.keys(user).length > 0 && user.isPasswordVerifed ?
              <>
              <Route path="/" element={<Profile />} />
              
              <Route path="/Profile" element={<Profile />} />

              
              <Route path="*" element={<Profile />} />
              </>
              :
              <>
               <Route path="/PasswordChange/:userId" element={<PasswordChange />} />
              <Route path="/PasswordChange" element={<PasswordChange />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/ForgotPassword" element={<ForgotPassowrd />} />
              <Route path="*" element={<Login />} />
              </>
            }
            </Routes>
          </div>
        {/* </div>
      </div>
    </main> */}
  </>
)}

export default App;
