// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHtvw2HtX7MtDfo2Or9TvkK8CUIbsDxqM",
  authDomain: "oasisone-v1.firebaseapp.com",
  projectId: "oasisone-v1",
  storageBucket: "oasisone-v1.appspot.com",
  messagingSenderId: "870692746289",
  appId: "1:870692746289:web:6c7eb2071ef6c41e811110",
  measurementId: "G-P4DCZJB0H2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
    return messaging.getToken({vapidKey: 'GENERATED_MESSAGING_KEY'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  };