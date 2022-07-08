import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDz6pwAX1Bfy8pTuaB_2jxmJSIXPYOi0CU",
    authDomain: "twitter-f7065.firebaseapp.com",
    projectId: "twitter-f7065",
    storageBucket: "twitter-f7065.appspot.com",
    messagingSenderId: "996915794691",
    appId: "1:996915794691:web:a6167a76c6a2541ec98f36",
    measurementId: "G-GHYYH3NKTD"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);