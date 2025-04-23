import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import PostList from './components/PostList.jsx';
import AddPost from './components/AddPost.jsx';
import EditPost from './components/EditPost.jsx';
import PostDetails from './components/PostDetails.jsx';
import FavoritePosts from './components/FavoritePosts.jsx';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/favorites" element={<FavoritePosts />} />
      </Routes>
    </div>
  );
}

export default App;