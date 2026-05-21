import React, { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Trophy,
  Target,
  Zap,
  Dumbbell,
  Award,
  BookOpen,
  Sparkles,
  Compass,
  ChevronRight,
  ShieldCheck,
  Star
} from "lucide-react";

/**
 * MSK PRASAD / IGNITE INTERNATIONAL CRICKET ACADEMY
 * A premium sports academy page with black + gold theme.
 */
const MSKAcademy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "circOut"
      }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-primary selection:text-[var(--text-inverse)]">

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/images/msk_hero.png"
            alt="Cricket Background"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(var(--hero-brightness))' }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-6xl font-black uppercase tracking-[0.04em] text-white drop-shadow-lg mb-6 leading-[1.25]"
          >
            MSK PRASAD / <br className="hidden md:block" />
            <span className="text-[var(--color-gold-primary)] drop-shadow-md">IGNITE INTERNATIONAL</span> <br className="hidden md:block" />
            CRICKET ACADEMY
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[var(--color-gold-primary)] text-lg md:text-2xl font-bold uppercase tracking-[0.25em] mb-6 leading-[1.5] drop-shadow-md"
          >
            Building Champions. Shaping Futures.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-12 font-medium leading-[1.9] tracking-wide drop-shadow-md"
          >
            Where sports and education come together to create future-ready athletes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScxSW3CxICNVxvRtKCAJnJFk1FDjap4rkQ9vcBOS_fo0JJ9Gg/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-gold-primary)] text-black px-10 py-4 font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              Join Now
            </a>
            <Link to="/contact" className="border-2 border-[var(--color-gold-primary)] text-[var(--color-gold-primary)] px-10 py-4 font-black uppercase tracking-widest hover:bg-[var(--color-gold-primary)] hover:text-black transition-all transform hover:scale-105 active:scale-95">
              Enquire Today
            </Link>
          </motion.div>
        </div>

        {/* Decorative Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-gold-primary)] to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ═══ PART 3: INTRODUCTION SECTION ═══ */}
      <section className="py-20 md:py-24 px-6 bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="w-full md:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase text-[var(--text-primary)] mb-3 leading-[1.25] tracking-[0.04em]">
                About the <span className="text-[var(--color-gold-primary)]">Academy</span>
              </h2>
              <div className="w-20 h-1 bg-[var(--color-gold-primary)] mb-8" />

              <p>
                MSK PRASAD & ZENITHH SPORTS ARENA  follows the vision of <span className="text-[var(--color-gold-primary)] font-bold uppercase tracking-wide">"Building Champions. Shaping Futures."</span> It is a place where sports and education come together to help students grow in both their careers and personal life.
              </p>
              <p>
                The athletics program is led by <span className="text-[var(--text-primary)] font-bold">Nagpuri Ramesh</span>, a Dronacharya Awardee and National Athletics Coach. He is a mentor and motivator who helps young athletes improve their skills and build confidence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-[var(--color-gold-primary)]/20 rounded-none blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative overflow-hidden border border-[var(--color-gold-primary)]/30">
                  <img
                    src="/images/msk_training.png"
                    alt="Athlete Training"
                    className="w-full h-[300px] md:h-[450px] object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ PART 4: CRICKET PROGRAM SECTION ═══ */}
      <section className="py-28 bg-[var(--bg-secondary)] border-y border-[var(--border-light)]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="relative">
            <div className="absolute inset-0 border-2 border-[var(--color-gold-primary)]/40 pointer-events-none -m-4 md:-m-12 md:rounded-none opacity-20"></div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="w-full md:w-1/2"
              >
                <h2 className="text-4xl md:text-5xl font-black uppercase text-[var(--text-primary)] mb-3 leading-[1.25] tracking-[0.04em]">
                  Cricket <span className="text-[var(--color-gold-primary)]">Program</span>
                </h2>
                <div className="w-20 h-1 bg-[var(--color-gold-primary)] mb-8" />

                <div className="text-[var(--text-muted)] text-lg leading-[1.9] tracking-wide mb-8">
                  <p>
                    The cricket program is headed by <span className="text-[var(--text-primary)] font-bold uppercase tracking-wider">MSK Prasad</span>, a former Indian cricketer and former Chief Selector of BCCI. Students receive expert guidance, professional training, and the support needed to achieve high performance.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[var(--color-gold-primary)]">
                  <ShieldCheck className="w-8 h-8" />
                  <span className="text-sm font-black uppercase tracking-[0.2em]">Professional Pathway</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[var(--color-gold-primary)]/5 animate-pulse-slow blur-2xl"></div>
                  <div className="relative overflow-hidden border-b-2 border-r-2 border-[var(--color-gold-primary)] shadow-[20px_20px_0px_rgba(212,175,55,0.05)]">
                    <img
                      src="/images/msk_cricket_academy.png"
                      alt="Cricket Action"
                      className="w-full h-[300px] md:h-[450px] object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PART 5: VISION SECTION ═══ */}
      <section className="py-28 bg-[var(--bg-primary)] relative">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase text-[var(--color-gold-primary)] mb-6 tracking-[0.06em] leading-[1.3]">
              Our Vision
            </h2>
            <div className="w-24 h-[1px] bg-[var(--color-gold-primary)] mx-auto mb-10" />

            <p className="text-xl md:text-2xl text-[var(--text-primary)] opacity-90 font-light leading-[1.9] tracking-wide">
              The vision of the academy is to create a world-class environment that supports both sports excellence and strong academic learning. The goal is to build a bright future for every student.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ PART 6: WHAT WE OFFER ═══ */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase text-[var(--text-primary)] mb-2 tracking-[0.04em] leading-[1.25]">
              What We <span className="text-[var(--color-gold-primary)]">Offer</span>
            </h2>
            <div className="w-20 h-1 bg-[var(--color-gold-primary)] mx-auto" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Athletics Training",
                desc: "Specialized training in Track & Field events for speed and endurance.",
                icon: <Zap className="w-8 h-8" />
              },
              {
                title: "Professional Cricket Coaching",
                desc: "Expert guidance in Batting, Bowling, Fielding & Fitness.",
                icon: <Award className="w-8 h-8" />
              },
              {
                title: "Academic Excellence Programs",
                desc: "Balanced curriculum to ensure strong educational foundations.",
                icon: <BookOpen className="w-8 h-8" />
              },
              {
                title: "Strength & Conditioning",
                desc: "Scientific approach to building power and injury prevention.",
                icon: <Dumbbell className="w-8 h-8" />
              },
              {
                title: "Personality Development",
                desc: "Building confidence, discipline, and leadership skills.",
                icon: <Sparkles className="w-8 h-8" />
              },
              {
                title: "Mentorship & Career Guidance",
                desc: "Official pathways and counseling for long-term athletic success.",
                icon: <Compass className="w-8 h-8" />
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-[var(--bg-card)] border border-[var(--color-gold-primary)]/20 p-6 sm:p-8 hover:border-[var(--color-gold-primary)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.1)] transition-all duration-500 group transform hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-gold-primary)]/5 rounded-bl-full transform translate-x-12 -translate-y-12 transition-all group-hover:bg-[var(--color-gold-primary)]/10"></div>

                <div className="text-[var(--color-gold-primary)] mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black uppercase text-[var(--text-primary)] mb-4 tracking-wider leading-tight">
                  {item.title}
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-[1.8]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PART 7: WHY CHOOSE US ═══ */}
      <section className="py-28 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="w-full md:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase text-[var(--text-primary)] mb-3 leading-[1.25] tracking-[0.04em]">
                Why Choose <span className="text-[var(--color-gold-primary)]">Us</span>
              </h2>
              <div className="w-20 h-1 bg-[var(--color-gold-primary)] mb-8" />

              <p className="text-[var(--text-muted)] text-lg leading-[1.9] tracking-wide mb-10">
                The academy provides world-class infrastructure, experienced coaches, and a safe and supportive environment. It follows a holistic approach to develop both skills and character.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {[
                  "Elite Sporting Infrastructure",
                  "Personalized Coaching by Dronacharya Awarded Coach",
                  "Holistic Skill Development",
                  "Secure & Supportive Environment"
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full border border-[var(--color-gold-primary)]/30 flex items-center justify-center text-[var(--color-gold-primary)] group-hover:bg-[var(--color-gold-primary)] group-hover:text-black transition-colors duration-300 flex-shrink-0">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                    <span className="text-[var(--text-primary)] font-bold uppercase tracking-widest text-sm">{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <div className="relative rounded-none overflow-hidden aspect-video border border-[var(--color-gold-primary)]/20 shadow-2xl">
                <img
                  src="/images/msk_facility.png"
                  alt="Academy Infrastructure"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
                  <div className="mt-auto">
                    <p className="text-[var(--color-gold-primary)] font-black uppercase tracking-[0.4em] text-xs mb-2">Infrastructure</p>
                    <h4 className="text-[var(--text-primary)] text-3xl font-black uppercase tracking-[0.02em]">Excellence in every detail</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ PART 8: REGISTRATIONS SECTION (High Priority CTA) ═══ */}
      <section className="py-24 bg-[var(--color-gold-primary)] relative overflow-hidden">
        {/* Background Patterns - Subtler theme-aware patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Star className="w-12 h-12 text-[var(--bg-primary)] mx-auto mb-6 animate-pulse" fill="var(--bg-primary)" />
            <h2 className="text-3xl md:text-7xl font-black uppercase text-[var(--bg-primary)] mb-6 tracking-[0.04em] leading-[1.1]">
              Registrations Open
            </h2>
            <p className="text-[var(--bg-primary)]/80 text-xl md:text-2xl font-bold max-w-2xl mx-auto mb-10 leading-tight">
              Registrations are open for young athletes and students. Join today and take the first step towards a successful future.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScxSW3CxICNVxvRtKCAJnJFk1FDjap4rkQ9vcBOS_fo0JJ9Gg/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary min-w-[200px]"
              >
                Apply Now
              </a>
              <Link to="/contact" className="btn-outline min-w-[200px] !border-black !text-black hover:!bg-black hover:!text-white">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* footer gap */}
      <div className="h-20 bg-[var(--bg-primary)]"></div>

    </div>
  );
};

export default MSKAcademy;
