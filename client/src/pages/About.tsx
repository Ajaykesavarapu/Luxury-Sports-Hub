import React from "react";
import { Target, Activity, TrendingUp, Shield, Users, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const VALUES = [
  { icon: <Target className="w-7 h-7" />, title: "Excellence", desc: "Every program and coach is held to the highest international standard of sports training." },
  { icon: <Shield className="w-7 h-7" />, title: "Integrity", desc: "We develop athletes of character — honest competitors and resilient individuals." },
  { icon: <Users className="w-7 h-7" />, title: "Inclusivity", desc: "Zenithh is for every aspiring athlete — regardless of fitness level or prior experience." },
  { icon: <Activity className="w-7 h-7" />, title: "Innovation", desc: "Combining science-backed conditioning and modern coaching methodologies for maximum performance." },
  { icon: <TrendingUp className="w-7 h-7" />, title: "Growth", desc: "Structured pathways from beginner to competitive level ensure measurable development." },
  { icon: <Award className="w-7 h-7" />, title: "Achievement", desc: "We celebrate every victory — from first rally completions to national championship podiums." }
];

const MILESTONES = [
  { year: "2024", title: "Vision Conceived", desc: "The blueprint for Hyderabad's most advanced multi-sport arena was finalized." },
  { year: "2025", title: "Infrastructure Development", desc: "Construction of the elite multi-sport facility began with international standards." },
  { year: "2026", title: "Zenithh Grand Opening", desc: "Officially launched from 2026, unveiling the most advanced athletic hub in Telangana." }
];

export default function About() {
  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">

      {/* ═══ PAGE HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-grain">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about-hero.jpg"
            alt="Zenithh Sports Arena"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(var(--hero-brightness))' }}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/about-hero.jpg'; }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-6">
          <span className="text-[var(--color-gold-primary)] font-bold tracking-[0.5em] uppercase text-[10px] block mb-6">OUR LEGACY</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-widest mb-6">
            ELITE <span className="text-[var(--color-gold-primary)] italic">STORY</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Empowering Hyderabad's Next Generation of Champions Since 2026. A New Era of Athletic Excellence.
          </p>
        </div>
      </section>

      {/* ═══ ABOUT INTRO ═══ */}
      <section className="py-40 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <div className="w-full lg:w-1/2 relative group">
              <div className="premium-image-hover relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--border-light)]">
                <img loading="lazy" src="/images/about-interior.png" alt="Zenithh Arena Interior" className="w-full h-full object-cover" />
                <div className="absolute top-8 left-8 bg-[var(--color-gold-primary)] text-[var(--text-inverse)] text-[10px] font-black uppercase tracking-[0.3em] px-5 py-3">EST. 2026</div>
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-[var(--color-gold-primary)]/30 z-10 pointer-events-none" />
            </div>

            <div className="w-full lg:w-1/2">
              <span className="text-[var(--color-gold-primary)] font-bold tracking-[0.5em] uppercase text-[10px] block mb-6">PREMIER ACADEMY</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-[var(--text-primary)] leading-[1.15] tracking-widest mb-6 md:mb-10">
                WE BUILD <span className="text-[var(--color-gold-primary)] italic">CHAMPIONS</span> <br /> WITH PRECISION
              </h2>
              <div className="w-20 h-[1px] bg-[var(--color-gold-primary)] mb-8 md:mb-12" />
              <div className="space-y-8 text-[var(--text-muted)] text-lg leading-relaxed font-light">
                <p>
                  Zenithh Sports Arena is an institution of athletic excellence. Founded in Hyderabad with a mission to create world-class infrastructure for serious athletes, schools, and colleges.
                </p>
                <p>
                  We offer 9 professionally coached sports disciplines under one roof — supported by national-level coaches and a structured development pathway from beginner to elite performance.
                </p>
              </div>
              <div className="mt-8 md:mt-16">
                <Link to="/contact" className="btn-primary">
                  PARTNER WITH US
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="py-40 bg-[var(--bg-secondary)] border-y border-[var(--border-light)] relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-6 text-[var(--text-primary)] tracking-widest">
              CORE <span className="text-[var(--color-gold-primary)] italic">VALUES</span>
            </h2>
            <div className="w-20 h-[1px] bg-[var(--color-gold-primary)] mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {VALUES.map((val, i) => (
              <div key={i} className="p-6 md:p-12 border border-[var(--border-light)] bg-[var(--bg-primary)] hover:border-[var(--color-gold-primary)]/30 transition-all duration-500 group relative">
                <div className="text-[var(--color-gold-primary)] opacity-20 group-hover:opacity-100 mb-6 md:mb-8 transition-all duration-500 transform group-hover:scale-110 origin-left">{val.icon}</div>
                <h3 className="text-xl font-black uppercase tracking-widest text-[var(--text-primary)] mb-4">{val.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ JOURNEY ═══ */}
      <section className="py-40 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 text-[var(--text-primary)] tracking-widest">
              THE <span className="text-[var(--color-gold-primary)] italic">JOURNEY</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {MILESTONES.map((m, i) => (
              <div key={i} className="flex gap-4 sm:gap-16 mb-16 sm:mb-24 relative group">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 border border-[var(--border-medium)] bg-[var(--bg-secondary)] text-[var(--color-gold-primary)] flex items-center justify-center font-black text-xs sm:text-sm group-hover:border-[var(--color-gold-primary)] transition-all duration-500">{m.year}</div>
                  {i < MILESTONES.length - 1 && <div className="w-[1px] flex-1 bg-[var(--bg-inverse)]/10 mt-4 sm:mt-6" />}
                </div>
                <div className="pt-2 sm:pt-6">
                  <h4 className="text-xl sm:text-3xl font-black text-[var(--text-primary)] uppercase tracking-widest mb-3 sm:mb-6">{m.title}</h4>
                  <p className="text-[var(--text-muted)] text-base sm:text-xl leading-relaxed font-light">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-gold-primary)]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-8xl font-black uppercase text-[var(--text-inverse)] mb-8 md:mb-12 leading-[1.1] tracking-widest">
            JOIN THE <br /> ZENITHH ELITE
          </h2>
          <Link to="/contact" className="btn-highlight">
            REGISTER NOW
          </Link>
        </div>
      </section>
    </div>
  );
}
