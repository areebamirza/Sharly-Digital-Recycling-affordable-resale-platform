import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavLinks = () => {
  const location = useLocation();
  const navigate = useNavigate();

  

  const scrollTo = (id) => {
    // ✅ Donate page ke liye proper smooth route change
    if (id === "donate") {
      if (location.pathname !== "/donate") {
        navigate("/donate");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      return;
    }

    // ✅ Home click → proper top smooth scroll
    if (id === "home") {
      if (location.pathname !== "/") {
        navigate("/");

        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 300);
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      return;
    }

    // ✅ Other sections
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const section = document.getElementById(id);

        if (section) {
          const navbarHeight = 80;

          const sectionTop =
            section.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;

          window.scrollTo({
            top: sectionTop,
            behavior: "smooth",
          });
        }
      }, 300);

      
      return;
    }

    const section = document.getElementById(id);

    if (section) {
      const navbarHeight = 80;

      const sectionTop =
        section.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <span
        onClick={() => scrollTo("home")}
        className="nav-link-item mx-2"
        style={{ cursor: "pointer" }}
      >
        Home
      </span>

      <span
        onClick={() => scrollTo("sharly-store")}
        className="nav-link-item mx-2"
        style={{ cursor: "pointer" }}
      >
        Sharly Store
      </span>

      <span
        onClick={() => scrollTo("how-it-works")}
        className="nav-link-item mx-2"
        style={{ cursor: "pointer" }}
      >
        How It Works
      </span>

      <span
        onClick={() => scrollTo("blogs")}
        className="nav-link-item mx-2"
        style={{ cursor: "pointer" }}
      >
        Blogs
      </span>

      <span
        onClick={() => scrollTo("feed")}
        className="nav-link-item mx-2"
        style={{ cursor: "pointer" }}
      >
        Feed
      </span>

      <span
        onClick={() => scrollTo("get-in-touch")}
        className="nav-link-item mx-2"
        style={{ cursor: "pointer" }}
      >
        Get In Touch
      </span>

      <span
        onClick={() => scrollTo("donate")}
        className="nav-link-item mx-2"
        style={{ cursor: "pointer" }}
      >
        Donate
      </span>
    </>
  );
};

export default NavLinks;