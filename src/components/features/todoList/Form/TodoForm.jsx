import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./TodoForm.css";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  priority: Yup.string().required(),
  dueDate: Yup.date().required("Due date is required"),
});

const TodoForm = ({ initialValues, onSubmit, mode }) => {
  return (
    <div>
      <Formik
        initialValues={{
          title: initialValues.title || "",
          description: initialValues.description || "",
          priority: initialValues.priority || "medium",
          dueDate: initialValues.dueDate
            ? new Date(initialValues.dueDate).toISOString().slice(0, 16)
            : "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Title</label>
              <Field name="title" />
              <ErrorMessage name="title" component="div" />
            </div>

            <div>
              <label>Description</label>
              <Field name="description" />
              <ErrorMessage name="description" component="div" />
            </div>

            <div>
              <label>Priority</label>
              <Field as="select" name="priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Field>
            </div>

            <div>
              <label>Due Date</label>
              <Field name="dueDate" type="datetime-local" />
              <ErrorMessage name="dueDate" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {mode === "update" ? "Update" : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TodoForm;
