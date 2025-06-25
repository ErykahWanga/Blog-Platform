import React, { useState, useEffect } from 'react';
import { FaComment, FaStar, FaEdit, FaTrash } from 'react-icons/fa';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [editingPost, setEditingPost] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', author: '', image: '' });
  const [expandedPosts, setExpandedPosts] = useState({});
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://json-server-vercel-last.vercel.app/posts/';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Expected an array of posts, but received: ' + JSON.stringify(data));
        }
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        console.error('Fetch error details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const handleAddComment = async (postId) => {
    const commentText = newComment[postId];
    if (!commentText) return;

    const post = posts.find((p) => p.id === postId);
    const updatedComments = [
      ...(post.comments || []),
      {
        id: (post.comments?.length || 0) + 1,
        author: 'Guest',
        text: commentText,
      },
    ];

    try {
      const response = await fetch(`${API_URL}/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments: updatedComments }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add comment: ${response.status} ${response.statusText}`);
      }

      const updatedPost = await response.json();
      setPosts(posts.map((p) => (p.id === postId ? updatedPost : p)));
      setFilteredPosts(filteredPosts.map((p) => (p.id === postId ? updatedPost : p)));
      setNewComment({ ...newComment, [postId]: '' });
    } catch (err) {
      console.error('Comment error:', err);
      setError(err.message);
    }
  };

  const handleToggleFavorite = async (postId) => {
    const post = posts.find((p) => p.id === postId);
    const updatedFavorite = !post.isFavorite;

    try {
      const response = await fetch(`${API_URL}/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: updatedFavorite }),
      });

      if (!response.ok) {
        throw new Error(`Failed to toggle favorite: ${response.status} ${response.statusText}`);
      }

      const updatedPost = await response.json();
      setPosts(posts.map((p) => (p.id === postId ? updatedPost : p)));
      setFilteredPosts(filteredPosts.map((p) => (p.id === postId ? updatedPost : p)));
    } catch (err) {
      console.error('Favorite error:', err);
      setError(err.message);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post.id);
    setEditForm({
      title: post.title,
      content: post.content,
      author: post.author,
      image: post.image || '',
    });
  };

  const handleSaveEdit = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error(`Failed to update post: ${response.status} ${response.statusText}`);
      }

      const updatedPost = await response.json();
      setPosts(posts.map((p) => (p.id === postId ? updatedPost : p)));
      setFilteredPosts(filteredPosts.map((p) => (p.id === postId ? updatedPost : p)));
      setEditingPost(null);
      setEditForm({ title: '', content: '', author: '', image: '' });
    } catch (err) {
      console.error('Edit error:', err);
      setError(err.message);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.status} ${response.statusText}`);
      }

      setPosts(posts.filter((p) => p.id !== postId));
      setFilteredPosts(filteredPosts.filter((p) => p.id !== postId));
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message);
    }
  };

  const toggleExpandPost = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Blog Posts</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPosts.length === 0 && !error && (
          <p className="text-gray-300 col-span-2">No posts available.</p>
        )}
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
            {editingPost === post.id ? (
              <div className="mb-4">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full p-2 mb-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Title"
                />
                <textarea
                  value={editForm.content}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  className="w-full p-2 mb-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Content"
                />
                <input
                  type="text"
                  value={editForm.author}
                  onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                  className="w-full p-2 mb-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Author"
                />
                <input
                  type="url"
                  value={editForm.image}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                  className="w-full p-2 mb-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Image URL"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSaveEdit(post.id)}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPost(null)}
                    className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
                <p
                  className={`text-gray-300 mb-2 ${
                    expandedPosts[post.id] ? '' : 'line-clamp-3'
                  }`}
                >
                  {post.content}
                </p>
                <p className="text-gray-400 text-sm mb-4">By {post.author}</p>

                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => handleToggleFavorite(post.id)}
                    className={`text-2xl ${post.isFavorite ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-500`}
                    title={post.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <FaStar />
                  </button>
                  <button
                    onClick={() => handleEditPost(post)}
                    className="text-2xl text-gray-400 hover:text-blue-500"
                    title="Edit post"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-2xl text-gray-400 hover:text-red-500"
                    title="Delete post"
                  >
                    <FaTrash />
                  </button>
                </div>

                {expandedPosts[post.id] && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-white mb-2">Comments</h3>
                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <div key={comment.id} className="text-gray-300 text-sm mb-2">
                          <span className="font-semibold">{comment.author}:</span> {comment.text}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">No comments yet.</p>
                    )}
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment[post.id] || ''}
                        onChange={(e) =>
                          setNewComment({ ...newComment, [post.id]: e.target.value })
                        }
                        className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 flex items-center space-x-2"
                      >
                        <FaComment />
                        <span>Comment</span>
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => toggleExpandPost(post.id)}
                  className="mt-4 text-blue-400 hover:text-blue-500 underline"
                >
                  {expandedPosts[post.id] ? 'View Less' : 'View More'}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
