"use client";
// src/components/ui/template/AuthForms/EmailSignIn.tsx
import Button from '@/components/ui/template/Button';
import Link from 'next/link';
import { signInWithEmail } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface EmailSignInProps {
  allowPassword: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function EmailSignIn({
  allowPassword,
  redirectMethod,
  disableButton
}: EmailSignInProps) {
  const router = useRouter(); // Always call useRouter at the top level
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // Use router conditionally based on redirectMethod
    if (redirectMethod === 'client') {
      await handleRequest(e, signInWithEmail, router);
    } else {
      await handleRequest(e, signInWithEmail);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="my-8">
      <form noValidate={true} className="mb-4" onSubmit={(e) => handleSubmit(e)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder={`name@example.com`}
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="w-full p-3 rounded-md bg-zinc-800"
            />
          </div>
          <Button
            variant="slim"
            type="submit"
            className="mt-1"
            loading={isSubmitting}
            disabled={disableButton}
          >
            Sign in
          </Button>
        </div>
      </form>
      {allowPassword && (
        <>
          <p>
            <Link href="/signin/password_signin" className="font-light text-sm">
              {`Sign in with email and password`}
            </Link>
          </p>
          <p>
            <Link href="/signin/signup" className="font-light text-sm">
              {`Don't have an account? Sign up`}
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
