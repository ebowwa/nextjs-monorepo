// app/api/user/route.ts
// nextjs 14 
// serverside api for visitor/user management
// safe secure feature rich opensource low resource serverless client side compatibility
//include: name, email..
//unregistered_vistor track/management
//cookies compatible

// app/api/user/route.ts
import { NextResponse } from 'next/server';

// In-memory user/visitor data store
const users = new Map<string, { name: string; email: string }>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (email) {
    const user = users.get(email);
    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } else {
    return NextResponse.json(Array.from(users.values()));
  }
}

export async function POST(request: Request) {
  const { name, email } = await request.json();

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  if (users.has(email)) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  const user = { name, email };
  users.set(email, user);

  return NextResponse.json(user, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  if (!users.has(email)) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  users.delete(email);
  return NextResponse.json({ message: 'User deleted' });
}