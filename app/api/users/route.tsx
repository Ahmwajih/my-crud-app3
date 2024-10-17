// routes/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// POST request to create a user
export async function POST(req: NextRequest) {
  await connectDB(); // Ensure connection to the database

  try {
    // Extract username and password from the request body
    const { username, password } = await req.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const user = await User.create({ username, password: hashedPassword });

    // Return success response with user data
    return NextResponse.json({ success: true, data: user }, { status: 201 });

  } catch (error) {
    // Return an error response in case of failure
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
