import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Award, 
  Target, 
  Zap, 
  CheckCircle, 
  ShieldCheck, 
  Mail, 
  ArrowLeft,
  Calendar,
  Layers,
  Star
} from "lucide-react";
import { COACHES_DATA } from "@/data/coaches";

export default function CoachProfile() {
  const { id } = useParams();
  const coach = COACHES_DATA.find((c) => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (coach) {
      document.title = `${coach.name} | Elite Coach @ Zenithh Sports Arena`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${coach.name} is a ${coach.role} at Zenithh Sports Arena. ${coach.shortSummary}`);
      }
    }
  }, [coach]);

  if (!coach) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[var(--color-gold-primary)] mb-4">COACH NOT FOUND</h1>
          <Link to="/coaches" className="text-[var(--text-muted)] hover:text-[var(--color-gold-primary)] flex items-center gap-2 justify-center">
            <ArrowLeft size={16} /> Back to Coaches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
        {/* Animated Background Text Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-[var(--color-gold-primary)]/5 select-none pointer-events-none tracking-tighter whitespace-nowrap z-0">
          PRO ATHLETE
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* LEFT: CONTENT */}
            <div className="w-full lg:w-3/5 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Link to="/coaches" className="inline-flex items-center gap-2 text-[var(--color-gold-primary)] font-black uppercase tracking-widest text-[10px] mb-8 hover:translate-x-[-10px] transition-transform">
                  <ArrowLeft size={14} /> Back to Coaches
                </Link>
                <span className="text-[var(--color-gold-primary)] font-black tracking-[0.5em] uppercase text-xs block mb-4">ELITE MENTOR</span>
                <h1 className="text-5xl md:text-8xl font-black uppercase mb-6 leading-[1.15] text-[var(--text-primary)]">
                  {coach.name.split(' ').slice(0, -1).join(' ')} <br />
                  <span className="text-[var(--color-gold-primary)] italic">{coach.name.split(' ').slice(-1)}</span>
                </h1>
                <p className="text-[var(--color-gold-primary)] font-bold text-xl uppercase tracking-widest mb-8 border-l-4 border-[var(--color-gold-primary)] pl-6">
                  {coach.role}
                </p>
                <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-10 max-w-xl font-light">
                  {coach.shortSummary}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {coach.specializations?.map((spec, i) => (
                    <span key={i} className="px-6 py-2.5 bg-[var(--bg-secondary)] border border-[var(--color-gold-primary)]/20 text-[var(--color-gold-primary)] text-[10px] font-black uppercase tracking-widest hover:border-[var(--color-gold-primary)] transition-colors">
                      {spec}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT: PORTRAIT */}
            <div className="w-full lg:w-2/5 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Image Ornament */}
                <div className="absolute -inset-4 border border-[var(--color-gold-primary)]/20 -z-10 translate-x-4 translate-y-4" />
                
                <div className="aspect-[4/5] overflow-hidden bg-[var(--bg-card)] border border-[var(--border-light)]">
                  <img loading="lazy" 
                    src={coach.image} 
                    alt={coach.name} 
                    className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  />
                </div>

                {/* Vertical Text Ornament */}
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center text-[var(--color-gold-primary)]/10 font-black text-4xl uppercase tracking-[1em] whitespace-nowrap hidden lg:block">
                  ZENITHH ELITE
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS / ACHIEVEMENTS ═══ */}
      <section className="py-20 bg-[var(--bg-secondary)] border-y border-[var(--border-light)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {coach.achievements?.slice(0, 3).map((ach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 border border-[var(--border-light)] bg-[var(--bg-card)] relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Trophy size={80} className="text-[var(--color-gold-primary)]" />
                </div>
                <h4 className="text-[var(--color-gold-primary)] font-black text-xs uppercase tracking-[0.3em] mb-4">CHAMPIONSHIP RECORD</h4>
                <p className="text-[var(--text-primary)] font-bold text-lg uppercase leading-tight tracking-widest">
                  {ach}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT & PHILOSOPHY ═══ */}
      <section className="py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="w-full lg:w-1/2">
              <span className="text-[var(--color-gold-primary)] font-black tracking-[0.5em] uppercase text-xs block mb-6">THE VISION</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-10 tracking-widest">
                ABOUT <span className="text-[var(--color-gold-primary)] italic">COACH</span>
              </h2>
              <div className="space-y-6 text-[var(--text-muted)] text-lg leading-relaxed font-light">
                <p>{coach.about}</p>
                {coach.philosophy && (
                  <div className="p-10 border-l-4 border-[var(--color-gold-primary)] bg-[var(--bg-secondary)] mt-12 italic">
                    <p className="text-[var(--text-primary)] md:text-2xl font-medium leading-relaxed">
                      "{coach.philosophy}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 gap-8">
                {/* EXPERTISE */}
                <div className="p-10 bg-[var(--bg-secondary)] border border-[var(--border-light)] relative">
                  <Zap className="absolute top-8 right-8 text-[var(--color-gold-primary)]/20" size={40} />
                  <h3 className="text-2xl font-black uppercase text-[var(--color-gold-primary)] mb-8 tracking-widest">COACHING EXPERTISE</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {coach.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="text-[var(--color-gold-primary)] w-5 h-5 flex-shrink-0" />
                        <span className="text-[var(--text-primary)]/80 font-bold uppercase text-[11px] tracking-widest">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TIMELINE / PROGRAMS */}
                <div className="p-10 bg-[var(--bg-secondary)] border border-[var(--border-light)] relative">
                  <Target className="absolute top-8 right-8 text-[var(--color-gold-primary)]/20" size={40} />
                  <h3 className="text-2xl font-black uppercase text-[var(--color-gold-primary)] mb-8 tracking-widest">
                    {coach.experienceTimeline ? "EXPERIENCE TIMELINE" : "DEVELOPMENT PROGRAMS"}
                  </h3>
                  <div className="space-y-6">
                    {coach.experienceTimeline ? (
                      coach.experienceTimeline.map((item, i) => (
                        <div key={i} className="flex gap-6 items-start group">
                          <div className="text-[var(--color-gold-primary)] font-black text-sm tracking-widest whitespace-nowrap pt-1">{item.year}</div>
                          <div className="h-px bg-[var(--color-gold-primary)]/20 flex-grow mt-3" />
                          <div className="text-[var(--text-primary)] font-bold uppercase text-xs tracking-widest text-right max-w-[200px] group-hover:text-[var(--color-gold-primary)] transition-colors">{item.event}</div>
                        </div>
                      ))
                    ) : (
                      coach.programs?.map((prog, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                          <div className="w-10 h-10 bg-[var(--color-gold-primary)]/10 rounded flex items-center justify-center text-[var(--color-gold-primary)] group-hover:bg-[var(--color-gold-primary)] group-hover:text-black transition-all">
                            0{i + 1}
                          </div>
                          <span className="text-[var(--text-primary)] font-bold uppercase text-xs tracking-widest">{prog}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CALL TO ACTION ═══ */}
      <section className="py-40 bg-[var(--color-gold-primary)] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 -skew-x-12 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-black/5 skew-x-12 -translate-x-20" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase text-black leading-tight tracking-[0.1em] mb-10 max-w-4xl mx-auto">
              {coach.ctaText}
            </h2>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScxSW3CxICNVxvRtKCAJnJFk1FDjap4rkQ9vcBOS_fo0JJ9Gg/viewform?usp=header" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-black text-[var(--color-gold-primary)] px-12 py-5 font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
            >
              JOIN ACADEMY NOW <Zap size={20} fill="currentColor" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
