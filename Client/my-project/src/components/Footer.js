// ==============================
// Footer.js (PROFESSIONAL BLACK FOOTER)
// ==============================

import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  return (
    <footer
      style={{
        background: "rgba(0, 0, 0, 0.95)",
        color: "#ffffff",
        padding: "60px 40px 25px",
        marginTop: "60px",
      }}
    >
      <div className="container-xl">
        <div className="row gy-4">

          {/* Column 1 */}
          <div className="col-md-4">
            <h3
              style={{
                fontWeight: "700",
                marginBottom: "18px",
                fontSize: "28px",
              }}
            >
              🌱 Sharly
            </h3>

            <p
              style={{
                color: "#cfcfcf",
                lineHeight: "1.8",
                fontSize: "15px",
              }}
            >
              Sharly is a sustainable platform where people can donate,
              recycle, and give unused items a second life while helping
              society and reducing waste.
            </p>
          </div>

          {/* Column 2 */}
          <div className="col-md-4">
            <h5 style={{ marginBottom: "20px" }}>
              Quick Links
            </h5>

            <p><i className="bi bi-house-door-fill"></i> Home</p>
            <p><i className="bi bi-bag-fill"></i> Sharly Store</p>
            <p><i className="bi bi-info-circle-fill"></i> How It Works</p>
            <p><i className="bi bi-journal-text"></i> Blogs</p>
            <p><i className="bi bi-chat-dots-fill"></i> Contact Us</p>
          </div>

          {/* Column 3 */}
          <div className="col-md-4">
            <h5 style={{ marginBottom: "20px" }}>
              Contact Info
            </h5>

            <p>
              <i className="bi bi-envelope-fill"></i>{" "}
              support@sharly.com
            </p>

            <p>
              <i className="bi bi-telephone-fill"></i>{" "}
              +91 89607XXXXX
            </p>

            <p>
              <i className="bi bi-geo-alt-fill"></i>{" "}
              Uttar Pradesh, India
            </p>

            <p>
              <i className="bi bi-clock-fill"></i>{" "}
              Mon - Sat | 9 AM - 7 PM
            </p>

            {/* Social Icons */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "15px",
                fontSize: "22px",
              }}
            >
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-linkedin"></i>
              <i className="bi bi-twitter-x"></i>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <hr
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            margin: "35px 0 20px",
          }}
        />

        <div
          style={{
            textAlign: "center",
            color: "#bdbdbd",
            fontSize: "14px",
          }}
        >
          © 2026 Sharly. All Rights Reserved | Designed with ❤️ for a greener future
        </div>
      </div>
    </footer>
  );
};

export default Footer;