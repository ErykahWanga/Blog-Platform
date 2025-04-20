import React, { useEffect, useState } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts'); 
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  
  const deletePost = async (postId) => {
    try {
      await fetch(`/api/posts/${postId}`, { method: 'DELETE' }); 
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  
  const toggleFavorite = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, favorite: !post.favorite } : post
      )
    );
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: '1rem' }}>
              <h2>{post.title}</h2>
              <p>Author: {post.author}</p>
              <p>Favorite: {post.favorite ? 'Yes' : 'No'}</p>
              <button onClick={() => toggleFavorite(post.id)}>
                {post.favorite ? 'Unfavorite' : 'Favorite'}
              </button>
              <button onClick={() => deletePost(post.id)}>Delete</button>
              <a href={`/posts/${post.id}`}>View</a>
              <a href={`/posts/${post.id}/edit`} style={{ marginLeft: '1rem' }}>
                Edit
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;