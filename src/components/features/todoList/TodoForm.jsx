import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./TodoForm.css";
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  priority: Yup.string().required(),
  estimatedTimeMinutes: Yup.number()
    .min(1, "Must be at least 1 minute")
    .max(10080, "Max 1 week")
    .nullable(),
});

const TodoForm = ({ initialValues, onSubmit, mode }) => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
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
              <label>Estimated Time (minutes)</label>
              <Field
                name="estimatedTimeMinutes"
                type="number"
                className="todo-input"
              />
              <ErrorMessage name="estimatedTimeMinutes" component="div" />
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
