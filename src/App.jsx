	








import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import PostList from './components/PostList.jsx';
import AddPost from './components/AddPost.jsx';
import EditPost from './components/EditPost.jsx';
import PostDetails from './components/PostDetails.jsx';
import FavoritePosts from './components/FavoritePosts.jsx';

function App() {
  const location = useLocation(); // Detects path changes

  return (
    <div className="bg-gray-900 min-h-screen text-white overflow-hidden">
      <Navbar />
      <main
        key={location.pathname} // forces re-render on route change
        className="transform transition-transform duration-500 ease-out animate-slide-in px-4"
      >
        <Routes location={location}>
          <Route path="/" element={<PostList />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/favorites" element={<FavoritePosts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

