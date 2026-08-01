import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:wght@600&display=swap');

  .auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #e8f5e9, #f5faf5);
    font-family: 'DM Sans', sans-serif;
    padding: 2rem;
  }

  .auth-card {
    width: 100%;
    max-width: 560px;
    padding: 3rem;
    border-radius: 28px;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(26,122,60,0.15);
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
    position: relative;
    overflow: hidden;
  }

  .auth-card::before {
    content: "";
    position: absolute;
    top: -50px;
    right: -50px;
    width: 120px;
    height: 120px;
    background: #1a7a3c;
    opacity: 0.08;
    border-radius: 50%;
  }

  .auth-brand {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .auth-brand i {
    font-size: 3rem;
    color: #1a7a3c;
  }

  .auth-brand-name {
    font-family: 'Fraunces', serif;
    font-size: 30px;
    font-weight: 600;
    color: #1a7a3c;
    display: block;
    margin-top: 6px;
  }

  .auth-heading {
    text-align: center;
    font-size: 20px;
    margin-bottom: 1.5rem;
    font-weight: 600;
    color: #111827;
  }

  .form-group { margin-bottom: 1.2rem; }

  .form-input {
    width: 100%;
    padding: 13px 14px;
    border: 1.5px solid #e5e7eb;
    border-radius: 14px;
    font-size: 15px;
    background: #fff;
    outline: none;
    transition: 0.2s;
  }

  .form-input:focus {
    border-color: #1a7a3c;
    box-shadow: 0 0 0 3px rgba(26,122,60,0.12);
  }

  .input-wrapper {
    position: relative;
  }

  .toggle-password {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
    color: #6b7280;
  }

  .btn-primary {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #1a7a3c, #22c55e);
    color: white;
    border: none;
    border-radius: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
  }

  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(26,122,60,0.25);
  }

  .error-box {
    background: #fee2e2;
    color: #dc2626;
    padding: 10px 12px;
    border-radius: 10px;
    font-size: 13px;
    margin-bottom: 12px;
  }

  .footer-text {
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
  }

  .badge-points {
    display: inline-block;
    background: #e8f5e9;
    color: #1a7a3c;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
    margin-top: 10px;
    font-size: 12px;
  }
`;

const GetStarted = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const isStrongPassword = (pass) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pass);
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name.trim()) return setError("Username is required");
  if (!form.email.trim()) return setError("Email is required");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.email))
    return setError("Enter a valid email");

  if (!form.password.trim()) return setError("Password is required");

  if (!isStrongPassword(form.password)) {
    return setError(
      "Password must be 8+ chars with uppercase, lowercase, number & special char"
    );
  }

  try {
    const res = await fetch("http://localhost:5000/api/get-started", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return setError(data.message || "Signup failed");
    }

    // ✅ FIX 1: Store EVERYTHING properly
    localStorage.setItem("name", data.name);
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId || "");
    localStorage.setItem("points", data.points || 10);
    localStorage.setItem("loggedIn", "true");

    // ✅ FIX 2: Force navbar/profile update
    window.dispatchEvent(new Event("storage"));

    // ✅ FIX 3: redirect to HOME (not login)
    navigate("/");

  } catch (err) {
    console.log(err);
    setError("Server error. Try again later.");
  }
};

  return (
    <>
      <style>{styles}</style>

      <div className="auth-page">
        <div className="auth-card">

          <div className="auth-brand">
            <i className="bi bi-rocket-takeoff-fill"></i>
            <span className="auth-brand-name">Get Started</span>
            <div className="badge-points">🎁 Earn 10 Bonus Points</div>
          </div>

          <h3 className="auth-heading">Create Your Account</h3>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit} autoComplete="off">

            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Username"
                className="form-input"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="form-input"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-input"
                value={form.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>

            <button type="submit" className="btn-primary">
              Create Account
            </button>

          </form>

          <p className="footer-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </>
  );
};

export default GetStarted;