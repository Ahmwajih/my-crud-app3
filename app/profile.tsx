// pages/profile.tsx
import { useSession, signOut } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();

  if (!session) {
    return <p>You are not logged in. Please sign in to view this page.</p>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Signed in as {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
