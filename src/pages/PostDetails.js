import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import Button from "react-bootstrap/esm/Button";
import { useContext } from "react";
import { ThemeContext } from "../components/ThemesContext";

const PostDetails = ({ posts, updatePosts }) => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const { theme, currentTheme } = useContext(ThemeContext);

  useEffect(() => {
    const postFind = posts.find((post) => post.id === +id);
    setPost(postFind);
  }, [posts]);

  return (
    <div className="min-vh-100"style={theme}>
      <br></br>
      <div className="card" style={theme}>
        <h5 className="card-header">
          Post
          <p className="text-end comment">
            {moment(post?.createAt).format("h:mm:ss a")}
          </p>
        </h5>
        <div className="card-body">
          <h5 className="card-title">{post?.title}</h5>
          <p className="card-text">{post?.body}</p>
          <p className="text-end comment">{`${post?.upVotesTotal} Likes`}</p>
        </div>
      </div>

      <div>
        <Button
          onClick={() => setModalShow(true)}
          className={`${
            currentTheme === "light" ? "btn btn-primary" : "btn btn-warning"
          }`}
        >
          Add Comment
        </Button>

        <CommentForm
          show={modalShow}
          onHide={() => setModalShow(false)}
          updatePosts={updatePosts}
          id={id}
        />
      </div>

      <br></br>

      {post?.comments?.length > 0 &&
        post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </div>
  );
};

export default PostDetails;
