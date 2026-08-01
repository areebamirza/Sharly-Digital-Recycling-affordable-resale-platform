// ==============================
// Hero.js
// ==============================

import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => (
  <section className="hero-section">
    <div className="hero-blob-tl" />
    <div className="hero-blob-bl" />

    <div className="container-xl py-5">
      <div className="row align-items-center g-5">

        {/* LEFT CONTENT */}
        <div className="col-lg-6">

          <div className="hero-badge">
            🌿 Together for a better tomorrow
          </div>

          <h1 className="hero-headline">
            Donate and Recycle.<br />
            Rewarding you for<br />
            being <span className="accent">Eco-Friendly.</span>
          </h1>

          <p className="hero-subtext">
            Donate unused items, help people in need,<br />
            and earn reward points. Join Sharly and<br />
            make sustainability simple, smart and impactful.
          </p>

          {/* BUTTONS */}
          <div className="d-flex flex-wrap gap-3 mb-4">

            {/* Separate page open */}
            <Link to="/get-started" className="btn-hero-primary">
              Start Donating
              <span>➜</span>
            </Link>

            {/* Scroll to section */}
            <a href="#how-it-works" className="btn-hero-secondary">
              Learn More
              <span>➜</span>
            </a>

          </div>

          {/* FEATURES */}
          <div className="d-flex flex-wrap gap-4 mt-2">
            {[
              { icon: '🌿', title: 'Eco-Friendly', sub: 'Better Planet' },
              { icon: '🤝', title: 'Help People', sub: 'In Need' },
              { icon: '🎁', title: 'Earn Rewards', sub: 'For Good Deeds' },
            ].map((f) => (
              <div
                key={f.title}
                className="d-flex align-items-center gap-2"
              >
                <div className="hero-feature-icon">{f.icon}</div>

                <div>
                  <p className="hero-feature-title">{f.title}</p>
                  <p className="hero-feature-sub">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="col-lg-6 d-none d-lg-block">
          <div className="hero-image-wrap">
            <img
              src="/Sharly.png"
              alt="Donate and Recycle"
              className="hero-main-image"
            />
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default Hero;