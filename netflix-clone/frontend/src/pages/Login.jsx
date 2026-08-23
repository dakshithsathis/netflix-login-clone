import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api.js";
import "../styles/login.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  }

  function validate() {
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Please enter a valid email.";
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Your password must contain between 4 and 60 characters.";
    } else if (form.password.length < 4) {
      nextErrors.password = "Your password must contain between 4 and 60 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setIsSubmitting(true);
    const result = await loginRequest(form.email.trim(), form.password);
    setIsSubmitting(false);

    if (result.success) {
      sessionStorage.setItem("authToken", result.token);
      sessionStorage.setItem("authUser", JSON.stringify(result.user));
      navigate("/dashboard");
    } else {
      setServerError(result.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <span className="brand-logo">CineFlix</span>
      </header>

      <main className="login-content">
        <div className="login-box">
          <h1>Sign In</h1>

          {serverError && (
            <div className="server-error-banner" role="alert">
              {serverError}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className={`form-group ${errors.email ? "has-error" : ""}`}>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className={form.email ? "has-value" : ""}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              <label htmlFor="email">Email or phone number</label>
              {errors.email && (
                <span className="field-error" id="email-error">
                  {errors.email}
                </span>
              )}
            </div>

            <div className={`form-group ${errors.password ? "has-error" : ""}`}>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                className={form.password ? "has-value" : ""}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <label htmlFor="password">Password</label>
              {errors.password && (
                <span className="field-error" id="password-error">
                  {errors.password}
                </span>
              )}
            </div>

            <button type="submit" className="sign-in-button" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

            <div className="login-helper-row">
              <label className="remember-me">
                <input type="checkbox" name="rememberMe" />
                Remember me
              </label>
              <a href="#help">Need help?</a>
            </div>
          </form>

          <p className="signup-prompt">
            New to StreamFlix? <a href="#signup">Sign up now</a>.
          </p>

        
        </div>
      </main>
    </div>
  );
}