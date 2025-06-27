import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import PostList from './components/PostList.jsx';
import AddPost from './components/AddPost.jsx';
import EditPost from './components/EditPost.jsx';
import PostDetails from './components/PostDetails.jsx';
import FavoritePosts from './components/FavoritePosts.jsx';
import SignupForm from './components/SignupForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check localStorage for user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    localStorage.setItem('token', loggedInUser.token); // if token exists
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="p-4">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupForm />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <PostList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute user={user}>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute user={user}>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute user={user}>
                <PostDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute user={user}>
                <FavoritePosts />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
