import React from "react";
import { Link } from "react-router-dom";
import { addVote } from "../utils/api";
import moment from "moment";
import { useContext } from "react";
import { ThemeContext } from "./ThemesContext";

const Post = ({ post, updatePosts }) => {
  const addvote = async (userVote) => {
    const vote = { userVote, userId: 5 };
    const res = await addVote(post.id, vote);
    console.log(res);
    updatePosts();
  };
  const { theme, currentTheme } = useContext(ThemeContext);

  return (
    <div  className="card post" style={theme}>
      <h5 className="card-header">
        Post
        <p className="text-end comment">
          {moment(post.createAt).format("h:mm:ss a")}
        </p>
      </h5>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
        <Link
          to={`/postDetails/${post.id}`}
          className={`${
            currentTheme === "light" ? "btn btn-primary" : "btn btn-warning"
          }`}
        >
          Read More
        </Link>
        <h5 className="text-end comment">
          <Link
            to={`/postDetails/${post.id}`}
            className={`${
              currentTheme === "light" ? "btn btn-primary" : "btn btn-warning"
            }`}
          >{`${
            post.comments.length > 1
              ? post.comments.length + "comments"
              : "comment"
          }`}</Link>
        </h5>
        <button
          className={`${
            currentTheme === "light" ? "btn btn-primary" : "btn btn-warning"
          } bttn`}
          onClick={() => addvote(1)}
        >
          +
        </button>
        <button
          className={`${
            currentTheme === "light" ? "btn btn-primary" : "btn btn-warning"
          } bttn`}
          onClick={() => addvote(-1)}
        >
          -
        </button>
        <p className="text-end comment">{`${post.upVotesTotal} Likes`}</p>
      </div>
    </div>
  );
};

export default Post;
