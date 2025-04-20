import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">Blog Platform</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Posts</Link>
          <Link to="/add" className="text-white hover:text-gray-300">Add Post</Link>
          <Link to="/favorites" className="text-white hover:text-gray-300">Favorites</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar