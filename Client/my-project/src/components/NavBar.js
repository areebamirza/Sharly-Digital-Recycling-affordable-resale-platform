// ==============================
// Navbar.js — Sharly (UNCHANGED UI + FIXED LOGIC)
// ==============================
import React, { useState, useEffect, useCallback,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [animatedPoints, setAnimatedPoints] = useState(0);

  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Animate points
  const animatePoints = (target) => {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setAnimatedPoints(current);
    }, 18);
  };

  // Load user
  const loadUser = useCallback(() => {
    const name = localStorage.getItem("name");
    const points = Number(localStorage.getItem("points")) || 0;
    const userId = localStorage.getItem("userId");

    if (name) {
      setUser({ name, points, userId });
      animatePoints(points);
    } else {
      setUser(null);
      setAnimatedPoints(0);
    }
  },[loadUser]);

  useEffect(() => {
    loadUser();

    const onScroll = () => setScrolled(window.scrollY > 10);
    const onStorage = () => loadUser();

    window.addEventListener("scroll", onScroll);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // close dropdown outside click
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
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  // ❗ YOUR ORIGINAL STYLES (NOT MODIFIED)
  const S = {
    header: {
      position: "sticky",
      top: 0,
      zIndex: 1000,
      background: "white",
      borderBottom: scrolled ? "1px solid #e8ede8" : "1px solid transparent",
      boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
      transition: "all 0.3s ease",
      padding: "10px 0",
    },

    pointsBadge: {
      background: "linear-gradient(135deg, #e8f5e9, #d1fae5)",
      padding: "6px 14px",
      borderRadius: "20px",
      fontWeight: "700",
      fontSize: "13px",
      color: "#1a7a3c",
      border: "1px solid #b7e4c7",
      letterSpacing: "0.2px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      userSelect: "none",
    },

    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #1a7a3c, #22c55e)",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "700",
      fontSize: "15px",
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(26,122,60,0.3)",
      border: "2px solid #fff",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      userSelect: "none",
    },

    dropdown: {
      position: "absolute",
      right: 0,
      top: "52px",
      width: "220px",
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
      border: "1px solid #e8ede8",
      overflow: "hidden",
      zIndex: 9999,
      animation: "fadeDropdown 0.18s ease forwards",
    },

    dropdownHeader: {
      padding: "14px 16px",
      borderBottom: "1px solid #f3f4f6",
      background: "#fafafa",
    },

    dropdownName: {
      fontWeight: "700",
      fontSize: "14px",
      color: "#111827",
      marginBottom: "2px",
    },

    dropdownRole: {
      fontSize: "12px",
      color: "#6b7280",
    },

    menuBtn: {
      padding: "10px 16px",
      border: "none",
      background: "white",
      textAlign: "left",
      cursor: "pointer",
      fontSize: "13px",
      width: "100%",
      color: "#374151",
      fontFamily: "'DM Sans', sans-serif",
      transition: "background 0.15s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },

    logoutBtn: {
      padding: "10px 16px",
      border: "none",
      background: "white",
      borderTop: "1px solid #f3f4f6",
      textAlign: "left",
      cursor: "pointer",
      fontSize: "13px",
      width: "100%",
      color: "#dc2626",
      fontWeight: "600",
      fontFamily: "'DM Sans', sans-serif",
      transition: "background 0.15s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  };

  return (
    <>
      <style>{`
        @keyframes fadeDropdown {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <header style={S.header}>
        <div className="container-xl d-flex align-items-center justify-content-between">

          {/* LOGO */}
          <Link
            to="/"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: "700",
              fontSize: "21px",
              color: "#1a7a3c",
              textDecoration: "none",
              letterSpacing: "-0.3px",
            }}
          >
            🌱 Sharly
          </Link>

          {/* NAV */}
          <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
            <NavLinks />
          </div>

          {/* RIGHT */}
          <div className="d-flex align-items-center gap-3">

            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline-success px-4 rounded-pill fw-semibold">
                  Login
                </Link>
                <Link to="/get-started" className="btn btn-success px-4 rounded-pill fw-semibold">
                  Get Started
                </Link>
              </>
            ) : (
              <>
                {/* Points */}
                <div style={S.pointsBadge}>
                  🎁 {animatedPoints} pts
                </div>

                {/* Avatar */}
                <div ref={dropdownRef} style={{ position: "relative" }}>
                  <div
                    className="nav-avatar"
                    style={S.avatar}
                    onClick={() => setOpen(!open)}
                  >
                    {getInitials(user.name)}
                  </div>

                  {open && (
                    <div style={S.dropdown}>

                      <div style={S.dropdownHeader}>
                        <div style={S.dropdownName}>{user.name}</div>
                        <div style={S.dropdownRole}>🌿 Eco Warrior</div>
                      </div>

                      <button
                        style={S.menuBtn}
                        onClick={() => {
                          navigate("/donate");
                          setOpen(false);
                        }}
                      >
                        📦 Donate Items
                      </button>

                      <button
                        style={S.logoutBtn}
                        onClick={handleLogout}
                      >
                        🚪 Logout
                      </button>

                    </div>
                  )}
                </div>
              </>
            )}

          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;