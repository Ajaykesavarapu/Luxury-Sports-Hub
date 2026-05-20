import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Trophy, Users } from "lucide-react";

const UPCOMING_EVENTS = [
  {
    type: "Announcement",
    title: "Coming Soon",
    date: "TBA",
    sport: "All",
    desc: "Exciting new tournaments and camps are currently being planned. Stay tuned for new updates!",
    img: "/images/events-hero.jpg",
    badge: "Coming Soon"
  }
];

const PAST_HIGHLIGHTS: any[] = [];

export default function Events() {
  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-primary)]">
      {/* PAGE HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-grain">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" 
            src="/images/events-hero.jpg" 
            alt="Zenithh Events" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(var(--hero-brightness))' }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <span className="text-[var(--color-gold-primary)] font-bold tracking-[0.5em] uppercase text-[10px] block mb-6">TOURNAMENTS · CAMPS · LEAGUES</span>
          <h1 className="text-3xl md:text-5xl font-black uppercase text-white mb-6">
            ELITE <span className="text-[var(--color-gold-primary)] italic">COMPETE</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Where Champions Compete & Legends are Born. Immerse yourself in the arena.
          </p>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1400px] mx-auto">
            {UPCOMING_EVENTS.map((event, i) => (
              <div key={i} className="group relative bg-[var(--bg-secondary)] border border-[var(--border-light)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,160,23,0.1)] flex flex-col md:flex-row">
                <div className="premium-image-hover relative w-full md:w-2/5 aspect-square overflow-hidden">
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/gallery-hero.jpg'; }}
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-[var(--bg-inverse)] text-[var(--text-inverse)] text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5">{event.type}</span>
                    <span className="bg-[var(--color-gold-primary)] text-[var(--text-inverse)] text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5">{event.badge}</span>
                  </div>
                </div>
                
                <div className="p-6 md:p-10 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-[var(--color-gold-primary)]" />
                    <span className="text-[var(--color-gold-primary)] text-[10px] font-black uppercase tracking-[0.3em]">{event.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-wider mb-6 leading-tight">{event.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-10 font-light italic flex-1">"{event.desc}"</p>
                  <Link to="/contact" className="btn-primary">
                    REGISTER NOW
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAST HIGHLIGHTS */}
      {PAST_HIGHLIGHTS.length > 0 && (
        <section className="py-40 bg-[var(--bg-secondary)] border-y border-[var(--border-light)]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 text-[var(--text-primary)] tracking-widest">
                PAST <span className="text-[var(--color-gold-primary)] italic">GLORY</span>
              </h2>
              <div className="w-20 h-[1px] bg-[var(--color-gold-primary)] mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PAST_HIGHLIGHTS.map((item, i) => (
                <div key={i} className="p-10 bg-[var(--bg-primary)] border border-[var(--border-light)] group hover:border-[var(--color-gold-primary)]/30 transition-all duration-500">
                  <Trophy className="w-10 h-10 text-[var(--color-gold-primary)] mb-8 opacity-20 group-hover:opacity-100 transition-opacity" />
                  <div className="text-[var(--color-gold-primary)] text-[10px] font-black uppercase tracking-[0.3em] mb-4">{item.sport}</div>
                  <h4 className="text-lg font-black text-[var(--text-primary)] uppercase tracking-widest mb-6 leading-tight">{item.title}</h4>
                  <div className="flex items-center gap-3 text-[var(--text-primary)]/40 text-[10px] font-bold uppercase tracking-widest">
                    <Users className="w-4 h-4" />
                    <span>{item.participants}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOST CTA */}
      <section className="py-40 bg-[var(--color-gold-primary)] relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-8xl font-black uppercase text-[var(--text-inverse)] mb-12 leading-[1.1] tracking-widest">
            HOST YOUR <br /> CHAMPIONSHIP
          </h2>
          <p className="text-[var(--text-inverse)]/70 text-xl mb-12 max-w-2xl mx-auto font-medium">Zenithh Arena is available for inter-institution, corporate, and private sports events. Experience elite management.</p>
          <Link to="/contact" className="btn-highlight">
            BOOK THE ARENA
          </Link>
        </div>
      </section>
    </div>
  );
}
