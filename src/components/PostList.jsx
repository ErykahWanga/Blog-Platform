import { useState, useEffect } from 'react';
import { FaComment } from 'react-icons/fa'; 

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError(err.message);
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
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments: updatedComments }),
      });
      if (!response.ok) throw new Error('Failed to add comment');

      const updatedPost = await response.json();
      setPosts(posts.map((p) => (p.id === postId ? updatedPost : p)));
      setFilteredPosts(filteredPosts.map((p) => (p.id === postId ? updatedPost : p)));
      setNewComment({ ...newComment, [postId]: '' }); // Reset the comment input
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Blog Posts</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {filteredPosts.length === 0 && !error && (
          <p className="text-gray-300">No posts available.</p>
        )}
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="min-w-[300px] bg-gray-800 p-4 rounded-lg shadow border border-gray-700"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
            <p className="text-gray-300 mb-2 line-clamp-3">{post.content}</p>
            <p className="text-gray-400 text-sm mb-4">By {post.author}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;