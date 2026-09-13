import React, { createContext, useContext, useEffect, useState } from "react";
import {
  type User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as fbSignOut,
} from "firebase/auth";
import { auth, googleAuthProvider, testFirestoreConnection } from "../lib/firebase";

interface AuthContextType {
  user: User | null;
  idToken: string | null;
  loading: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  idToken: null,
  loading: true,
  authError: null,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  clearAuthError: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Validate connection to Firestore on boot
    testFirestoreConnection();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setAuthError(null);
        try {
          const token = await currentUser.getIdToken();
          setIdToken(token);
          // Sync user with backend/Cloud SQL
          await fetch("/api/users/sync", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).catch((err) => console.error("Error syncing user with Cloud SQL:", err));
        } catch (e) {
          console.error("Failed to get ID token:", e);
          setIdToken(null);
        }
      } else {
        setIdToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearAuthError = () => {
    setAuthError(null);
  };

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error: any) {
      const code = error?.code || "";
      // Handled gracefully: popup closed or canceled by the user is intentional interaction, not a runtime crash
      if (
        code === "auth/popup-closed-by-user" ||
        code === "auth/cancelled-popup-request"
      ) {
        return;
      }
      if (code === "auth/popup-blocked") {
        setAuthError("Popup window was blocked by your browser. Please allow popups or open the app in a new tab.");
        return;
      }
      if (code === "auth/network-request-failed") {
        setAuthError("Network connection interrupted. Please try signing in again.");
        return;
      }
      const message = error?.message || "Authentication could not be completed.";
      setAuthError(message);
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      setIdToken(null);
      setAuthError(null);
    } catch (error: any) {
      console.warn("Sign-out warning:", error?.message || error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        idToken,
        loading,
        authError,
        signInWithGoogle,
        signOut,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
