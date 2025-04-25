import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FavoritePosts() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('https://json-server-vercel-last.vercel.app/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        const favoritePosts = data.filter(post => post.isFavorite);
        setFavorites(favoritePosts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

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
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Favorite Posts</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-400">
          No favorite posts yet.{' '}
          <Link to="/" className="text-blue-500">
            Go back to all posts.
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(post => (
            <div key={post.id} className="bg-gray-800 p-4 rounded shadow border border-gray-700">
              <h2 className="text-xl font-semibold text-white">{post.title}</h2>
              <p className="text-gray-400">By {post.author}</p>
              <div className="mt-4">
                <Link
                  to={`/post/${post.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  aria-label={`View post titled "${post.title}"`}
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritePosts;