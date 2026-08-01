import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/NavBar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import GetStarted from './pages/GetStarted';
import SharlyStore from './pages/SharlyStore';
import HowItWorks from './pages/HowItWorks';
import Blogs from './pages/Blogs';
import Feed from './pages/Feed';
import GetInTouch from './pages/GetInTouch';
import Donate from './pages/Donate';
import Chatbot from './components/Chatbot';

function MainPage() {
  return (
    <>
      <section id="home">
        <Home />
      </section>

      <section id="sharly-store">
        <SharlyStore />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="blogs">
        <Blogs />
      </section>

      <section id="feed">
        <Feed />
      </section>

      <section id="get-in-touch">
        <GetInTouch />
      </section>


      {/* <section id="donate">
        <Donate />
      </section> */}
    </>
  );
}

function App() {
  return (
    <Router>

      {/* ✅ Navbar always visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>

      {/* ✅ Footer added here */}
      <Footer />
       <Chatbot />
    </Router>
  );
}

export default App;