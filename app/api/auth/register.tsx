// pages/api/register.ts
import bcrypt from 'bcrypt';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await connectDB();

    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });

    try {
      await user.save();
      res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(400).json({ success: false, message: 'User already exists' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
