<<<<<<< HEAD
import React from 'react'; // ✅ Required for JSX
import { Link } from 'react-router-dom';
=======
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
>>>>>>> 7eaf4fd85af37d051b40e6d1a4fbc27104e1e420

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Blog Platform
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-white hover:text-gray-300">
            Posts
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/add" className="text-white hover:text-gray-300">
                Add Post
              </Link>
              <Link to="/favorites" className="text-white hover:text-gray-300">
                Favorites
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-white hover:text-blue-400">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-green-400">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
