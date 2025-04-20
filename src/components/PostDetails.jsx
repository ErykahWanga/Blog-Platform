import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function PostDetails() {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
  }, [id])

  const handleFavorite = () => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFavorite: !post.isFavorite })
    })
      .then(res => res.json())
      .then(updatedPost => setPost(updatedPost))
  }

  if (!post) return <div className="pt-20 text-gray-300">Loading...</div>

  return (
    <div className="pt-20 container mx-auto p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-400">By {post.author}</p>
      <p className="my-4">{post.content}</p>
      <p>{post.isFavorite ? '❤️' : '🤍'}</p>
      <div className="flex space-x-2">
        <button onClick={handleFavorite} className="bg-blue-500 text-white px-4 py-2 rounded">
          {post.isFavorite ? 'Unfavorite' : 'Favorite'}
        </button>
        <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded">Back</Link>
        <Link to={`/edit/${id}`} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</Link>
      </div>
    </div>
  )
}

export default PostDetails