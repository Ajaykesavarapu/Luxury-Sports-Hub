import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const FACILITIES = [
  {
    title: "Indoor Cricket Nets",
    img: "/images/placeholder.png",
    desc: "Professional net practice bays with pitch simulation, bowling machine infrastructure, and batting crease markings. Year-round weather-independent training.",
    features: ["Multiple net bays", "Pitch simulation surface", "High-quality netting", "LED sports lighting"]
  },
  {
    title: "Pickleball Courts",
    img: "/images/placeholder.png",
    desc: "Dedicated pickleball courts with professional-grade court surfaces, regulation dimensions, and proper net systems for competitive and recreational play.",
    features: ["Professional court surface", "Regulation dimensions", "Competition-grade nets", "Line markings"]
  },
  {
    title: "Volleyball Court",
    img: "/images/placeholder.png",
    desc: "Full-size volleyball court with professional flooring, regulation net systems, and boundary markings — suitable for competitive training and inter-college matches.",
    features: ["Full regulation court", "Professional flooring", "Competition net system", "Spectator space"]
  },
  {
    title: "Table Tennis Hall",
    img: "/images/placeholder.png",
    desc: "Multiple competition-grade table tennis tables in a dedicated hall with controlled lighting, non-reflective flooring, and proper spacing for serious training.",
    features: ["Competition-grade tables", "Multiple playing stations", "Controlled lighting", "Anti-glare flooring"]
  },
  {
    title: "Multi-Sport Arena",
    img: "/images/placeholder.png",
    desc: "Dedicated recreation zone housing professional foosball tables, carrom boards, and the Astro Air Hockey Arcade — perfect for campus recreation and group activities.",
    features: ["Professional foosball", "Carrom boards", "Astro Air Hockey", "Comfortable seating"]
  },
  {
    title: "Fitness Studio",
    img: "/images/placeholder.png",
    desc: "A spacious, mirror-lined studio with professional flooring, high-quality sound systems, and climate control — perfect for Zumba classes and fitness programs.",
    features: ["Mirror-lined walls", "Pro sound system", "Climate controlled", "Cushioned flooring"]
  }
];

export default function Facilities() {
  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-primary)]">
      {/* PAGE HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-grain">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" 
            src="/images/placeholder.png" 
            alt="Zenithh Facilities" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(var(--hero-brightness))' }}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.png'; }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <span className="text-[var(--color-gold-primary)] font-bold tracking-[0.5em] uppercase text-[10px] block mb-6">ELITE INFRASTRUCTURE</span>
          <h1 className="text-3xl md:text-5xl font-black uppercase text-white mb-6">
            THE <span className="text-[var(--color-gold-primary)] italic">ARENA</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Every square inch designed for peak athletic performance. Built for champions.
          </p>
        </div>
      </section>

      {/* FACILITIES GRID */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {FACILITIES.map((facility, i) => (
              <div key={i} className="group relative bg-[var(--bg-secondary)] border border-[var(--border-light)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,160,23,0.1)]">
                <div className="premium-image-hover relative aspect-video overflow-hidden">
                  <img
                    src={facility.img}
                    alt={facility.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.png'; }}
                  />
                  {/* Gold corner accent */}
                  <span className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[var(--color-gold-primary)] z-20 group-hover:w-16 group-hover:h-16 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent z-10" />
                  <h3 className="absolute bottom-6 left-8 text-3xl font-black uppercase text-[var(--text-primary)] tracking-widest z-20">{facility.title}</h3>
                </div>
                
                <div className="p-6 md:p-10">
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-10 font-light">{facility.desc}</p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {facility.features.map((feat, fi) => (
                      <div key={fi} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-[var(--color-gold-primary)] opacity-40 group-hover:opacity-100 transition-opacity" />
                        <span className="text-[var(--text-primary)]/40 text-[10px] uppercase tracking-widest font-bold group-hover:text-[var(--text-primary)] transition-colors">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-light)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { num: "9", label: "Sports Disciplines" },
              { num: "6hr", label: "Daily Operating Hours" },
              { num: "Pro", label: "Coaching Standards" },
              { num: "Elite", label: "Academy Infrastructure" }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="text-5xl font-black text-[var(--color-gold-primary)] mb-3 tracking-tighter">{item.num}</div>
                <div className="text-[var(--text-primary)]/30 uppercase text-[10px] tracking-[0.4em] font-black">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[var(--color-gold-primary)]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-8xl font-black uppercase text-[var(--text-inverse)] leading-[1.1] mb-8 md:mb-10 tracking-widest">
            BOOK A <br/> FACILITY TOUR
          </h2>
          <p className="text-[var(--text-inverse)]/70 text-lg mb-12 max-w-xl mx-auto font-medium">Experience Hyderabad's premier multi-sport arena in person. Scheduled tours available daily.</p>
          <Link to="/contact" className="btn-highlight">
            SCHEDULE TOUR
          </Link>
        </div>
      </section>
    </div>
  );
}
