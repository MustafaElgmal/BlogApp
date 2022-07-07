import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addComment } from "../utils/api";
import { useContext } from "react";
import { ThemeContext } from "./ThemesContext";

const CommentForm = ({ updatePosts, onHide, show, id }) => {
  const { theme, currentTheme } = useContext(ThemeContext);
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: Yup.object({
      body: Yup.string()
        .max(50, "Max 50 characters!")
        .required("Body is required!"),
    }),
    onSubmit: async (values) => {
      const comm = { ...values, userId: 5 };
      const res = await addComment(id, comm);
      console.log(res);
      updatePosts();
      formik.resetForm();
      onHide();
    },
  });
  return (
    <section style={theme}>
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
          <Modal.Title id="contained-modal-title-vcenter">
            Add Comment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={theme}>
          <form style={theme}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={theme}>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="body"
                placeholder="Enter your Comment"
                value={formik.values.body}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <Form.Text className="text-muted" style={theme}>
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
    </section>
  );
};

export default CommentForm;
