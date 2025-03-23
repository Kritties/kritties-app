import { NextRequest, NextResponse } from 'next/server';
import { getDonationsByPet } from '@/backend/services/donations';

export async function GET(
  _req: NextRequest,
  { params }: { params: { petId: string } }
) {
  const { petId } = params;

  if (!petId) {
    return NextResponse.json({ error: 'petId requerido' }, { status: 400 });
  }

  try {
    const donations = await getDonationsByPet(petId);
    return NextResponse.json(donations);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
