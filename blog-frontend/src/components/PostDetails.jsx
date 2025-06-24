import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://json-server-vercel-git-main-erykahwangas-projects.vercel.app/posts/${id}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleFavorite = async () => {
    setIsUpdatingFavorite(true);
    try {
      await fetch(`https://json-server-vercel-git-main-erykahwangas-projects.vercel.app/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !post.isFavorite }),
      });
      // Update state only after the API call succeeds
      setPost({ ...post, isFavorite: !post.isFavorite });
    } catch (err) {
      setError('Failed to update favorite');
    } finally {
      setIsUpdatingFavorite(false);
    }
  };

  if (loading) return <div className="text-gray-300 text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  if (!post) return <div className="text-gray-400 text-center mt-10">Post not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gray-800 p-6 rounded shadow border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
        <p className="text-gray-400 mb-2">By {post.author}</p>
        <p className="text-gray-300 mb-6">{post.content}</p>
        <div className="flex space-x-4">
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Back to Posts
          </Link>
          <button
            onClick={handleFavorite}
            disabled={isUpdatingFavorite}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center space-x-2"
          >
            {isUpdatingFavorite ? (
              <span>Updating...</span>
            ) : post.isFavorite ? (
              <>
                <span>Unfavorite</span>
              </>
            ) : (
              <>
                <span>Favorite</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;