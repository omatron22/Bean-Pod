import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

const auth = getAuth();

// export const signInWithGoogle = () => {
//   signInWithPopup(auth, new GoogleAuthProvider());
// };

// export const logout = () => {
//   signOut(auth);
// };

// export { auth };


const firestore = getFirestore();
const provider = new GoogleAuthProvider();

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
    }, { merge: true });
  } 
  catch (error) {
    console.error("Error signing in with Google: ", error);
  }

};

export const logout = () => {
  signOut(auth);
}

export { auth, firestore };




