"use client"
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link'; // Import Link from 'next/link'
import { firebaseApp } from '@/components/firebase';

// Initialize Firebase auth
const auth = getAuth(firebaseApp);

interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string; // Define the type of redirectMethod
}

const SignUp: React.FC<SignUpProps> = ({ allowEmail, redirectMethod }) => {
  // Define states and router
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Function to handle sign-in
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirect to dashboard after successful sign-in
    } catch (error) {
     // console.error('Error signing in:', error.message);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(); // Call login function to sign in
    setIsSubmitting(false);
  };

  return (
    <div className="my-8">
      <form noValidate={true} className="mb-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-zinc-800"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-zinc-800"
            />
          </div>
          <button
            type="submit"
            className="mt-1 p-3 rounded-md bg-blue-500 text-white"
            disabled={isSubmitting}
          >
            Sign up
          </button>
        </div>
      </form>
      <p>Already have an account?</p>
      <p>
        <Link href="/signin/password_signin" className="font-light text-sm">
          Sign in with email and password
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link href="/signin/email_signin" className="font-light text-sm">
            Sign in via magic link
          </Link>
        </p>
      )}
    </div>
  );
};

export default SignUp;
