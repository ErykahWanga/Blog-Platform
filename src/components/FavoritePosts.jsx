import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function FavoritePosts() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/posts?isFavorite=true')
      .then(res => res.json())
      .then(data => setFavorites(data))
  }, [])

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, { method: 'DELETE' })
      .then(() => setFavorites(favorites.filter(post => post.id !== id)))
  }

  const handleFavorite = (id, isFavorite) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFavorite: !isFavorite })
    })
      .then(() => setFavorites(favorites.filter(post => post.id !== id)))
  }

  return (
    <div className="pt-20">
      <h1 className="text-2xl font-bold mb-4">Favorite Posts</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-300">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map(post => (
            <div key={post.id} className="border p-4 rounded shadow bg-gray-800">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-400">By {post.author}</p>
              <p>❤️</p>
              <div className="flex space-x-2 mt-2">
                <Link to={`/post/${post.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">View</Link>
                <Link to={`/edit/${post.id}`} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</Link>
                <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                <button onClick={() => handleFavorite(post.id, post.isFavorite)} className="bg-purple-500 text-white px-4 py-2 rounded">Unfavorite</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritePosts