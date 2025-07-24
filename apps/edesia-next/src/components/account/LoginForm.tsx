"use client";
// firebase
import { useLoginForm } from '@/components/account/useLoginForm'; // Adjust the path according to your structure
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/common/card";
import { Label } from "@/components/ui/common/label";
import { Input } from "@/components/ui/common/input";
import { Button } from "@/components/ui/common/button";
import Link from "next/link";

export const LoginForm = () => {
  const { setEmail, setPassword, handleLogin, error } = useLoginForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your information to log in to your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder={`m@example.com`} required type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" required type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button className="w-full" type="button" onClick={handleLogin}>
          Login
        </Button>
      </CardContent>
      <CardFooter>
        <div className="mt-4 text-center text-sm">
          {`Don't have an account? `}
          <Link className="underline" href="#">
            Sign Up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
