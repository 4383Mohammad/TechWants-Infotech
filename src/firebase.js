import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCDlxA_-yImPrxwGSMVdR_THit58A2evms",
  authDomain: "techwants-leads.firebaseapp.com",
  projectId: "techwants-leads",
  storageBucket: "techwants-leads.firebasestorage.app",
  messagingSenderId: "218437699855",
  appId: "1:218437699855:web:95a86838d36b60e207567a",
  measurementId: "G-4TB56SP095"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
