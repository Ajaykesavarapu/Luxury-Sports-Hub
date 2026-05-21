import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap, Trophy, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import CoachCard from "@/components/CoachCard";
import { COACHES_DATA } from "@/data/coaches";

const COACHING_PHILOSOPHY = [
  { 
    title: "Technical Mastery", 
    desc: "Every coach at Zenithh prioritizes technical fundamentals before advancing to competitive play.",
    icon: <Zap className="w-8 h-8" />
  },
  { 
    title: "Science-Backed", 
    desc: "Our methodology integrates sports science, biomechanical analysis, and evidence-based conditioning.",
    icon: <Users className="w-8 h-8" />
  },
  { 
    title: "Personalized", 
    desc: "Small batch sizes ensure every athlete receives feedback tailored to their specific athletic goals.",
    icon: <Award className="w-8 h-8" />
  }
];

export default function Coaches() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Elite Coaches & Mentors | Zenithh Sports Arena Hyderabad";
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-[var(--bg-primary)]">
      {/* PAGE HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-grain">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/about-arena.jpg" 
            alt="Zenithh Coaching Team" 
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.3)' }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-primary)]" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[var(--color-gold-primary)] font-bold tracking-[0.5em] uppercase text-[10px] block mb-6">ELITE MENTORSHIP</span>
            <h1 className="text-4xl md:text-7xl font-black uppercase text-white mb-6 tracking-widest">
              BEYOND <span className="text-[var(--color-gold-primary)] italic">COACHING</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Hyderabad's most decorated athletic veterans teaching the next generation of championship talent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* COACHES GRID */}
      <section className="py-32 bg-[var(--bg-primary)] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[var(--color-gold-primary)] to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-[var(--text-primary)] mb-4 tracking-widest">
              THE <span className="text-[var(--color-gold-primary)] italic">MENTORS</span>
            </h2>
            <p className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-[0.3em] opacity-40">Professional Academy Roster</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {COACHES_DATA.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-32 bg-[var(--bg-secondary)] border-y border-[var(--border-light)] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--color-gold-primary)]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[var(--color-gold-primary)]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-[var(--text-primary)] mb-20 tracking-widest">
            THE COACHING <span className="text-[var(--color-gold-primary)] italic">STANDARD</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {COACHING_PHILOSOPHY.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto bg-[var(--bg-primary)] border border-[var(--border-light)] flex items-center justify-center text-[var(--color-gold-primary)] mb-10 group-hover:bg-[var(--color-gold-primary)] group-hover:text-black transition-all duration-500 transform group-hover:rotate-12">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold uppercase text-[var(--color-gold-primary)] mb-4 tracking-widest">{item.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="py-32 bg-[var(--color-gold-primary)] relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-10" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-black uppercase text-black leading-tight mb-10 tracking-widest">
              JOIN HYDERABAD'S <br/> ELITE COACHING TEAM
            </h2>
            <p className="text-black/70 text-lg mb-12 max-w-xl mx-auto font-medium tracking-tight">
              Are you a certified professional? Zenithh is always looking for world-class talent to lead our programs.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-4 bg-[var(--bg-inverse)] text-[var(--color-gold-primary)] px-10 py-5 font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
              APPLY AS COACH <Trophy size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
