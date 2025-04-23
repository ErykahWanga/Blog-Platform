import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState({ title: '', author: '', content: '', isFavorite: false })

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    })
      .then(() => navigate('/'))
  }

  return (
    <div className="pt-20">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="max-w-lg p-4 border rounded bg-gray-800">
        <div className="mb-4">
          <label className="block text-gray-300">Title</label>
          <input
            type="text"
            value={post.title}
            onChange={e => setPost({ ...post, title: e.target.value })}
            className="border p-2 w-full bg-gray-700 text-white rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Author</label>
          <input
            type="text"
            value={post.author}
            onChange={e => setPost({ ...post, author: e.target.value })}
            className="border p-2 w-full bg-gray-700 text-white rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Content</label>
          <textarea
            value={post.content}
            onChange={e => setPost({ ...post, content: e.target.value })}
            className="border p-2 w-full bg-gray-700 text-white rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              checked={post.isFavorite}
              onChange={e => setPost({ ...post, isFavorite: e.target.checked })}
              className="mr-2"
            />
            Favorite
          </label>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  )
}

export default EditPost