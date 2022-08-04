import React from "react";
import ChatApp from './src/ChatApp';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAydgMnc7i4VxSkwmZmPtDZQWwMxuLVUM",
  authDomain: "chatapp-a4f15.firebaseapp.com",
  databaseURL: "https://chatapp-a4f15-default-rtdb.firebaseio.com",
  projectId: "chatapp-a4f15",
  storageBucket: "chatapp-a4f15.appspot.com",
  messagingSenderId: "358482227252",
  appId: "1:358482227252:web:c7afbaf0e32ec75ed3da61",
  measurementId: "G-S9G6WP4HTY"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// getAnalytics(firebaseConfig);

const App = ()=> {
   return <ChatApp/>;

};
export default App
