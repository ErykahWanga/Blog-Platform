import React from 'react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

function AddPost({ onAddPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = 'http://127.0.0.1:5000/posts/'; // Your Flask backend endpoint
  const token = localStorage.getItem('token');    // JWT stored on login

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("You must be logged in to post.");
      return;
    }

    const newPost = {
      title,
      content,
      image
    };

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_URL, newPost, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      onAddPost(response.data);

      setTitle('');
      setContent('');
      setImage('');
    } catch (err) {
      console.error('Add post error:', err);
      setError(err.response?.data?.error || 'Failed to add post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4">Add a New Post</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          required
          className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
        />
        <input
          type="url"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
        >
          {isLoading ? 'Adding...' : (<><FaPlus /><span>Add Post</span></>)}
        </button>
      </form>
    </div>
  );
}

export default AddPost;
