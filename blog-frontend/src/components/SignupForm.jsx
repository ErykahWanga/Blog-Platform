import React, { useState } from 'react';
import axios from 'axios';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await axios.get(`http://localhost:3000/users?email=${email}`);
      if (res.data.length > 0) {
        setMessage('User with this email already exists.');
        return;
      }

      
      await axios.post('http://localhost:3000/users', {
        username,
        email,
        password,
      });

      setMessage('Signup successful! You can now log in.');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl mb-4">Sign Up</h2>
      {message && <p className="mb-2 text-blue-400">{message}</p>}

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="w-full mb-2 p-2 rounded bg-gray-900 border border-gray-600"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full mb-2 p-2 rounded bg-gray-900 border border-gray-600"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full mb-4 p-2 rounded bg-gray-900 border border-gray-600"
      />

      <button type="submit" className="w-full bg-green-500 hover:bg-green-600 p-2 rounded">
        Sign Up
      </button>
    </form>
  );
}

export default SignupForm;
