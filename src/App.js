import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import PostDetails from "./pages/PostDetails";
import { getPosts } from "./utils/api";
import { ThemeSwitcher } from "./components/ThemesContext";
import { useDispatch, useSelector } from 'react-redux';
function App() {
  const dispatch=useDispatch()
  const [posts, setPosts] = useState([]);

  const updatePosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    updatePosts();
  }, []);

  return (
    <div>
      <ThemeSwitcher>
        <Header updatePosts={updatePosts} />
        <Routes>
          <Route
            path="/"
            element={<Home posts={posts} updatePosts={updatePosts} />}
          />
          <Route
            path="/postDetails/:id"
            element={<PostDetails updatePosts={updatePosts} posts={posts} />}
          />
        </Routes>
      </ThemeSwitcher>
    </div>
  );
}

export default App;
