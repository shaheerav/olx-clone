import React, { createContext, useState } from "react";
import { auth } from "../firebase/config"; // Import the correct Firebase 'auth' object

// Create AuthContext and FirebaseContext
export const AuthContext = createContext(null);
export const FirebaseContext = createContext(null);

// Firebase Provider to wrap the application
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <FirebaseContext.Provider value={{ auth }}>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </FirebaseContext.Provider>
  );
};
