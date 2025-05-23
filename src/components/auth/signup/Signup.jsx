import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthHero from "../../reusable/authHero/AuthHero";
import useAuthStore from "../../../store/authStore"; // Zustand store
import "./Signup.css";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  rememberMe: Yup.boolean(),
});

const Signup = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore(); // Zustand authentication store

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  };

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await register(values);
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error || "Signup failed");
      setErrors({ general: "Signup failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <AuthHero />
      <div className="signup-form-container">
        <div className="signup-form-wrapper">
          <h2 className="signup-title">Create account 🚀</h2>
          <p className="signup-subtitle">Start your journey with us.</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form className="signup-form">
                {errors.general && (
                  <div className="error general-error">{errors.general}</div>
                )}

                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Field id="firstName" name="firstName" type="text" />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Field id="lastName" name="lastName" type="text" />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field id="email" name="email" type="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field id="password" name="password" type="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <button
                  className="login-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Create Account"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="separator">
            <div className="separator-line"></div>
          </div>
          <div className="link-box">
            <p className="separator-text">
              Already have an account?{" "}
              <span className="forgot-password-link" onClick={handleLogin}>
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
