import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `http://127.0.0.1:5000/posts/${id}`;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        setTitle(data.title);
        setContent(data.content);
        setImage(data.image || '');
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch post');
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('You must be logged in to update a post.');
      return;
    }

    try {
      await axios.put(API_URL, { title, content, image }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update post');
    }
  };

  if (loading) return <div className="text-gray-300 text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-800 p-6 rounded shadow border border-gray-700">
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
              rows="5"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Image URL (optional)</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
