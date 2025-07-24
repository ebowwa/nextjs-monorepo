"use client";
// firebase
import { useState } from 'react';
import { db}  from "@/components/firebase";
import {auth} from "@/components/firebase"
import { Label } from "@/components/ui/common/label";
import { Input } from "@/components/ui/common/input";
import { Checkbox } from "@/components/ui/common/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/common/button";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import createUserWithEmailAndPassword function
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc, getDocs } from "firebase/firestore";
 import { useRouter } from 'next/navigation';



export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [companyRole, setCompanyRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter(); // Initialize useRouter hook

  const addTodo = async (userId:String) => {

    try {
     

      const docRef = await addDoc(collection(db, "Users"), {
        userId: userId, // Add user's ID as the key
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone,
        email: email,
        companyName: companyName,
        companyRole: companyRole,    
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  const handleSignUp = async () => {

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const user = credential.user;
      console.log('User signed up successfully!');
      
      // Assuming the user's ID is available in the user object
      if (user) {
        await addTodo(user.uid); // Pass user's ID to addTodo function
        router.push("/browse-vendors");
      }


      setError(null);
    }  catch (error) {
      // Assuming error is of type Error, but we check to be sure
      if (error instanceof Error) {
        console.error('Error signing up:', error.message);
        // Safe to access error.message here
        setError(`${error.message} akreem`);
      } else {
        // Fallback for when error is not an Error instance
        console.error('Error signing up:', error);
        setError(`An unknown error occurred akreem`);
      }
    }
  };
    

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
      </div>
      <div className="space-y-4">
        {/* Form fields and labels */}
        <div className="grid grid-cols-2 gap-4">
          {/* First Name and Last Name fields */}
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" placeholder="John" required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" placeholder="Doe" required type="text"  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </div>
        </div>
        {/* Email field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        {/* kareem */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="415-505-5555" required type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        {/* Password and Confirm Password fields */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" required type="password" />
        </div>
        {/* Company Name and Role fields */}
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" placeholder="Company Inc." required type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}  />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" placeholder="Developer" required type="text" value={companyRole} onChange={(e) => setCompanyRole(e.target.value)} />
        </div>
        {/* Terms and Conditions */}
        <div className="space-y-2">
          <Checkbox id="terms" />
          <Label className="text-sm" htmlFor="terms">
            I agree to the
            <Link className="underline" href="#">terms and conditions</Link>
          </Label>
        </div>
        {/* Error message display */}
        {error && <p className="text-red-500">{error}</p>}
        {/* Sign Up button */}
        <Button className="w-full" type="button" onClick={handleSignUp}>
          Sign Up
        </Button>
        {/* Link to Sign In */}
        <Link className="block text-center text-sm underline underline-offset-[4px] dark:underline-offset-0" href="/signin">
          Sign in instead
        </Link>
      </div>
    </div>
  );
}

