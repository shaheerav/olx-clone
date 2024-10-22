import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUV-6GLBHtR2AgMesQ_FKCyEuUMrwkggM",
  authDomain: "olx-clone-b8049.firebaseapp.com",
  projectId: "olx-clone-b8049",
  storageBucket: "olx-clone-b8049.appspot.com",
  messagingSenderId: "762906115978",
  appId: "1:762906115978:web:b5d310708c3e186120d273",
  measurementId: "G-4XMQG43557",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth service
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { storage, auth, db };
export default app;
