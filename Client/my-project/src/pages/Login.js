// ==============================
// Login.js — Sharly (Professional with Welcome Toast)
// ==============================

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:wght@600&display=swap');

  .auth-page {
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: #f0f4f0;
    font-family: 'DM Sans', sans-serif;
    padding: 5rem 1rem 2rem;
  }

  .auth-card {
    background: #ffffff;
    border-radius: 24px;
    padding: 2.5rem;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -1px rgba(0,0,0,0.04);
    border: 1px solid #e8ede8;
  }

  .auth-brand {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .auth-brand i {
    font-size: 2.8rem;
    color: #1a7a3c;
  }

  .auth-brand-name {
    font-family: 'Fraunces', serif;
    font-size: 26px;
    font-weight: 600;
    color: #1a7a3c;
    display: block;
    margin-top: 6px;
    letter-spacing: -0.3px;
  }

  .auth-brand-tagline {
    font-size: 13px;
    color: #6b7280;
    margin-top: 4px;
  }

  .auth-heading {
    font-family: 'Fraunces', serif;
    font-size: 20px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 1.5rem;
    text-align: center;
  }

  .form-group { margin-bottom: 1.25rem; }

  .form-label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  .form-input {
    width: 100%;
    padding: 11px 14px;
    border: 1.5px solid #e5e7eb;
    border-radius: 12px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    color: #111827;
    background: #fafafa;
    transition: all 0.2s ease;
    outline: none;
    box-sizing: border-box;
  }

  .form-input:focus {
    border-color: #1a7a3c;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(26,122,60,0.08);
  }

  .form-input::placeholder { color: #9ca3af; }

  .btn-primary-login {
    width: 100%;
    padding: 13px;
    background: #1a7a3c;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 0.5rem;
  }

  .btn-primary-login:hover:not(:disabled) {
    background: #166533;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(26,122,60,0.25);
  }

  .btn-primary-login:disabled { opacity: 0.6; cursor: not-allowed; }

  .btn-loading {
    display: flex; align-items: center;
    justify-content: center; gap: 8px;
  }

  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .auth-footer {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 14px;
    color: #6b7280;
  }

  .auth-footer a { color: #1a7a3c; font-weight: 600; text-decoration: none; }
  .auth-footer a:hover { text-decoration: underline; }

  .error-msg {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    border-radius: 10px;
    padding: 10px 12px;
    font-size: 13px;
    margin-bottom: 1rem;
  }

  .input-wrapper { position: relative; }

  .toggle-password {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none;
    cursor: pointer; color: #9ca3af;
    padding: 0; font-size: 1rem;
    display: flex; align-items: center;
  }

  .toggle-password:hover { color: #374151; }

  /* ===== WELCOME TOAST ===== */
  .welcome-toast {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 9999;
    background: #ffffff;
    border: 1.5px solid #b7e4c7;
    border-radius: 16px;
    padding: 16px 20px;
    min-width: 300px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
    display: flex;
    align-items: flex-start;
    gap: 12px;
    animation: slideInToast 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  @keyframes slideInToast {
    from { opacity: 0; transform: translateX(60px) scale(0.9); }
    to   { opacity: 1; transform: translateX(0)   scale(1);   }
  }

  .toast-icon {
    width: 42px; height: 42px;
    background: linear-gradient(135deg, #1a7a3c, #22c55e);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .toast-title {
    font-family: 'Fraunces', serif;
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 3px;
  }

  .toast-sub {
    font-size: 13px;
    color: #6b7280;
    margin: 0;
    line-height: 1.4;
  }

  .toast-points-badge {
    display: inline-block;
    background: #e8f5e9;
    color: #1a7a3c;
    font-weight: 700;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 20px;
    margin-top: 5px;
    border: 1px solid #b7e4c7;
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast]           = useState(null); // { name, points }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) { setError("Email is required"); return; }
    if (!password)     { setError("Password is required"); return; }

    try {
      setLoading(true);

      const res  = await axios.post("https://sharly-digital-recycling-affordable.onrender.com/api/login", {
        email: email.trim(),
        password,
      });
      const data = res.data;

      if (data?.token) {
        // ✅ Store everything in localStorage
        localStorage.setItem("token",  data.token);
        localStorage.setItem("name",   data.name);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("points", data.points ?? 0);

        // ✅ Trigger storage event so Navbar updates immediately
        window.dispatchEvent(new Event("storage"));

        // ✅ Show welcome toast
        setToast({ name: data.name, points: data.points ?? 0 });

        // ✅ Navigate after 2.2s (toast duration)
        setTimeout(() => {
          navigate("/");
        }, 2200);

      } else {
        setError(data?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      {/* ===== WELCOME TOAST ===== */}
      {toast && (
        <div className="welcome-toast">
          <div className="toast-icon">🎉</div>
          <div>
            <p className="toast-title">Welcome back, {toast.name.split(" ")[0]}! 👋</p>
            <p className="toast-sub">You're logged in to Sharly.</p>
            <span className="toast-points-badge">🎁 {toast.points} pts in your wallet</span>
          </div>
        </div>
      )}

      <div className="auth-page">
        <div className="auth-card">

          <div className="auth-brand">
            <i className="bi bi-globe2"></i>
            <span className="auth-brand-name">Welcome Back</span>
            <p className="auth-brand-tagline">Login to continue your eco journey 🌱</p>
          </div>

          <h3 className="auth-heading">Login to Sharly</h3>

          {error && (
            <div className="error-msg">
              <i className="bi bi-exclamation-circle-fill"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} autoComplete="off">

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                autoComplete="off"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  style={{ paddingRight: "42px" }}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary-login" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Logging in...
                </span>
              ) : "Login"}
            </button>

          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/get-started">Get Started</Link>
          </p>

        </div>
      </div>
    </>
  );
};

export default Login;