import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, Facebook } from "lucide-react";

// Custom X (formerly Twitter) icon using the official X logo path
const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />
      
      <div className="footer-grid relative z-10">
        {/* COL 1: BRANDING */}
        <div className="footer-branding">
          <Link to="/">
            <img loading="lazy" 
              src="/images/logo_final.jpeg" 
              alt="Zenithh Sports Arena" 
              className="footer-logo logo-glow" 
            />
          </Link>
          <p>
            Hyderabad's premier multi-sport training facility. Elite coaching. 
            World-class infrastructure. Built for the next generation of champions.
          </p>
        </div>
        
        {/* COL 2: ARENA LINKS */}
        <div>
          <h4 className="footer-heading">Arena Links</h4>
          <ul className="footer-links-list">
            {[
              { label: "Our Story", path: "/about" },
              { label: "Elite Coaches", path: "/coaches" },
              { label: "Infrastructure", path: "/facilities" },
              { label: "Tournaments", path: "/events" },
              { label: "Arena Gallery", path: "/gallery" },
              { label: "Membership", path: "/contact" }
            ].map((link) => (
              <li key={link.label} className="footer-link-item">
                <Link to={link.path} className="footer-link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* COL 3: DISCIPLINES */}
        <div>
          <h4 className="footer-heading">Disciplines</h4>
          <ul className="footer-links-list">
            {["Cricket", "Pickleball", "Volleyball", "Chess", "Zumba", "Table Tennis", "Carrom", "VR Cricket", "Badminton Outdoor"].map((sport) => (
              <li key={sport} className="footer-link-item">
                <Link to="/sports" className="footer-link">{sport}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COL 4: VISIT US */}
        <div className="footer-info-group">
          <h4 className="footer-heading">Visit Us</h4>
          <p className="footer-info-text">
            <a 
              href="https://maps.app.goo.gl/2KYR4nake6HgAnwL8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[var(--color-gold-primary)] transition-colors"
            >
              Miyapur Metro Station Road, Miyapur, Hyderabad, Telangana 500049
            </a>
          </p>
          <p className="footer-info-text flex flex-col gap-1">
            <a href="tel:+919281472882" className="hover:text-[var(--color-gold-primary)] transition-colors">
              +91 92814 72882
            </a>
            <a href="tel:+917997171607" className="hover:text-[var(--color-gold-primary)] transition-colors">
              +91 79971 71607
            </a>
          </p>
          <p className="footer-info-text">
            Morning: 7:00 AM – 10:00 AM <br />
            Evening: 5:00 PM – 8:00 PM
          </p>
          <p className="text-[10px] text-[var(--color-gold-primary)] opacity-60 uppercase tracking-widest font-bold mt-2">
            * Timings will be changed according to the season
          </p>
          
          <div className="footer-social-wrap gap-4">
            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ background: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)', color: '#fff' }}>
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ backgroundColor: '#000000', color: '#fff' }}>
              <XIcon size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ backgroundColor: '#FF0000', color: '#fff' }}>
              <Youtube size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ backgroundColor: '#1877F2', color: '#fff' }}>
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom relative z-10">
        <p>© 2026 Zenithh Sports Arena Hyderabad | All Rights Reserved.</p>
        <p>DESIGNED BY <span className="text-[var(--color-gold-primary)] italic">AS KREATIV</span></p>
      </div>
    </footer>
  );
}
