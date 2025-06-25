import React from 'react'; // ✅ Required for JSX
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Blog Platform
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Posts
          </Link>
          <Link to="/add" className="text-white hover:text-gray-300">
            Add Post
          </Link>
          <Link to="/favorites" className="text-white hover:text-gray-300">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
