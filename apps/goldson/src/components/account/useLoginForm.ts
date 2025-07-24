"use client";
// firebase
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/components/firebase";

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(`User logged in successfully!`);
      setError(null);
      window.location.href = `https://www.google.com`;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error logging in:`, error.message);
        setError(error.message);
      } else {
        console.error(`Error logging in:`, error);
        setError('An unknown error occurred');
      }
    }
  };

  return { setEmail, setPassword, handleLogin, error };
};
