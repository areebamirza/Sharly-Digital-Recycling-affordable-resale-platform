import React, { useState, useEffect } from "react";
import axios from "axios";

const INITIAL_SHOW = 6;

const Blogs = () => {
  const [expanded, setExpanded] = useState(null);
  const [showCount, setShowCount] = useState(INITIAL_SHOW);
  const [blogPosts, setBlogPosts] = useState([]);

  const API = "https://sharly-digital-recycling-affordable.onrender.com/api";

  /* FETCH BLOGS */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API}/blogs`);
        setBlogPosts(res.data);
      } catch (err) {
        console.log("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const visiblePosts = blogPosts.slice(0, showCount);
  const hasMore = showCount < blogPosts.length;

  return (
    <div style={{ paddingTop: 72, background: "#fff", minHeight: "100vh" }}>

      {/* HERO (UNCHANGED) */}
      <div style={{
        background: "#fff",
        padding: "60px 24px 40px",
        borderBottom: "1px solid #f0f0f0",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-block",
          background: "#e8f5e8",
          border: "1px solid #b8dcb8",
          borderRadius: "50px",
          padding: "6px 18px",
          fontSize: "13px",
          fontWeight: "700",
          color: "#2d7a2d",
          marginBottom: "16px",
        }}>
          📖 Insights & Stories
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: "900",
          color: "#0f0f0f",
          marginBottom: "10px",
        }}>
          Our <span style={{ color: "#2d7a2d", fontStyle: "italic" }}>Blog</span>
        </h1>

        <p style={{
          color: "#666",
          fontSize: "16px",
          maxWidth: "520px",
          margin: "0 auto",
        }}>
          Tips, stories, and guides for living sustainably and making an impact.
        </p>
      </div>

      {/* BLOG GRID */}
      <div className="container-xl py-5">
        <div className="row g-4">

         {visiblePosts.map((post) => (
  <div key={post._id} className="col-md-4">

    <div
      className="sharly-card"
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #eee",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* IMAGE */}
      <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
        <img
          src={post.image}
          alt={post.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <div style={{
          position: "absolute",
          bottom: "12px",
          left: "12px",
          background: "#2d7a2d",
          color: "#fff",
          borderRadius: "50px",
          padding: "4px 12px",
          fontSize: "11px",
          fontWeight: "700",
        }}>
          {post.tag}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>

        <h6 style={{ fontWeight: "700", fontSize: "15px", marginBottom: "10px" }}>
          {post.title}
        </h6>

        <p style={{ fontSize: "13px", color: "#777", marginBottom: "10px" }}>
          {post.excerpt}
        </p>

        {expanded === post._id && (
          <div style={{
            fontSize: "13px",
            color: "#444",
            background: "#f9fdf9",
            padding: "14px",
            borderRadius: "10px",
            marginBottom: "12px",
          }}>
            {post.fullContent}
          </div>
        )}

        <div style={{ fontSize: "12px", color: "#aaa", marginBottom: "14px" }}>
          {new Date(post.createdAt).toDateString()}
        </div>

        <button
          onClick={() =>
            setExpanded(expanded === post._id ? null : post._id)
          }
          style={{
            padding: "9px 20px",
            borderRadius: "50px",
            border: "1px solid #1a1a1a",
            background: expanded === post._id ? "#1a1a1a" : "transparent",
            color: expanded === post._id ? "#fff" : "#1a1a1a",
            fontWeight: "700",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          {expanded === post._id ? "Show less" : "Read now →"}
        </button>

      </div>
    </div>

  </div>
))}

        </div>

        {/* SHOW MORE */}
        {hasMore && (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              onClick={() => setShowCount((c) => c + 3)}
              style={{
                padding: "14px 40px",
                borderRadius: "50px",
                border: "2px solid #2d7a2d",
                background: "transparent",
                color: "#2d7a2d",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Show More Articles
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Blogs;