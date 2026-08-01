import React from "react";

const items = [
  { id:1, user:'Priya S.',  avatar:'🧕', action:"donated 12 items",        time:'2 mins ago',  points:'+120 pts', bg:'#e8f5e8' },
  { id:2, user:'Arjun M.',  avatar:'👦', action:"recycled electronics",    time:'15 mins ago', points:'+200 pts', bg:'#e3f2fd' },
  { id:3, user:'Sunita K.', avatar:'👩', action:"redeemed Bamboo Bottle",  time:'1 hr ago',    points:'-200 pts', bg:'#fff3e0', neg:true },
  { id:4, user:'Rahul T.',  avatar:'🧑', action:"donated children's toys", time:'2 hrs ago',   points:'+80 pts',  bg:'#fce4ec' },
  { id:5, user:'Meena R.',  avatar:'👩‍🦱',action:"donated 5 books",         time:'3 hrs ago',   points:'+50 pts',  bg:'#f3e5f5' },
  { id: 6, user: "Aman Verma", avatar: "👨", action: "donated old clothes", time: "4 hrs ago", points: "+70 pts", bg: "#e8f5e8" },
  { id: 7, user: "Neha Gupta", avatar: "👩‍🎓", action: "recycled plastic waste", time: "5 hrs ago", points: "+140 pts", bg: "#e3f2fd" },
  { id: 8, user: "Vikram Singh", avatar: "🧔", action: "donated shoes & bags", time: "6 hrs ago", points: "+90 pts", bg: "#fff3e0" },
  { id: 9, user: "Ananya Sharma", avatar: "👧", action: "redeemed eco tote bag", time: "7 hrs ago", points: "-150 pts", bg: "#fce4ec", neg: true },
  { id: 10, user: "Rohit Yadav", avatar: "🧑‍💼", action: "donated 20 notebooks", time: "8 hrs ago", points: "+110 pts", bg: "#f3e5f5" },
  { id: 11, user: "Kavya Nair", avatar: "👩‍🦰", action: "recycled glass bottles", time: "9 hrs ago", points: "+160 pts", bg: "#e8f5e8" },
  { id: 12, user: "Aditya Raj", avatar: "👨‍🎓", action: "donated electronics", time: "10 hrs ago", points: "+210 pts", bg: "#e3f2fd" },
];

const Feed = () => (
  <div style={{ paddingTop: 72, background: "#f5faf5", minHeight: "100vh" }}>

    {/* ── PREMIUM HERO (UPDATED LIKE STORE PAGE) ── */}
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
        📡 Live Eco Impact
      </div>

      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        fontWeight: "900",
        marginBottom: "14px",
        letterSpacing: "-0.02em",
        lineHeight: 1.25,
      }}>
        See how the <span style={{ color: "#4ade80", fontStyle: "italic" }}>
          Sharly community
        </span><br />
        is transforming the planet 🌍
      </h1>

      <p style={{
        color: "#aaa",
        fontSize: "15px",
        maxWidth: "520px",
        margin: "0 auto 20px"
      }}>
        Real-time donations, recycling, and eco-actions happening across the world.
      </p>

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
        🌱 Live Community Activity Feed
      </div>
    </div>

    {/* ── FEED LIST (UNCHANGED) ── */}
    <div className="container-xl py-5">
      <div className="mx-auto" style={{ maxWidth: 660 }}>
        <div className="d-flex flex-column gap-3">

          {items.map(item => (
            <div
              key={item.id}
              className="feed-item d-flex align-items-center gap-3"
              style={{ background: item.bg }}
            >
              <div className="feed-avatar">{item.avatar}</div>

              <div className="flex-grow-1">
                <p className="feed-text">
                  <strong>{item.user}</strong> {item.action}
                </p>
                <span className="feed-time">{item.time}</span>
              </div>

              <span className={`feed-points ${item.neg ? 'neg' : ''}`}>
                {item.points}
              </span>
            </div>
          ))}

        </div>
      </div>
    </div>
  </div>
);

export default Feed;