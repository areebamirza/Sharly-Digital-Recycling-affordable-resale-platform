// ============================================================
// FILE: Client/my-project/src/components/Chatbot.js
// Yeh file banao aur yeh code paste karo
// ============================================================

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! 🌿 Main Sharly ka eco-assistant hoon. Donation, reward points, ya eco tips ke baare mein kuch poochho!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // Build history for API (exclude first greeting)
    const history = updatedMessages.slice(1).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", {
        message: text,
        history: history.slice(0, -1), // send history without current message
      });
      setMessages([...updatedMessages, { role: "assistant", content: res.data.reply }]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Oops! Kuch error aa gaya. Thodi der baad try karo. 😕" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "Donate kaise karu?",
    "Kitne points milenge?",
    "Points kaise use karu?",
  ];

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: "#2d7a2d",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "26px",
          boxShadow: "0 4px 16px rgba(45,122,45,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        title="Chat with Sharly AI"
      >
        {open ? "✕" : "🌿"}
      </button>

      {/* ── Chat Window ── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "28px",
            width: "340px",
            maxHeight: "480px",
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9998,
            overflow: "hidden",
            fontFamily: "sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a7a3c, #2d7a2d)",
              color: "#fff",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              🌿
            </div>
            <div>
              <div style={{ fontWeight: "600", fontSize: "14px" }}>Sharly Assistant</div>
              <div style={{ fontSize: "11px", opacity: 0.8 }}>
                {loading ? "Typing..." : "Online • Eco-friendly AI"}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              background: "#f9fafb",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "9px 13px",
                    borderRadius:
                      msg.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    background: msg.role === "user" ? "#2d7a2d" : "#fff",
                    color: msg.role === "user" ? "#fff" : "#1a1a1a",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    border: msg.role === "assistant" ? "0.5px solid #e5e7eb" : "none",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    background: "#fff",
                    border: "0.5px solid #e5e7eb",
                    borderRadius: "16px 16px 16px 4px",
                    padding: "10px 14px",
                    fontSize: "18px",
                    letterSpacing: "2px",
                  }}
                >
                  <span style={{ animation: "blink 1s infinite" }}>•••</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div
              style={{
                padding: "8px 12px",
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                background: "#f9fafb",
                borderTop: "0.5px solid #e5e7eb",
              }}
            >
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                    setTimeout(sendMessage, 100);
                  }}
                  style={{
                    background: "#e8f5e0",
                    border: "0.5px solid #b8dba8",
                    color: "#1a7a3c",
                    borderRadius: "12px",
                    padding: "4px 10px",
                    fontSize: "11px",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div
            style={{
              padding: "10px 12px",
              background: "#fff",
              borderTop: "0.5px solid #e5e7eb",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Kuch poochho..."
              style={{
                flex: 1,
                border: "0.5px solid #d1d5db",
                borderRadius: "20px",
                padding: "8px 14px",
                fontSize: "13px",
                outline: "none",
                fontFamily: "sans-serif",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: input.trim() && !loading ? "#2d7a2d" : "#d1d5db",
                border: "none",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                color: "#fff",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0.3 }
          50% { opacity: 1 }
        }
      `}</style>
    </>
  );
};

export default Chatbot;