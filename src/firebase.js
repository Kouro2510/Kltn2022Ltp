// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyCWcjZhlvc-1oZu5ajW6I5AzOAEuV4Wm98",
    authDomain: "kltnltp2023.firebaseapp.com",
    projectId: "kltnltp2023",
    storageBucket: "kltnltp2023.appspot.com",
    messagingSenderId: "1056967632149",
    appId: "1:1056967632149:web:45bad23adf83ea743df51c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app);
export default app;