import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import CreatePost from "./CreatePost";
import { useState } from "react";
import { ReactComponent as Sun } from "../assets/sun-svgrepo-com.svg";
import { ReactComponent as Moon } from "../assets/moon-svgrepo-com.svg";
import { useContext } from "react";
import { ThemeContext } from "./ThemesContext";

const Header = ({ updatePosts }) => {
  const [modalShow, setModalShow] = useState(false);
  const { currentTheme, themeToggle } = useContext(ThemeContext);

  return (
    <Navbar expand="lg" variant="light" className="nav">
      <Container>
        <Navbar.Brand>Tawwr App</Navbar.Brand>
        <div>
          <Link to="/" className="btn bg-transparent">
            Home
          </Link>
          <Button
            className="btn bg-transparent"
            onClick={() => setModalShow(true)}
          >
            + new Post
          </Button>
          <CreatePost
            updatePosts={updatePosts}
            show={modalShow}
            onHide={() => {
              setModalShow(false);
            }}
          />
          {currentTheme === "light" ? (
            <Moon className="svg" onClick={themeToggle} />
          ) : (
            <Sun className="svg" onClick={themeToggle} />
          )}
        </div>
        
      </Container>
    </Navbar>
  );
};

export default Header;
