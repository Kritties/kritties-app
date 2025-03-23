import { NextResponse } from 'next/server';
import { createUser, getUsers } from '@/backend/services/users';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, walletAddress } = body;

  if (!name || !walletAddress) {
    return NextResponse.json(
      { error: 'name y walletAddress son obligatorios' },
      { status: 400 }
    );
  }

  const user = await createUser({ name, email, walletAddress });

  return NextResponse.json(user);
}

export async function GET(req: Request) {
  const users = await getUsers();
  return NextResponse.json(users);
}