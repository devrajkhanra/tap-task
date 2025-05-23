import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthHero from "../../reusable/authHero/AuthHero";
import useAuthStore from "../../../store/authStore"; // Zustand Store
import "./Login.css";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore(); // Zustand authentication store

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  // Handle form submission
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await login(values);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed"); // Correctly display failure toast
      setErrors({ general: error.message || "Login failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <AuthHero />
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <h2 className="login-title">Hey, hello 👋</h2>
          <p className="login-subtitle">Enter your details to log in.</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form className="login-form">
                {errors.general && (
                  <div className="error general-error">{errors.general}</div>
                )}

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
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="separator">
            <div className="separator-line"></div>
          </div>
          <div className="link-box">
            <p className="forgot-password-link">Forgot Password</p>
            <p className="separator-text">
              New User?{" "}
              <span className="forgot-password-link" onClick={handleSignup}>
                Signup
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
