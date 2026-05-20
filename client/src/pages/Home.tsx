import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ArrowRight, CheckCircle, Trophy, Users, Award, Clock } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CoachCard from "@/components/CoachCard";
import { COACHES_DATA } from "@/data/coaches";

gsap.registerPlugin(ScrollTrigger);

// Particle Component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    const particleCount = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 160, 23, ${p.opacity})`;
        ctx.fill();
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    createParticles();
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none opacity-40" />;
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const SPORTS_OVERVIEW = [
  { id: "cricket", title: "Cricket", img: "/images/placeholder.png" },
  { id: "pickleball", title: "Pickleball", img: "/images/placeholder.png" },
  { id: "volleyball", title: "Volleyball", img: "/images/placeholder.png" },
  { id: "chess", title: "Chess", img: "/images/placeholder.png" },
  { id: "zumba", title: "Zumba", img: "/images/placeholder.png" },
  { id: "table-tennis", title: "Table Tennis", img: "/images/placeholder.png" },
  { id: "foosball", title: "Foosball", img: "/images/placeholder.png" },
  { id: "carrom", title: "Carrom", img: "/images/placeholder.png" },
  { id: "air-hockey", title: "Air Hockey", img: "/images/placeholder.png" },
  { id: "vr-cricket", title: "VR Cricket", img: "/images/placeholder.png" },
  { id: "badminton-outdoor", title: "Badminton", img: "/images/placeholder.png" },
];

const STATS = [
  { icon: <Users className="w-7 h-7" />, value: "500+", label: "Active Athletes" },
  { icon: <Trophy className="w-7 h-7" />, value: "Elite", label: "National Coaching" },
  { icon: <Award className="w-7 h-7" />, value: "11", label: "Sports Disciplines" },
  { icon: <Clock className="w-7 h-7" />, value: "2026", label: "Inaugural Year" }
];

const WHY_FEATURES = [
  "World-class multi-sport infrastructure under one roof",
  "Certified coaches with national & international experience",
  "Structured programs from beginner to competitive level",
  "Science-backed strength & conditioning programs",
  "Video analysis & biomechanical feedback",
  "Mental performance & sports psychology coaching",
  "Flexible batch timings: morning, afternoon & evening",
  "Perfect for tier-1 schools & colleges in Hyderabad"
];

const TESTIMONIALS = [
  { text: "Had a really good experience at Zenith Sports Arena near Miyapur Metro Station. We visited this place around 3 to 4 times along with my children and their friends, and every visit has been a pleasant experience. All of us are genuinely satisfied with the facilities, staff behavior, and the overall atmosphere of the arena. The arena offers multiple sports facilities including a big indoor cricket setup, cricket nets, volleyball courts, and pickleball courts. It is a great place for kids, families, friends, and even corporate groups. The quality of the cricket nets, mats, boundaries, and overall safety arrangements is clearly noticeable. Highly recommended for anyone looking for a safe, clean, and quality sports environment with supportive staff and excellent facilities.", author: "Prajesh Dasari", role: "Regular Visitor" },
  { text: "Before joining Ignite Summer Camp, I didn't know how to play pickleball or many other games. After joining, I learned many rules and developed new skills. The coaches trained us really well, and I enjoyed every moment. Thanks to Ignite!", author: "Avani", role: "Ignite Summer Camp Student" }
];

