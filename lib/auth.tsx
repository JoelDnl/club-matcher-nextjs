"use client";

import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { getIdToken } from "firebase/auth";

interface UserProps {
  uid: string | null;
  email: string | null;
  token: string | null;
}

const NULL_USER = {
  uid: null,
  email: null,
  token: null,
};

interface ContextProps {
  user: UserProps;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<ContextProps>({
  user: NULL_USER,
  loading: true,
  signUp: async () => undefined,
  signIn: async () => undefined,
  signOut: async () => undefined,
});

export const AuthProvider = ({ children }: { children: any }) => {
  return (
    <AuthContext.Provider value={useProvideAuth()}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState<UserProps>(NULL_USER);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser: User | null) => {
    setLoading(false);
    if (rawUser) {
      const u = await formatUser(rawUser);
      setUser(u);
      return u;
    }
    setUser(NULL_USER);
    return false;
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          handleUser(res.user);
          setLoading(false);
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          handleUser(res.user);
          setLoading(false);
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    auth.signOut().then(() => handleUser(null));
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleUser);
    return () => unsub();
  }, []);

  return { user, loading, signUp, signIn, signOut };
}

async function formatUser<UserProps>(user: User) {
  const token = await getIdToken(user);
  return {
    uid: user.uid,
    email: user.email,
    token,
  };
}
