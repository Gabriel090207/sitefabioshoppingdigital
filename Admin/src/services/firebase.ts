import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrtTsuZ5AF7nc285WXb67Gs1CCB3XViaY",
  authDomain: "shopping-digital-admin-b0b3d.firebaseapp.com",
  projectId: "shopping-digital-admin-b0b3d",
  storageBucket: "shopping-digital-admin-b0b3d.firebasestorage.app",
  messagingSenderId: "584647733973",
  appId: "1:584647733973:web:fe83ff5b102d75da0c685c",
  measurementId: "G-9FTGVHVQNM"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
