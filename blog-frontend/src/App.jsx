import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);
    const [userId] = useState(1);
    const [message, setMessage] = useState('');
    useEffect(() => {
        setPosts([{ id: 1, title: 'Sample Post', content: 'This is a test post' }]);
    }, []);
    const toggleFavorite = async (postId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/favorites/', {
                user_id: userId,
                post_id: postId,
            });
            setMessage(response.data.message);
        } catch (err) {
            setMessage('Error toggling favorite');
        }
    };
    return (
        <div className="app">
            <h1>Blog Platform</h1>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title}
                        <button onClick={() => toggleFavorite(post.id)}>
                            {message.includes('favorited') ? 'Unfavorite' : 'Favorite'}
                        </button>
                    </li>
                ))}
            </ul>
            {message && <p>{message}</p>}
        </div>
    );
}
export default App;