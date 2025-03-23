import { NextResponse } from 'next/server';
import { createDonation } from '@/backend/services/donations';

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, petId, amount, transactionId } = body;

  if (!userId || !petId || !amount || !transactionId) {
    return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
  }

  try {
    const donation = await createDonation({ userId, petId, amount, transactionId });
    return NextResponse.json(donation);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
