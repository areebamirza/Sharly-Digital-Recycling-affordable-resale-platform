import React, { useState, useEffect } from "react";
import axios from "axios";

const INITIAL_SHOW = 6;

const SharlyStore = () => {
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("All");
  const [purchased, setPurchased] = useState(null);
  const [showCount, setShowCount] = useState(INITIAL_SHOW);
  const [products, setProducts] = useState([]);

  const API = "http://localhost:5000/api";

  const handleFilter = (cat) => {
    setFilter(cat);
    setShowCount(INITIAL_SHOW);
  };

  // ── USER SYNC ──
  useEffect(() => {
    const sync = () => {
      const name = localStorage.getItem("name");
      const points = Number(localStorage.getItem("points")) || 0;
      const userId = localStorage.getItem("userId");

      setUser(name ? { name, points, userId } : null);
    };

    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // ── FETCH PRODUCTS (AXIOS) ──
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/products`);
        setProducts(res.data);
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filtered =
    filter === "All"
      ? products
      : products.filter((p) => p.category === filter);

  const visible = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  // ── BUY PRODUCT ──
  const handleBuy = async (product) => {
    if (!user) {
      alert("Please login to purchase products ❌");
      return;
    }

    if (user.points < product.points) {
      alert(`Not enough points! ❌`);
      return;
    }

    try {
      const res = await axios.post(`${API}/buy-product`, {
        userId: user.userId,
        productId: product._id,
        points: product.points,
      });

      const data = res.data;

      localStorage.setItem("points", data.remainingPoints);
      window.dispatchEvent(new Event("storage"));

      setUser((u) => ({ ...u, points: data.remainingPoints }));
      setPurchased(product._id);

      setTimeout(() => setPurchased(null), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ paddingTop: 72, background: "#f5faf5", minHeight: "100vh" }}>

      {/* ── DARK HERO (UNCHANGED) ── */}
      <div style={{
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
        padding: "70px 24px 50px",
        textAlign: "center",
        color: "#fff",
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(45,122,45,0.3)",
          border: "1px solid rgba(45,122,45,0.5)",
          borderRadius: "50px",
          padding: "6px 18px",
          fontSize: "13px",
          fontWeight: "700",
          color: "#4ade80",
          marginBottom: "18px",
        }}>
          🛍️ Eco Marketplace
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: "900",
          marginBottom: "14px",
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
        }}>
          Redeem your eco-points by choosing from our<br />
          selection of <span style={{ color: "#4ade80", fontStyle: "italic" }}>
            eco-friendly products.
          </span>
        </h1>

        <p style={{ color: "#aaa", fontSize: "15px", maxWidth: "480px", margin: "0 auto 20px" }}>
          Use your reward points to get real eco-friendly products delivered to you.
        </p>

        {user ? (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(74,222,128,0.15)",
            border: "1px solid rgba(74,222,128,0.4)",
            borderRadius: "50px",
            padding: "8px 22px",
            color: "#4ade80",
            fontWeight: "700",
            fontSize: "15px",
          }}>
            🎁 Your Balance: {user.points} pts
          </div>
        ) : (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50px",
            padding: "8px 22px",
            color: "#ccc",
            fontSize: "14px",
          }}>
            🔒 Login to unlock purchases
          </div>
        )}
      </div>

      {/* ── CATEGORY FILTER (UNCHANGED) ── */}
      <div style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: "30px 20px 10px",
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            style={{
              padding: "8px 20px",
              borderRadius: "50px",
              border: filter === cat ? "2px solid #2d7a2d" : "2px solid #ddd",
              background: filter === cat ? "#2d7a2d" : "#fff",
              color: filter === cat ? "#fff" : "#333",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── PRODUCTS (YOUR OLD DESIGN EXACT) ── */}
      <div className="container-xl py-4">
        <div className="row g-4">
{visible.map((product) => (
  <div key={product._id} className="col-sm-6 col-md-4">

    <div
      className="sharly-card"
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
        border: "1px solid #eee",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* IMAGE */}
      <div style={{ position: "relative", overflow: "hidden", height: "220px", flexShrink: 0 }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
        />

        <div style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          background: "#2d7a2d",
          color: "#fff",
          borderRadius: "50px",
          padding: "4px 12px",
          fontSize: "11px",
          fontWeight: "700",
        }}>
          {product.tag}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>

        <div style={{
          fontSize: "11px",
          fontWeight: "700",
          color: "#2d7a2d",
          marginBottom: "4px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}>
          {product.brand} · {product.category}
        </div>

        <h6 style={{
          fontWeight: "700",
          fontSize: "15px",
          color: "#1a1a1a",
          marginBottom: "12px",
          lineHeight: "1.4",
          flex: 1,
        }}>
          {product.name}
        </h6>

        <div style={{ fontSize: "13px", color: "#555", marginBottom: "14px" }}>
          Use <strong style={{ color: "#2d7a2d" }}>{product.points} eco-points</strong>
        </div>

        {purchased === product._id ? (
          <div style={{
            background: "#dcfce7",
            color: "#16a34a",
            borderRadius: "10px",
            padding: "12px",
            textAlign: "center",
            fontWeight: "700",
            fontSize: "14px",
          }}>
            ✅ Purchased Successfully!
          </div>
        ) : (
          <button
            onClick={() => handleBuy(product)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: "#2d7a2d",
              color: "#fff",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            🛍️ Redeem
          </button>
        )}

      </div>
    </div>
  </div>
))}
        </div>

        {/* SHOW MORE */}
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <button
              onClick={() => setShowCount((c) => c + 3)}
              style={{
                padding: "14px 40px",
                borderRadius: "50px",
                border: "2px solid #2d7a2d",
                background: "transparent",
                color: "#2d7a2d",
                fontWeight: "700",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Show More Products
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default SharlyStore;