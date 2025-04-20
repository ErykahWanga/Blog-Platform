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
      })
  }, [])

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/posts/${id}`, { method: 'DELETE' })
    setPosts(posts.filter(post => post.id !== id))
  }

  const handleFavorite = async (id, isFavorite) => {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFavorite: !isFavorite })
    })
    setPosts(posts.map(post =>
      post.id === id ? { ...post, isFavorite: !isFavorite } : post
    ))
  }

  if (loading) return <div className="text-gray-300">Loading...</div>
  if (posts.length === 0) return <div className="text-gray-300">No posts available</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map(post => (
        <div key={post.id} className="bg-gray-800 p-4 rounded shadow border border-gray-700">
          <h2 className="text-xl font-semibold text-white">{post.title}</h2>
          <p className="text-gray-400">By {post.author}</p>
          <div className="mt-4 flex space-x-2">
            <Link to={`/post/${post.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">View</Link>
            <Link to={`/edit/${post.id}`} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</Link>
            <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            <button onClick={() => handleFavorite(post.id, post.isFavorite)} className="bg-purple-500 text-white px-4 py-2 rounded">
              {post.isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList