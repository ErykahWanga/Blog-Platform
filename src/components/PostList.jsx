import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts')
        if (!response.ok) throw new Error('Failed to fetch posts')
        const data = await response.json()
        setPosts(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/posts/${id}`, { method: 'DELETE' })
      setPosts(posts.filter(post => post.id !== id))
    } catch (err) {
      setError('Failed to delete post')
    }
  }

  const handleFavorite = async (id, isFavorite) => {
    try {
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !isFavorite })
      })
      setPosts(posts.map(post =>
        post.id === id ? { ...post, isFavorite: !isFavorite } : post
      ))
    } catch (err) {
      setError('Failed to update favorite status')
    }
  }

  if (loading) return <div className="text-gray-300 text-center">Loading...</div>
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>
  if (posts.length === 0) return <div className="text-gray-300 text-center">No posts available</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map(post => (
        <div key={post.id} className="bg-gray-800 p-4 rounded shadow border border-gray-700">
          <h2 className="text-xl font-semibold text-white">{post.title}</h2>
          <p className="text-gray-400">By {post.author}</p>
          <div className="mt-4 flex space-x-2">
            <Link to={`/post/${post.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View</Link>
            <Link to={`/edit/${post.id}`} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</Link>
            <button 
              onClick={() => handleDelete(post.id)} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button 
              onClick={() => handleFavorite(post.id, post.isFavorite)} 
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              {post.isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList