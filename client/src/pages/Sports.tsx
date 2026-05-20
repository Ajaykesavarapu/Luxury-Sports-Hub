import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import FAQSection from "@/components/FAQSection";
import { SPORTS_FAQS } from "@/constants/faqs";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const SPORTS = [
  {
    id: "cricket",
    title: "Cricket",
    img: "/images/placeholder.png",
    tagline: "The Home of Elite Cricket Coaching in Hyderabad",
    description: "Cricket is more than just a sport in India — it is a passion and a life-defining dream. At Zenithh Sports Arena, we channel that passion into precision performance. Our professional net facilities and structured performance pathways transform every aspiring cricketer into a confident, competition-ready athlete.",
    features: [
      "Professional batting, bowling & fielding coaching",
      "Structured modules: Beginner → Intermediate → Advanced",
      "Cricket-specific strength & conditioning",
      "Net practice & pitch simulation",
      "Video analysis & biomechanical feedback",
      "Mental toughness & match temperament training",
      "Internal tournaments & competitive exposure"
    ],
    programs: [
      { name: "Beginner", desc: "Grip, stance, footwork, batting posture, basic bowling action, and fielding fundamentals. Every session builds confidence and a love for the game." },
      { name: "Intermediate", desc: "Batting shot selection, bowling variations (pace, swing, spin), fielding agility, structured drill sessions, practice matches, and sports psychology." },
      { name: "Advanced", desc: "High-intensity conditioning, position-specific mastery, video analysis, opposition strategy reading, and intensive match simulation at professional academy standards." }
    ]
  },
  {
    id: "pickleball",
    title: "Pickleball",
    img: "/images/placeholder.png",
    tagline: "The Fastest Growing Sport in Hyderabad",
    description: "A dynamic sport brilliantly blending tennis, badminton, and table tennis — played on a badminton-sized court with a solid paddle and a perforated plastic ball. At Zenithh Sports Arena, we have built one of Hyderabad's premier pickleball training facilities to meet the rapidly growing demand for professional coaching.",
    features: [
      "World-class pickleball courts with professional surfaces",
      "Certified coaches: technique, footwork & game strategy",
      "Programs for all levels — beginner to competitive",
      "Strokes, dinking, volleying & court positioning",
      "Agility & fitness specific to pickleball movement",
      "Group classes, private coaching & drill sessions",
      "Suitable for all ages including juniors & seniors"
    ],
    programs: [
      { name: "Beginner", desc: "Court dimensions, basic strokes (forehand, backhand, serve), and scoring system. Sessions make learning fun and build a solid technical foundation from day one." },
      { name: "Intermediate", desc: "Stroke consistency, the 'third shot drop,' mastering the kitchen (non-volley zone), improved footwork, and strategic shot placements with accuracy." },
      { name: "Advanced Competitive", desc: "Aggressive net play, speed-up drills, erne shots, ATP (around-the-post) techniques, full match simulations, and performance analysis." }
    ]
  },
  {
    id: "volleyball",
    title: "Volleyball",
    img: "/images/placeholder.png",
    tagline: "Build Your Volleyball Game with Zenithh",
    description: "Volleyball demands explosive athleticism, razor-sharp reflexes, and seamless teamwork. At Zenithh Sports Arena Hyderabad, our volleyball training program develops all these qualities — from grassroots beginners to competitive players targeting district and state representation.",
    features: [
      "Expert coaches with competitive credentials",
      "Serving, passing, setting, spiking & blocking training",
      "Court-specific conditioning: explosive power & agility",
      "Team dynamics, positioning & tactical strategy",
      "Individual skill assessment & personalized plans",
      "Internal matches & competitive league participation",
      "Programs for school students, college & adults"
    ],
    programs: [
      { name: "Foundation", desc: "Court orientation, forearm passing (bump), serve technique, and introductory setting. Builds genuine technical confidence before advancing." },
      { name: "Intermediate", desc: "Powerful spike approaches, back-row attack techniques, jump serving, libero defensive skills, positional rotations, and reading opponent attacks." },
      { name: "Advanced Competitive", desc: "Elite-level conditioning, position-mastery drills, video analysis, match simulation, and mental performance training for district and state competitions." }
    ]
  },
  {
    id: "chess",
    title: "Chess",
    img: "/images/placeholder.png",
    tagline: "Develop Strategic Brilliance at Zenithh",
    description: "Chess is the ultimate test of strategic thinking, patience, and mental discipline. At Zenithh Sports Arena, our chess program develops cognitive excellence — from opening theory and tactical patterns to endgame mastery — helping students compete at scholastic, collegiate, and competitive levels.",
    features: [
      "Structured curriculum: openings, middlegame & endgame",
      "Tactical pattern recognition training",
      "Tournament preparation & competitive exposure",
      "Game analysis sessions with expert coaches",
      "Blitz, Rapid & Classical time control training",
      "Mental resilience & decision-making development",
      "Suitable for all ages from beginners to competitors"
    ],
    programs: [
      { name: "Beginner", desc: "Piece movements, basic rules, checkmate patterns, and fundamental openings. Builds logical thinking and introduces the joy of strategic play." },
      { name: "Intermediate", desc: "Opening theory, tactical motifs (pins, forks, skewers), positional understanding, and structured game analysis to build competitive awareness." },
      { name: "Advanced Tournament", desc: "Deep opening preparation, complex endgame technique, psychological approach to competitions, and full game analysis for serious competitive chess." }
    ]
  },
  {
    id: "zumba",
    title: "Zumba",
    img: "/images/placeholder.png",
    tagline: "Dance, Fitness & Energy — All in One",
    description: "Zumba at Zenithh Sports Arena is where fitness meets dance in the most energizing way possible. Our certified Zumba instructors combine Latin-inspired dance rhythms with aerobic exercise principles to deliver high-energy sessions that improve fitness, coordination, and mental well-being.",
    features: [
      "Certified Zumba® licensed instructors",
      "Latin dance rhythms: Salsa, Merengue, Cumbia & more",
      "Full-body cardiovascular workout in every session",
      "Beginner to advanced choreography levels",
      "Stress relief through rhythmic movement",
      "Burns 400–600 calories per session",
      "Inclusive atmosphere for all fitness levels"
    ],
    programs: [
      { name: "Foundation Zumba", desc: "Basic rhythms, simple choreography, and fundamental footwork for complete beginners. Focus on enjoyment, coordination, and building aerobic stamina." },
      { name: "Intermediate", desc: "More complex choreography sequences, faster rhythm combinations, body conditioning elements, and increased cardiovascular intensity." },
      { name: "Zumba Toning", desc: "Incorporates light weights and toning sticks alongside dance to simultaneously build muscular endurance and cardiovascular fitness." }
    ]
  },
  {
    id: "table-tennis",
    title: "Table Tennis",
    img: "/images/placeholder.png",
    tagline: "Precision, Speed & Reflexes Perfected",
    description: "Table Tennis at Zenithh Sports Arena is coached to a high competitive standard. Our professional tables, certified coaches, and structured training methodology develop players who can compete from club level all the way to collegiate and state competitions.",
    features: [
      "Professional competition-grade tables",
      "Certified TT coaches with competitive experience",
      "Stroke technique: forehand, backhand, serve & return",
      "Spin recognition and counter-spin training",
      "Footwork patterns & positional play",
      "Match tactics, reading opponent patterns",
      "Multi-ball training drills for rapid improvement"
    ],
    programs: [
      { name: "Beginner", desc: "Table rules, grip technique, forehand drive, backhand push, and basic serve. Builds consistent ball control and the fundamentals of rally play." },
      { name: "Intermediate", desc: "Topspin techniques, loop shots, sidespin serves, footwork patterns, and structured point-play training to develop match competence." },
      { name: "Advanced", desc: "High-speed rally training, advanced serve-and-attack combinations, deceptive spin play, and full competitive match simulation with video analysis." }
    ]
  },
  {
    id: "foosball",
    title: "Foosball",
    img: "/images/placeholder.png",
    tagline: "Competitive Table Football at Its Best",
    description: "Foosball (table football) at Zenithh Sports Arena goes beyond casual recreation. We coach the technical skills, strategic thinking, and reflexive control that competitive foosball demands — making it a serious sport within our multi-sport facility.",
    features: [
      "Professional-standard foosball tables",
      "Singles and doubles competitive formats",
      "Rod control, shooting accuracy & ball control coaching",
      "Defensive wall techniques & counter-attack play",
      "Internal league play & tournaments",
      "Suitable for all ages — great for group bonding",
      "Cognitive benefits: reaction time & spatial awareness"
    ],
    programs: [
      { name: "Beginner", desc: "Basic rod control, shooting mechanics, goalie technique, and fundamental offensive and defensive positioning for new players." },
      { name: "Intermediate", desc: "Advanced ball control (snake shot, pull shot), defensive walls, counter-attack strategies, and 2-player team coordination for doubles play." },
      { name: "Competitive", desc: "Match-speed drills, shot accuracy under pressure, tournament tactics, and mental composure training for competitive foosball environments." }
    ]
  },
  {
    id: "carrom",
    title: "Carrom",
    img: "/images/placeholder.png",
    tagline: "Master India's Beloved Board Sport",
    description: "Carrom is one of India's most beloved traditional sports — a game of precision, angles, and strategic thinking. At Zenithh Sports Arena, our carrom program provides professional coaching on competition-grade boards, helping players develop the accuracy, technique, and tactical awareness needed for high-level competitive play.",
    features: [
      "Competition-grade carrom boards",
      "Professional striking technique coaching",
      "Angle calculation & positional strategy",
      "Individual and doubles competitive formats",
      "Board management & opponent strategy reading",
      "Internal tournaments & competitive exposure",
      "Suitable for all ages — deeply rooted in Indian culture"
    ],
    programs: [
      { name: "Beginner", desc: "Proper striker grip, basic striking technique, coin positioning, and fundamental board sense. Introduces the joy and depth of carrom to new players." },
      { name: "Intermediate", desc: "Advanced angle play, cover disc techniques, defensive carrom positioning, and structured match play for competitive development." },
      { name: "Advanced", desc: "Precision shot mastery, cut shots, thumb shots, board reading under competitive pressure, and full tournament simulation." }
    ]
  },
  {
    id: "air-hockey",
    title: "Astro Air Hockey Arcade",
    img: "/images/placeholder.png",
    tagline: "Lightning Reflexes. Unstoppable Action.",
    description: "Zenithh Sports Arena's Astro Air Hockey Arcade brings one of the most thrilling arcade sports experiences to Hyderabad. Fast-paced, reflex-driven, and endlessly competitive — our air hockey setup provides the ultimate recreational sports experience alongside our elite training programs.",
    features: [
      "Professional air hockey arcade tables",
      "Fast-paced competitive gameplay",
      "Reflexes, hand-eye coordination & reaction training",
      "Singles and doubles play formats",
      "Perfect for recreational play & competitive fun",
      "Suitable for all ages",
      "Ideal for group events & campus recreation"
    ],
    programs: [
      { name: "Recreational Play", desc: "Open-play sessions for individuals and groups. Perfect for campus recreation, stress relief, and building competitive spirit in a fun environment." },
      { name: "Competitive Training", desc: "Focused reflex drills, mallet control technique, defensive wall strategies, and shot placement accuracy for competitive air hockey play." }
    ]
  },
  {
    id: "vr-cricket",
    title: "VR Cricket",
    img: "/images/placeholder.png",
    tagline: "Immersive Virtual Reality Cricket Experience",
    description: "Step into the ultimate virtual reality cricket experience at Zenithh Sports Arena. Face international-level pacers and spinners in hyper-realistic stadiums using state-of-the-art VR technology. Perfect for honing your reflexes, shot selection, and match awareness in a fully controlled digital environment.",
    features: [
      "Hyper-realistic VR cricket simulation technology",
      "Face bowling speeds from 60kmph to 150kmph+",
      "Multiple international stadium environments",
      "Real-time shot analysis and impact feedback",
      "Progress tracking and reflex improvement",
      "Ideal for both professional practice and entertainment",
      "Safe, weather-proof, immersive training"
    ],
    programs: [
      { name: "VR Basic Experience", desc: "Introduction to VR technology, basic stance adjustment, and facing medium-pace deliveries in a virtual environment." },
      { name: "Pro Match Simulation", desc: "Face specific bowling styles (left-arm pace, leg-spin, off-spin) and practice reading the bowler's hand and release points." }
    ]
  },
  {
    id: "badminton-outdoor",
    title: "Badminton Outdoor",
    img: "/images/placeholder.png",
    tagline: "High-Energy Outdoor Badminton Action",
    description: "Experience the thrill of outdoor badminton at Zenithh Sports Arena. Specifically designed for all-weather recreational and competitive play, our outdoor badminton courts offer an exhilarating environment to improve fitness, agility, and racquet skills under the open sky.",
    features: [
      "Premium outdoor all-weather surfaces",
      "Professional lighting for evening play",
      "Singles and doubles court configurations",
      "Improves agility, reflexes, and cardiovascular health",
      "Available for casual booking and structured coaching",
      "Open ventilation and natural environment training",
      "Perfect for early morning and evening fitness routines"
    ],
    programs: [
      { name: "Recreational Play", desc: "Court bookings for friends and families looking to enjoy casual games in an energetic outdoor setting." },
      { name: "Foundational Coaching", desc: "Focuses on grip, footwork, basic clears, drops, and serves to build a strong badminton foundation." }
    ]
  }
];

export default function SportsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-primary selection:text-[var(--text-inverse)]">

      {/* ═══ PAGE HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-grain">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" 
            src="/images/placeholder.png" 
            alt="Zenithh Sports Arena" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(var(--hero-brightness))' }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, translateY: "10px" }} 
            animate={{ opacity: 1, translateY: 0 }} 
            className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] block mb-6"
          >
            THE ZENITHH ACADEMY
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, translateY: "20px" }} 
            animate={{ opacity: 1, translateY: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-4xl md:text-5xl font-black uppercase text-white mb-8"
          >
            OUR <span className="text-primary italic">DISCIPLINES</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, translateY: "20px" }} 
            animate={{ opacity: 1, translateY: 0 }} 
            transition={{ delay: 0.2 }} 
            className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            9 Disciplines · Professional Coaching · World-Class Infrastructure. Explore our high-performance training programs in Hyderabad.
          </motion.p>
        </div>
      </section>

      {/* ═══ SPORTS GRID OVERVIEW ═══ */}
      <section className="py-32 bg-[var(--bg-primary)] relative border-y border-[var(--border-light)]">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-24">
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-black uppercase mb-6 text-[var(--text-primary)]">
              SELECT YOUR <span className="text-primary italic">ARENA</span>
            </motion.h2>
            <div className="w-20 h-[2px] bg-primary mx-auto mb-8" />
            <motion.p variants={fadeIn} className="text-muted max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Discover our comprehensive range of programs, each designed to push athletic boundaries and build championship character.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-[1400px] mx-auto">
            {SPORTS.map((sport, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/sports/${sport.id}`}
                  className="premium-image-hover group relative aspect-square overflow-hidden cursor-pointer border border-[var(--border-light)] transition-all duration-500 block hover:border-primary/50"
                >
                  <img loading="lazy" src={sport.img} alt={sport.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.png'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-[var(--text-primary)] font-black uppercase text-xs md:text-sm tracking-[0.2em] group-hover:text-primary transition-colors leading-tight">{sport.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INDIVIDUAL SPORT SECTIONS ═══ */}
      {SPORTS.map((sport, i) => (
        <section
          key={i}
          id={sport.id}
          className={`py-32 relative overflow-hidden ${i % 2 === 0 ? "bg-[var(--bg-primary)]" : "bg-[var(--bg-secondary)]"}`}
        >
        <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-20 items-start`}
            >
              {/* IMAGE & PROGRAMS */}
              <motion.div variants={fadeIn} className="w-full lg:w-1/2 flex-shrink-0">
                <div className="premium-image-hover relative overflow-hidden border border-[var(--border-medium)] aspect-[4/3] group mb-6 lg:mb-12">
                  <img
                    src={sport.img}
                    alt={sport.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/placeholder.png'; }}
                  />
                  <div className="absolute top-6 left-6 bg-primary text-[var(--text-inverse)] text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2">
                    {sport.title}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted mb-6">Structured Programs</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {sport.programs.map((prog, pi) => (
                      <div key={pi} className="p-5 sm:p-6 bg-[var(--bg-secondary)] border border-[var(--border-light)] hover:border-primary/20 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="w-1.5 h-1.5 bg-primary rotate-45 flex-shrink-0" />
                          <h5 className="font-black text-xs text-[var(--text-primary)] uppercase tracking-widest">{prog.name}</h5>
                        </div>
                        <p className="text-muted text-sm leading-relaxed font-light">{prog.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* CONTENT */}
              <div className="flex-1">
                <motion.span variants={fadeIn} className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] block mb-6">
                  DISCIPLINE OVERVIEW
                </motion.span>
                <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-black uppercase mb-4 lg:mb-8 text-[var(--text-primary)] leading-tight">
                  {sport.tagline}
                </motion.h2>
                <div className="w-16 h-[2px] bg-primary mb-6 lg:mb-10" />
                <motion.p variants={fadeIn} className="text-muted text-lg leading-relaxed mb-6 lg:mb-12 font-light">
                  {sport.description}
                </motion.p>

                <motion.div variants={fadeIn} className="mb-6 lg:mb-12">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted mb-4 lg:mb-8">Discipline Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    {sport.features.map((feat, fi) => (
                      <div key={fi} className="flex items-start gap-4 group">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                        <span className="text-[var(--text-muted)] text-sm font-medium group-hover:text-[var(--text-primary)] transition-colors">{feat}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="mt-8 lg:mt-16 flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <Link
                    to={`/sports/${sport.id}`}
                    className="btn-secondary"
                  >
                    VIEW DETAILS
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-primary"
                  >
                    REGISTER NOW
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* FAQ — full-width below the two-column layout */}
            {SPORTS_FAQS[sport.id] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-20"
              >
                <FAQSection 
                  faqs={SPORTS_FAQS[sport.id]} 
                  sportName={sport.title}
                />
              </motion.div>
            )}
          </div>
        </section>
      ))}

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-32 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-grain opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[var(--color-gold-bright)]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-7xl font-black uppercase text-[var(--text-inverse)] mb-8 leading-[1.1] tracking-widest">
            READY TO START YOUR <br /> CAMPUS ATHLETICS JOURNEY?
          </h2>
          <p className="text-[var(--text-inverse)]/60 text-lg mb-12 max-w-2xl mx-auto font-medium">
            Join Zenithh Sports Arena today — Hyderabad's premier multi-sport training facility for schools, colleges, and serious athletes.
          </p>
          <Link to="/contact" className="btn-highlight">
            BOOK A TRIAL
          </Link>
        </div>
      </section>
    </div>
  );
}
