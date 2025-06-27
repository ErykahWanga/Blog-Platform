
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/login', {
        email,
        password,
      });

      const { access_token, user } = response.data;

      // ✅ Store token and user
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));

      // ✅ Notify parent App
      onLogin(user);

      // ✅ Navigate to home
      navigate('/');
    } catch (err) {
      console.error(err);
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 text-white rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {message && <p className="mb-3 text-red-400">{message}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 rounded bg-gray-900 border border-gray-600"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-gray-900 border border-gray-600"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
