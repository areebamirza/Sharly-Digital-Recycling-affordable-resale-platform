import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const GetInTouch = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return alert("Name is required ❌");
    if (form.name.trim().length <= 2) return alert("Name must be more than 2 characters ❌");
    if (!form.email.trim()) return alert("Email is required ❌");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) return alert("Enter valid email ❌");

    if (!form.subject.trim()) return alert("Subject is required ❌");
    if (!form.message.trim()) return alert("Message is required ❌");

    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ paddingTop: 72, background: "#f5faf5", minHeight: "100vh" }}>

      {/* ================= PREMIUM HERO (SMOOTH BLEND VERSION) ================= */}
      <div
        style={{
          position: "relative",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "90px 24px 130px",
          textAlign: "center",
          color: "#fff",
        }}
      >

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 50%, rgba(245,250,245,1) 100%)",
            zIndex: 1,
          }}
        />

        {/* CONTENT */}
        <div style={{ position: "relative", zIndex: 2 }}>

          <div
            style={{
              display: "inline-block",
              background: "rgba(45,122,45,0.25)",
              border: "1px solid rgba(45,122,45,0.4)",
              borderRadius: "50px",
              padding: "6px 18px",
              fontSize: "13px",
              fontWeight: "700",
              color: "#4ade80",
              marginBottom: "18px",
            }}
          >
            💬 Contact Sharly Team
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: "900",
              marginBottom: "30px",   // ✅ ADDED SPACE BELOW HEADING
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
            }}
          >
            Let’s build something <br />
            meaningful{" "}
            <span style={{ color: "#4ade80", fontStyle: "italic" }}>
              together.
            </span>
          </h1>

          <p
            style={{
              color: "#e6e6e6",
              fontSize: "15px",
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            Have questions, feedback, or partnership ideas?
            We’d love to hear from you and respond quickly.
          </p>
        </div>

        {/* SOFT BLEND INTO PAGE */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "90px",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, #f5faf5 100%)",
            zIndex: 2,
          }}
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container-xl py-5">

        {submitted ? (
          <div className="text-center py-5">
            <div style={{ fontSize: "4rem" }}>🎉</div>

            <h2 style={{
              color: "#2d7a2d",
              marginTop: "15px",
              fontFamily: "Playfair Display, serif",
              fontWeight: "800"
            }}>
              Message Sent Successfully!
            </h2>

            <p className="text-muted mb-4">
              We’ll get back to you within 24 hours.
            </p>

            <button
              className="btn btn-success px-4 py-2"
              style={{ borderRadius: "50px", fontWeight: 600 }}
              onClick={() => setSubmitted(false)}
            >
              Send Another
            </button>
          </div>

        ) : (
          <div className="row g-4">

            {/* LEFT CARD (UNCHANGED) */}
            <div className="col-md-4">
              <div style={{
                background: "#e8f5e8",
                padding: "30px",
                borderRadius: "20px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
              }}>
                <h4 style={{
                  marginBottom: "25px",
                  color: "#2d7a2d",
                  fontWeight: 700
                }}>
                  Contact Information
                </h4>

                <p><i className="bi bi-envelope-fill"></i> support@sharly.com</p>
                <p><i className="bi bi-telephone-fill"></i> +91 89607XXXXX</p>
                <p><i className="bi bi-geo-alt-fill"></i> Uttar Pradesh, India</p>
                <p><i className="bi bi-clock-fill"></i> Mon - Sat | 9 AM - 7 PM</p>
              </div>
            </div>

            {/* FORM (ONLY CHANGED COLORS) */}
            <div className="col-md-8">
              <div style={{
                background: "linear-gradient(145deg, #0f1a14, #0a0f0c)", // ✅ greenish black
                padding: "35px",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                border: "1px solid rgba(34,197,94,0.2)"
              }}>
                <form onSubmit={handleSubmit}>

                <input
  className="form-control custom-input mb-3"
  name="name"
  placeholder="Your Name"
  value={form.name}
  onChange={handleChange}
/>

<input
  className="form-control custom-input mb-3"
  type="email"
  name="email"
  placeholder="Email Address"
  value={form.email}
  onChange={handleChange}
/>

<input
  className="form-control custom-input mb-3"
  name="subject"
  placeholder="Subject"
  value={form.subject}
  onChange={handleChange}
/>

<textarea
  className="form-control custom-input mb-4"
  name="message"
  rows="5"
  placeholder="Write your message here..."
  value={form.message}
  onChange={handleChange}
/>

                  <button
                    type="submit"
                    className="btn btn-success px-4 py-2"
                    style={{ borderRadius: "50px", fontWeight: 600 }}
                  >
                    Send Message →
                  </button>

                </form>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default GetInTouch;