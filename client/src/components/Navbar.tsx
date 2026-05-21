import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "MSK Academy", path: "/msk-academy" },
  { label: "About", path: "/about" },
  { label: "Sports", path: "/sports" },
  { label: "Coaches", path: "/coaches" },
  { label: "Facilities", path: "/facilities" },
  { label: "Events", path: "/events" },
  { label: "Gallery", path: "/gallery" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // ---- Scroll detection ----
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ---- Entry animation (GSAP) ----
    if (navbarRef.current) {
      gsap.fromTo(navbarRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', delay: 0.3, clearProps: "transform" }
      );
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      id="main-navbar"
      ref={navbarRef}
      className={`${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}
    >

      {/* LEFT: Logo */}
      <Link to="/" className="navbar-logo-link">
        <img
          src="/images/logo_final.jpeg"
          alt="Zenithh Sports Arena"
          className="navbar-logo"
        />
      </Link>

      {/* MOBILE TOGGLE */}
      <button
        className="mobile-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        <span className={isMobileMenuOpen ? 'open' : ''}></span>
        <span className={isMobileMenuOpen ? 'open' : ''}></span>
        <span className={isMobileMenuOpen ? 'open' : ''}></span>
      </button>

      {/* CENTER: Navigation Links */}
      <ul className={`navbar-menu ${isMobileMenuOpen ? 'show' : ''}`}>
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            {link.path === "/msk-academy" ? (
              <Link
                to={link.path}
                className={`nav-item nav-msk-unique ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ) : (
              <Link
                to={link.path}
                className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}

        {/* Mobile-only CTA in menu */}
        <li className="mobile-only-cta">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScxSW3CxICNVxvRtKCAJnJFk1FDjap4rkQ9vcBOS_fo0JJ9Gg/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-register w-full text-center flex items-center justify-center min-w-[180px] h-[38px]"
          >
            Register Now
          </a>
        </li>
      </ul>

      {/* RIGHT: CTA Button (Desktop) */}
      <div className="navbar-cta hidden md:flex items-center gap-4">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScxSW3CxICNVxvRtKCAJnJFk1FDjap4rkQ9vcBOS_fo0JJ9Gg/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-register flex items-center justify-center min-w-[120px] h-[38px] px-8 leading-none"
        >
          Register
        </a>
      </div>

    </nav>
  );
}