const Counter = ({ to }: { to: string }) => <span>{to}</span>;

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const heroEyebrowRef = useRef<HTMLSpanElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ctx: gsap.Context;
    if (!isLoading) {
      // GSAP Hero Animations
      ctx = gsap.context(() => {
        // Eyebrow
        gsap.from(heroEyebrowRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "expo.out",
          delay: 0.5
        });

        // Split text animation for title
        const words = heroTitleRef.current?.querySelectorAll(".word");
        if (words) {
          gsap.from(words, {
            y: 80,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "expo.out",
            delay: 0.7
          });
        }

        // Subtitle and tags
        gsap.from(".hero-desc, .sport-tag", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "expo.out",
          delay: 1.2
        });

        // CTA Buttons
        gsap.from(".hero-btns", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          delay: 1.5
        });

        // Stats counter animation
        const statNumbers = document.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-target") || "0", 10);
          gsap.fromTo(stat,
            { innerText: "0" },
            {
              innerText: target,
              duration: 2,
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: stat,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      }, heroContentRef);
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, [isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="h-[1px] bg-[var(--color-gold-primary)] mb-4"
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[var(--color-gold-primary)] text-2xl font-black tracking-[0.5em] uppercase text-center"
          >
            ZENITHH
          </motion.h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-primary selection:text-[var(--text-inverse)]">

      {/* ═══ HERO ═══ */}
      <section id="home" ref={heroContentRef} className="hero-section relative min-h-[100vh] w-full flex items-center pt-[80px] pb-[40px] px-6 md:px-[80px] overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#05070d] via-[#0c0f17] to-[#161c29] z-0" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="container mx-auto relative z-10 flex flex-col items-start text-left">
          <div className="hero-content max-w-[800px]">
            {/* Subtitle */}
            <span
              ref={heroEyebrowRef}
              className="hero-eyebrow text-[#D4A017] font-bold tracking-[0.15em] sm:tracking-[0.3em] uppercase mb-4 block text-[9px] sm:text-[11px]"
            >
              ZENITHH SPORTS ARENA — WHERE LIMITS END, CHAMPIONS BEGIN
            </span>

            {/* Main Title Heading */}
            <div ref={heroTitleRef} className="mb-4">
              <h1 className="hero-heading text-[clamp(1.6rem,5vw,3.2rem)] font-black uppercase tracking-[0.05em] sm:tracking-[0.15em] leading-[1.3] text-white">
                ELITE <span className="text-[#D4A017] italic">SPORTS</span> ACADEMY HYDERABAD
              </h1>
            </div>

            {/* Description */}
            <p className="hero-desc hero-subtitle text-sm sm:text-base md:text-[18px] text-white/80 mb-4 max-w-[560px] font-light leading-[1.6] sm:leading-[1.7]">
              Hyderabad's premier multi-sport training facility — combining world-class coaching, professional infrastructure, and 9 sports disciplines under one roof.
            </p>

            {/* Sport Tags Staggered */}
            <div className="sports-tags flex flex-wrap justify-start gap-x-3 sm:gap-x-6 gap-y-2 sm:gap-y-3 mb-6 sm:mb-8 text-[10px] sm:text-[13px] tracking-[0.05em]">
              {["Cricket", "Pickleball", "Volleyball", "Chess", "Zumba", "Table Tennis", "Foosball", "Carrom", "Air Hockey", "VR Cricket", "Badminton"].map((sport) => (
                <span
                  key={sport}
                  className="sport-tag text-white/50 font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] hover:text-[var(--color-gold-bright)] hover:translate-y-[-2px] transition-all cursor-pointer"
                >
                  {sport}
                </span>
              ))}
            </div>

            {/* Hero Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row items-stretch sm:items-center gap-[20px]">
              <Link to="/contact" className="btn-primary text-center justify-center">
                BOOK A TRIAL SESSION
              </Link>
              <Link to="/sports" className="btn-secondary text-center justify-center">
                EXPLORE SPORTS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MSK ACADEMY FEATURED ═══ */}
      <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden border-b border-[var(--border-light)]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-16 border border-[var(--color-gold-primary)]/20 p-6 md:p-12 bg-[var(--bg-card)] backdrop-blur-sm"
          >
            <div className="w-full lg:w-3/5">
              <span className="text-[var(--color-gold-primary)] font-black tracking-[0.4em] uppercase text-xs mb-6 block">Premium Collaboration</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-[var(--text-primary)] mb-6 leading-tight">
                MSK PRASAD’S <br />
                <span className="text-[var(--color-gold-primary)] italic text-2xl md:text-4xl">INTERNATIONAL CRICKET ACADEMY</span>
              </h2>
              <p className="text-[var(--text-muted)] text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl">
                Delivering elite cricket coaching through expert knowledge, structured training, and world-class facilities in collaboration with Zenithh Sports Arena.
              </p>
              <Link to="/msk-academy" className="group inline-flex items-center gap-4 text-[var(--color-gold-primary)] font-black uppercase tracking-widest text-sm py-4 px-8 border border-[var(--color-gold-primary)] hover:bg-[var(--color-gold-primary)] hover:text-black transition-all">
                Explore MSK Academy <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className="w-full lg:w-2/5">
              <div className="premium-image-hover aspect-video md:aspect-[4/3] border border-[var(--color-gold-primary)]/30">
                <img loading="lazy" src="/images/placeholder.png" alt="MSK Cricket Academy" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SPORTS GRID ═══ */}
      <section id="sports" className="sports-section py-32 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-[var(--text-primary)] mb-4">
              EXPLORE <span className="text-[var(--color-gold-primary)] italic">THE ARENA</span>
            </h2>
            <div className="section-title-line h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold-primary)] to-transparent w-48 mx-auto mb-8" />
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg font-light leading-relaxed">
              From championship-grade cricket nets to professional indoor arcades — Zenithh Sports Arena provides the ultimate environment for athletic growth.
            </p>
          </div>

          <div className="sports-grid-wrapper">
            {/* Row 1: 6 cards */}
            <div className="sports-row-1">
              {SPORTS_OVERVIEW.slice(0, 6).map((sport, i) => (
                <Link to={`/sports/${sport.id}`} key={i} className="sport-card premium-image-hover group">
                  <img
                    src={sport.img}
                    alt={sport.title}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.png'; }}
                  />
                  <div className="sport-card-overlay">
                    <span className="sport-card-name">{sport.title}</span>
                    <span className="sport-card-line" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Row 2: 5 cards */}
            <div className="sports-row-2">
              {SPORTS_OVERVIEW.slice(6, 11).map((sport, i) => (
                <Link to={`/sports/${sport.id}`} key={i} className="sport-card premium-image-hover group">
                  <img
                    src={sport.img}
                    alt={sport.title}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.png'; }}
                  />
                  <div className="sport-card-overlay">
                    <span className="sport-card-name">{sport.title}</span>
                    <span className="sport-card-line" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center mt-20">
            <Link to="/sports" className="btn-secondary">
              VIEW FULL ACADEMY
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="stats-bar relative z-10 border-y border-[var(--border-medium)] bg-[var(--bg-secondary)] py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
            {/* Disciplines */}
            <div className="stat-item text-center">
              <span className="stat-number text-5xl md:text-7xl font-black text-[var(--color-gold-primary)] mb-2 block" data-target="11">0</span>
              <span className="stat-label text-[10px] md:text-xs text-[var(--text-muted)] font-bold uppercase tracking-[0.3em]">Sports Disciplines</span>
            </div>

            <div className="hidden md:block w-[1px] h-16 bg-[var(--bg-inverse)]/10" />

            {/* Athletes */}
            <div className="stat-item text-center">
              <div className="flex items-end justify-center mb-2">
                <span className="stat-number text-5xl md:text-7xl font-black text-[var(--color-gold-primary)]" data-target="500">0</span>
                <span className="text-3xl md:text-4xl font-black text-[var(--color-gold-primary)] mb-1 ml-1">+</span>
              </div>
              <span className="stat-label text-[10px] md:text-xs text-[var(--text-muted)] font-bold uppercase tracking-[0.3em]">Active Athletes</span>
            </div>

            <div className="hidden md:block w-[1px] h-16 bg-[var(--bg-inverse)]/10" />

            {/* Coaches */}
            <div className="stat-item text-center">
              <span className="stat-number text-5xl md:text-7xl font-black text-[var(--color-gold-primary)] mb-2 block" data-target="15">0</span>
              <span className="stat-label text-[10px] md:text-xs text-[var(--text-muted)] font-bold uppercase tracking-[0.3em]">Expert Coaches</span>
            </div>

            <div className="hidden md:block w-[1px] h-16 bg-[var(--bg-inverse)]/10" />

            {/* Facilities */}
            <div className="stat-item text-center">
              <span className="stat-number text-5xl md:text-7xl font-black text-[var(--color-gold-primary)] mb-2 block" data-target="1">0</span>
              <span className="stat-label text-[10px] md:text-xs text-[var(--text-muted)] font-bold uppercase tracking-[0.3em]">World-Class Facility</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HIGH PERFORMANCE SHOWCASE (SEO & H3 HIERARCHY) ═══ */}
      <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden border-b border-[var(--border-light)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[var(--color-gold-primary)] font-black tracking-[0.4em] uppercase text-xs mb-4 block">Our Training Ecosystem</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-[var(--text-primary)]">
              HIGH-PERFORMANCE <span className="text-[var(--color-gold-primary)] italic">SPORTS PROGRAMS</span>
            </h2>
            <div className="section-title-line h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold-primary)] to-transparent w-48 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[var(--bg-card)] border border-[var(--border-light)] hover:border-[var(--color-gold-primary)]/40 transition-all duration-300 rounded-lg">
              <span className="text-4xl mb-6 block">🏏</span>
              <h3 className="text-lg font-black uppercase tracking-wider text-[var(--text-primary)] mb-4">Elite Youth Academy Coaching</h3>
              <p className="text-[var(--text-muted)] text-sm font-light leading-relaxed">
                Our flagship youth developmental sports programs are structured to take athletes from beginner level to competitive state and national levels. With specialized, international-standard coaching curriculums for Cricket, Volleyball, and Chess, we prioritize motor-skill advancement, physical conditioning, and structural discipline.
              </p>
            </div>

            <div className="p-8 bg-[var(--bg-card)] border border-[var(--border-light)] hover:border-[var(--color-gold-primary)]/40 transition-all duration-300 rounded-lg">
              <span className="text-4xl mb-6 block">🏸</span>
              <h3 className="text-lg font-black uppercase tracking-wider text-[var(--text-primary)] mb-4">Professional Multi-Sport Facilities</h3>
              <p className="text-[var(--text-muted)] text-sm font-light leading-relaxed">
                Enjoy premium sports bookings at Miyapur's best-equipped arena. Featuring high-grade indoor cricket nets, professional pickleball courts with premium synthetic mats, tournament-standard volleyball courts, and leisure zones for table tennis, carrom, and air hockey. Perfect for daily practice and corporate sports leagues.
              </p>
            </div>

            <div className="p-8 bg-[var(--bg-card)] border border-[var(--border-light)] hover:border-[var(--color-gold-primary)]/40 transition-all duration-300 rounded-lg">
              <span className="text-4xl mb-6 block">🏢</span>
              <h3 className="text-lg font-black uppercase tracking-wider text-[var(--text-primary)] mb-4">Corporate Sports & Event Hosting</h3>
              <p className="text-[var(--text-muted)] text-sm font-light leading-relaxed">
                We organize comprehensive corporate sports tournaments, high-performance coaching camps, and community tournaments. Partner with us to customize packages for corporate leagues, school sports events, facility tours, and weekend high-intensity workout and sports training sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY ZENITHH (ABOUT) ═══ */}
      <section id="about" className="py-20 bg-[var(--bg-primary)] overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* CONTENT LEFT */}
            <div className="w-full lg:w-3/5 order-2 lg:order-1">
              <span className="text-[var(--color-gold-primary)] font-bold tracking-[0.5em] uppercase text-xs block mb-4">WHY ZENITHH</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-[var(--text-primary)] leading-[1.2] tracking-widest mb-6">
                WHERE <span className="text-[var(--color-gold-primary)] italic tracking-widest">LIMITS END,</span><br className="hidden md:block" /> CHAMPIONS BEGIN
              </h2>
              <div className="section-title-line h-[1px] bg-gradient-to-r from-[var(--color-gold-primary)] to-transparent w-48 mb-6" />
              <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-10 font-light max-w-xl">
                Zenithh Sports Arena is Hyderabad's most comprehensive multi-sport training facility - built for tier-1 schools, colleges, and serious athletes who demand world-class infrastructure.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                {WHY_FEATURES.map((feat, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-gold-primary)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-gold-primary)] transition-colors duration-500">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--color-gold-primary)] group-hover:text-black transition-colors" />
                    </div>
                    <span className="text-[var(--text-muted)] text-[13px] font-bold uppercase tracking-widest group-hover:text-[var(--text-primary)] transition-colors">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/about" className="btn-primary">
                  ABOUT ARENA
                </Link>
                <Link to="/facilities" className="btn-secondary">
                  VIEW FACILITIES
                </Link>
              </div>
            </div>

            {/* IMAGE RIGHT */}
            <div className="w-full lg:w-2/5 order-1 lg:order-2 relative group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--border-medium)] bg-[var(--bg-card)]">
                <img
                  src="/images/placeholder.png"
                  alt="Zenithh Sports Arena Facilities"
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
                {/* Minimalist accents */}
                <div className="absolute top-2  left-2 w-12 h-12 border-t border-l border-[var(--color-gold-primary)] opacity-40" />
                <div className="absolute bottom-2 right-2 w-12 h-12 border-b border-r border-[var(--color-gold-primary)] opacity-40" />
              </div>
              {/* Floating Background Ornament */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-gold-primary)]/5 -z-10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>



      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 sm:py-24 md:py-32 bg-[var(--bg-secondary)] relative overflow-hidden border-y border-[var(--border-light)]">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-black uppercase mb-10 sm:mb-16 md:mb-20 text-[var(--text-primary)] tracking-[0.1em] sm:tracking-[0.2em]">
              WHAT OUR <span className="text-[var(--color-gold-primary)] italic">COMMUNITY SAYS</span>
            </h2>

            <div className="relative min-h-[550px] sm:min-h-[350px] md:min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex flex-col items-center overflow-y-auto"
                >
                  <div className="flex-1 flex items-start justify-center">
                    <p className="text-sm sm:text-lg md:text-xl lg:text-2xl font-light italic leading-relaxed sm:leading-relaxed mb-8 sm:mb-12 text-[var(--text-primary)] max-w-4xl px-2">
                      "{TESTIMONIALS[activeTestimonial].text}"
                    </p>
                  </div>
                  <div className="flex flex-col items-center flex-shrink-0 mt-auto">
                    <h4 className="font-black uppercase text-sm sm:text-lg tracking-[0.1em] sm:tracking-[0.2em] text-[var(--text-primary)]">{TESTIMONIALS[activeTestimonial].author}</h4>
                    <p className="text-[var(--color-gold-primary)] uppercase text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.4em] mt-2 opacity-60">{TESTIMONIALS[activeTestimonial].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-6 sm:gap-8 mt-16 sm:mt-24">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                className="text-[var(--text-primary)]/20 hover:text-[var(--color-gold-primary)] transition-colors"
              >
                <ChevronLeft size={28} />
              </button>
              <div className="flex items-center gap-3">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-[2px] transition-all duration-500 ${i === activeTestimonial ? 'bg-[var(--color-gold-primary)] w-10 sm:w-12' : 'bg-[var(--text-primary)]/10 w-5 sm:w-6'}`} />
                ))}
              </div>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                className="text-[var(--text-primary)]/20 hover:text-[var(--color-gold-primary)] transition-colors"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="cta-section py-40 relative overflow-hidden bg-[var(--bg-secondary)] !bg-none">
        {/* Animated noise pattern */}
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none z-10" />

        <div className="container mx-auto px-6 relative z-20 text-center">
          <h2 className="text-3xl md:text-7xl font-black uppercase tracking-widest mb-8 text-[var(--text-primary)] leading-[1.15] max-w-5xl mx-auto">
            TRANSFORM YOUR CAMPUS <span className="text-[var(--color-gold-primary)]">WITH A HUB OF ATHLETICS</span> TODAY
          </h2>
          <p className="text-[var(--text-muted)] text-lg md:text-xl mb-16 max-w-2xl mx-auto font-medium">
            Partner with Zenithh Sports Arena — Hyderabad's most comprehensive multi-sport facility.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="btn-highlight">
              REGISTER NOW
            </Link>
            <Link to="/sports" className="btn-secondary">
              EXPLORE SPORTS
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
