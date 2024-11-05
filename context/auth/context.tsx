"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/lib/firebase/config";


const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [ userData, authLoading, _ ] = useAuthState(auth);
  const [ user, setUser ] = useState<any>(null);
  const [ userId, setUserId ] = useState<any>(null);
  const [ loading, setLoading ] = useState<boolean>(true);


  const value = {
    user, setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
