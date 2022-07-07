import React from "react";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "../components/ThemesContext";

const Comment = ({ comment }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Container style={theme}>
      <div className="card post" style={theme}>
        <h5 className="card-header">Comment</h5>
        <div className="card-body">
          <h5 className="card-title"> Writen By: {comment.userId}</h5>
          <p className="card-text">{comment.body}</p>
        </div>
      </div>
    </Container>
  );
};

export default Comment;
