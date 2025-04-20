import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newPost = { title, content, author, isFavorite: false }
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      })
      if (!response.ok) throw new Error('Failed to add post')
      setTitle('')
      setContent("")
      setAuthor("")
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded shadow border border-gray-700">
      <h1 className="text-2xl font-bold text-white mb-4">Add New Post</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            rows="5"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button 
          type="submit" 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Post
        </button>
      </form>
    </div>
  )
}

export default AddPost