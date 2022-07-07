import React from "react";
import Post from "../components/Post";
import { useContext } from "react";
import { ThemeContext } from "../components/ThemesContext";

const Home = ({ posts, updatePosts }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <section className="min-vh-100" style={theme}>
      {posts.map((post) => (
        <div>
          <br />
          <Post key={post.id} post={post} updatePosts={updatePosts} />
          <br />
        </div>
      ))}
    </section>
  );
};

export default Home;
