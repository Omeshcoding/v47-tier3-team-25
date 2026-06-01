import { auth } from '@/auth';

import { connect } from '@/dbconfig/dbconfig';
import User from '@/models/user';

import { NextResponse } from 'next/server';

export async function GET() {
  await connect();

  const session = await auth();

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await User.findById(session.user.id).select('-password');

  let message = 'Welcome to admin profile';

  if (user.role === 'customer') message = 'Welcome customer';

  if (user.role === 'dealer') message = 'Welcome dealer';

  return NextResponse.json({
    message,
    user,
  });
}
