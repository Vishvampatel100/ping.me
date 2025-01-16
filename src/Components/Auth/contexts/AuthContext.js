import React, { useContext, useEffect, useState } from "react";
import { auth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword } from "../Firebase";


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // Signup function
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password); // Pass `auth` as the first argument
  }
  //Login function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password); // Pass `auth` as the first argument
  }

  //signout function
  function logout() {
    return signOut(auth); // Pass `auth` as the first argument
  }

  //reset password function
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email); // Pass `auth` as the first argument
  }

  //update profile function
  function newPassword(password) {
    return updatePassword(auth.currentUser, password); // Pass `auth.currentUser` as the first argument
  }



  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { // Pass `auth` as the first argument
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    newPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
