import { NextRequest, NextResponse } from 'next/server';
import { getDonationsByUser } from '@/backend/services/donations';

export async function GET(
  _req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: 'userId requerido' }, { status: 400 });
  }

  try {
    const donations = await getDonationsByUser(userId);
    return NextResponse.json(donations);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
