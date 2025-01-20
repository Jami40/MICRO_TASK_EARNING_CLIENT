// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
//   apiKey: "AIzaSyDBHfTpMRMIxLA74t2gQPIu-S29f7VdnXI",
//   authDomain: "micro-task-earning.firebaseapp.com",
//   projectId: "micro-task-earning",
//   storageBucket: "micro-task-earning.firebasestorage.app",
//   messagingSenderId: "85313424442",
//   appId: "1:85313424442:web:ccdb8ec5dd76bb5e04f903"

apiKey: import.meta.env.VITE_apiKey,
authDomain: import.meta.env.VITE_authDomain,
projectId: import.meta.env.VITE_projectId,
storageBucket: import.meta.env.VITE_storageBucket,
messagingSenderId: import.meta.env.VITE_messagingSenderId,
appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);