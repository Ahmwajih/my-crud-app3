// app/page.tsx
'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('admin');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, country, role }),
      });

      if (res.ok) {
        alert('User added successfully');
        setName('');
        setEmail('');
        setPassword('');
        setCountry('');
        setRole('admin');
      } else {
        alert('Error adding user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Add a New User</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="seeker">Seeker</option>
          <option value="provider">Provider</option>
        </select>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}