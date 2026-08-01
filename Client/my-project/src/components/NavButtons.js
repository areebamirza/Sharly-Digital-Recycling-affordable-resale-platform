import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavButtons = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const dropdownRef = useRef();

  // Load user
  const loadUser = () => {
    const name = localStorage.getItem("name");
    const points = Number(localStorage.getItem("points")) || 0;

    if (name) {
      setUser({ name, points });
      animatePoints(points);
    } else {
      setUser(null);
    }
  };

  // Animated counter
  const animatePoints = (target) => {
    let start = 0;
    const duration = 800;
    const step = Math.ceil(target / (duration / 16));

    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setAnimatedPoints(start);
    }, 16);
  };

  useEffect(() => {
    loadUser();

    const sync = () => loadUser();
    window.addEventListener("storage", sync);

    return () => window.removeEventListener("storage", sync);
  }, []);

  // Close dropdown outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setOpen(false);
    navigate("/login");
  };

  const getInitials = (name) =>
    name?.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="d-flex align-items-center gap-3 position-relative">

      {/* ================= NOT LOGGED IN ================= */}
      {!user && (
        <>
          <Link to="/login" className="btn btn-outline-success px-4 rounded-pill fw-semibold">
            Login
          </Link>

          <Link to="/get-started" className="btn btn-success px-4 rounded-pill fw-semibold">
            Get Started
          </Link>
        </>
      )}

      {/* ================= LOGGED IN ================= */}
      {user && (
        <>
          {/* Points */}
          <div style={{
            background: "#e8f5e9",
            padding: "6px 14px",
            borderRadius: "20px",
            fontWeight: "600",
            fontSize: "14px",
            color: "#198754",
            border: "1px solid #b7e4c7",
            transition: "all 0.3s ease"
          }}>
            🎁 {animatedPoints} pts
          </div>

          {/* Profile */}
          <div ref={dropdownRef} style={{ position: "relative" }}>

            <div
              onClick={() => setOpen(!open)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#198754",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}
              title={user.name}
            >
              {getInitials(user.name)}
            </div>

            {/* Dropdown */}
            {open && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50px",
                  width: "200px",
                  background: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  zIndex: 999
                }}
              >
                <div style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                  <strong>{user.name}</strong>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Eco Warrior 🌱
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>

                  <button
                    onClick={() => navigate("/dashboard")}
                    style={menuBtn}
                  >
                    📊 Dashboard
                  </button>

                  <button
                    onClick={() => navigate("/rewards")}
                    style={menuBtn}
                  >
                    🎁 Rewards
                  </button>

                  <button
                    onClick={() => navigate("/settings")}
                    style={menuBtn}
                  >
                    ⚙️ Settings
                  </button>

                  <button
                    onClick={handleLogout}
                    style={{ ...menuBtn, color: "red" }}
                  >
                    🚪 Logout
                  </button>

                </div>
              </div>
            )}

          </div>
        </>
      )}

    </div>
  );
};

const menuBtn = {
  padding: "10px 12px",
  border: "none",
  background: "white",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "14px"
};

export default NavButtons;