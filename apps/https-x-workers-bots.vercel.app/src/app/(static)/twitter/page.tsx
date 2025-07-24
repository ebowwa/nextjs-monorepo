// app/page.tsx
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../(clientsubstrate)/components/ui/card";

export default function TwitterUserPage() {
  return (
    <div>
      <h1>Twitter User Search</h1>
      <SearchForm />
    </div>
  );
}

function SearchForm() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchParams = new URLSearchParams({ username });
    router.push(`/twitter/user?${searchParams}`);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Enter Twitter username" value={username} onChange={handleUsernameChange} />
      <button type="submit">Search</button>
    </form>
  );
}