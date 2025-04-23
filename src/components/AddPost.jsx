import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddPost() {
<<<<<<< HEAD
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author, isFavorite: false }),
      });
      if (!response.ok) throw new Error('Failed to add post');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Add New Post</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="bg-gray-800 p-6 rounded shadow border border-gray-700">
=======
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = { title, content, author, isFavorite: false }
    await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    })
    navigate('/')
  }

  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded shadow border border-gray-700">
      <h1 className="text-2xl font-bold text-white mb-4">Add New Post</h1>
      <form onSubmit={handleSubmit}>
>>>>>>> origin/brian
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
<<<<<<< HEAD
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
>>>>>>> origin/brian
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
<<<<<<< HEAD
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
=======
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
>>>>>>> origin/brian
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2" htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
<<<<<<< HEAD
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Post
        </button>
      </div>
=======
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Post</button>
      </form>
>>>>>>> origin/brian
    </div>
  );
}

export default AddPost;