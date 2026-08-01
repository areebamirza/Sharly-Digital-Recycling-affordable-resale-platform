import React from 'react';

const HowItWorks = () => (
  <div>

    {/* HERO SECTION */}
    <div className="how-hero">
      <div className="page-badge">⚙️ Simple Process</div>

      <h1 className="page-title">
        How It <span>Works</span>
      </h1>

      <p className="page-subtitle">
       Giving your unused items a second life has never been easier. Just gather what you don’t need, schedule a pickup, and we’ll handle the rest. After verification, you instantly earn reward points that you can use in our store or donate to help others. Every small action you take helps reduce waste and build a greener future.
      </p>
    </div>

    {/* FULL WIDTH IMAGE */}
    <div className="how-image-wrapper">
      <img
        src="/HowItWork.png"
        alt="How It Works"
        className="how-image"
      />
    </div>

  </div>
);

export default HowItWorks;