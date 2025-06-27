import { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.access_token);
      onLogin(response.data.user);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl mb-4">Login</h2>
      {error && <p className="text-red-400 mb-2">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-2 p-2 rounded bg-gray-900 border border-gray-600"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-4 p-2 rounded bg-gray-900 border border-gray-600"
      />
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded">
        Login
      </button>
    </form>
  );
}

export default LoginForm;