import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeIZTXFxo12kM7Bu2ZIpxqc06C_LIiqn8",
  authDomain: "pcparts-bb425.firebaseapp.com",
  projectId: "pcparts-bb425",
  storageBucket: "pcparts-bb425.appspot.com",
  messagingSenderId: "380361184608",
  appId: "1:380361184608:web:bf9e389abd1f68d2003a05",
  measurementId: "G-Q9T6YJ5PP1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
