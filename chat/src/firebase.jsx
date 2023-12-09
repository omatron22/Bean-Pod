import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW0XTW4sPLZ7aVA3Ls71WN0ypt-2St7Lk",
  authDomain: "chat3-ebd53.firebaseapp.com",
  projectId: "chat3-ebd53",
  storageBucket: "chat3-ebd53.appspot.com",
  messagingSenderId: "294142247990",
  appId: "1:294142247990:web:016c89578971d049e28497"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();
const provider = new GoogleAuthProvider();

// Function to handle signing in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Store or update user in Firestore
    const userRef = doc(firestore, 'users', user.uid);
    await setDoc(userRef, {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    }, { merge: true });

    await setDoc(doc(firestore, "userChats", user.uid), {});
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error; // Rethrow the error to be handled in the component
  }
};

// Function to handle user sign out
export const logout = () => {
  signOut(auth);
};

// Export the auth, firestore, and storage instances
export { auth, firestore, storage };




