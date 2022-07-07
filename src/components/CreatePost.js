import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addPost } from "../utils/api";
import Container from "react-bootstrap/esm/Container";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { ThemeContext } from "./ThemesContext";
const CreatePost = ({ updatePosts, onHide, show }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(20, "Max is 20 characters!")
        .required("This is required!"),
      body: Yup.string()
        .max(50, "Max is 50 characters!")
        .required("This is required!"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const id = Math.floor(Math.random() * 10) + 1;
      const post = { ...values, userId: id };
      formik.resetForm();
      const res = await addPost(post);
      console.log(res);
      onHide();
      updatePosts();
    },
  });
  const { theme, currentTheme } = useContext(ThemeContext);
  return (
    <Container>
      <Modal
        show={show}
        onHide={() => {
          onHide();
          formik.resetForm();
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={theme}
      >
        <Modal.Header closeButton style={theme}>
          <Modal.Title id="contained-modal-title-vcenter">Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body style={theme}>
          <form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title Post</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Form.Text className="text-muted">
                {formik.errors.title ? formik.errors.title : null}
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="body"
                placeholder="Enter your post"
                value={formik.values.body}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <Form.Text className="text-muted">
                {formik.errors.body ? formik.errors.body : null}
              </Form.Text>
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer style={theme}>
          <button
            type="button"
            onClick={formik.handleSubmit}
            className={`${
              currentTheme === "light" ? "btn btn-primary" : "btn btn-warning"
            }`}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreatePost;
