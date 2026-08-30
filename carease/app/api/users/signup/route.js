import { connect } from '@/dbconfig/dbconfig';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(request) {
  try {
    await connect();

    const { username, email, password, role } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'All required fields must be provided.' },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email.' },
        { status: 409 },
      );
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return NextResponse.json(
        { error: 'Username is already taken.' },
        { status: 409 },
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'customer',
      provider: 'credentials',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully.',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: 'Something went wrong.',
      },
      { status: 500 },
    );
  }
}
