// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'your-email@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await connectDB();
        const { email, password } = credentials as { email: string, password: string };

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('No user found with this email');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error('Password is incorrect');
        }

        return { id: user._id, email: user.email };
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error'
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || 'my-secret',
});
