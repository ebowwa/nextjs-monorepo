// app/twitter-user/page.tsx

import { Client } from 'twitter.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../(clientsubstrate)/components/ui/card";

type Params = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function TwitterUserDetailsPage({ searchParams }: Params) {
  const username = searchParams.username;
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    return (
      <div>
        <h1>Error</h1>
        <p>Twitter bearer token is not configured.</p>
      </div>
    );
  }

  if (!username) {
    return (
      <div>
        <h1>Error</h1>
        <p>Please provide a username in the search query.</p>
      </div>
    );
  }

  const client = new Client();
  await client.loginWithBearerToken(bearerToken);

  try {
    const user = await client.users.fetchByUsername(Array.isArray(username) ? username[0] : username);

    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Twitter User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>Username: {user.username}</p>
            <p>Description: {user.description}</p>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error('Error fetching user:', error);
    return (
      <div>
        <h1>Error</h1>
        <p>Failed to fetch user details. Please check the provided username.</p>
      </div>
    );
  }
}