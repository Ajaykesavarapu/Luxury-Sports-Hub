import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowLeft, CheckCircle, Clock, Users, ArrowRight } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import { SPORTS_FAQS } from "@/constants/faqs";

// In a real app, this might come from an API or a shared data file.
// We are hardcoding the rich details for each sport here.
const SPORT_DETAILS: Record<string, any> = {
  "cricket": {
    title: "Cricket",
    subtitle: "Premium Cricket Nets & Coaching",
    heroImage: "/images/cricket.png",
    description: "Experience world-class cricket training at Zenithh Sports Arena. Our facility features professional-grade nets, high-speed bowling machines, and expert coaching designed to refine your technique and elevate your game to the next level.",
    features: [
      "Professional-grade artificial turf pitches",
      "Automated high-speed bowling machines",
      "Video analysis for batting and bowling techniques",
      "Dedicated strength and conditioning for cricketers"
    ],
    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "BCCI Certified Level 2 Coaches",
    gallery: ["/images/cricket.png"]
  },
  "pickleball": {
    title: "Pickleball",
    subtitle: "Elite Pickleball Courts",
    heroImage: "/images/pickleball.jpg",
    description: "Join the fastest growing sport in the world on our premium pickleball courts. Whether you are a beginner looking to learn the basics or an advanced player seeking competitive matches, our courts offer the perfect environment.",
    features: [
      "Tournament-standard court dimensions and netting",
      "High-grip, shock-absorbing surface",
      "Equipment rental available (paddles and balls)",
      "Regular weekend tournaments and leagues"
    ],
    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "Professional Pickleball Instructors",
    gallery: ["/images/pickleball.jpg"]
  },
  "volleyball": {
    title: "Volleyball",
    subtitle: "Professional Volleyball Arena",
    heroImage: "/images/volleyball.jpg",
    description: "Spike, set, and serve in our state-of-the-art volleyball arena. Designed to international standards, our courts are perfect for rigorous training sessions, casual games, and competitive leagues.",
    features: [
      "FIVB standard net systems and antennas",
      "Premium synthetic flooring for injury prevention",
      "High-ceiling clearance for competitive play",
      "Specialized jump training equipment"
    ],
    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "National Level Volleyball Coaches",
    gallery: ["/images/volleyball.jpg"]
  },
  "chess": {
    title: "Chess",
    subtitle: "Strategic Chess Academy",
    heroImage: "/images/chess.jpg",
    description: "Sharpen your mind and master strategy at the Zenithh Chess Academy. We provide a quiet, focused environment with expert guidance to help players of all ages develop critical thinking and tactical brilliance.",
    features: [
      "FIDE standard chess boards and tournament clocks",
      "Quiet, distraction-free environment",
      "Tactical analysis and puzzle-solving sessions",
      "Regular internal rating tournaments"
    ],
    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "FIDE Rated Masters",
    gallery: ["/images/chess.jpg"]
  },
  "zumba": {
    title: "Zumba",
    subtitle: "Zumba & Fitness Studio",
    heroImage: "/images/zumba.jpg",
    description: "Dance your way to fitness in our high-energy Zumba studio. Our certified instructors combine Latin and international music with dance moves for an exhilarating, effective workout.",
    features: [
      "Spacious studio with sprung wooden flooring",
      "Premium sound system and acoustics",
      "Full-length wall mirrors",
      "High-energy, certified instructors"
    ],
    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "Certified Zumba Instructors",
    gallery: ["/images/zumba.jpg"]
  },
  "table-tennis": {
    title: "Table Tennis",
    subtitle: "Table Tennis Championship Hall",
    heroImage: "/images/table-tennis.jpg",
    description: "Experience lightning-fast rallies on our ITTF-approved table tennis setups. Perfect your spin, speed, and agility in our dedicated indoor championship hall.",
    features: [
      "ITTF approved competition tables",
      "Professional anti-glare lighting",
      "Robot ball feeders for solo practice",
      "Advanced multi-ball training sessions"
    ],
    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "State Level Table Tennis Champions",
    gallery: ["/images/table-tennis.jpg"]
  },
  "foosball": {
    title: "Foosball",
    subtitle: "Foosball & Gaming Lounge",
    heroImage: "/images/foosball.jpg",
    description: "Take a break or challenge your friends in our dedicated foosball and recreation lounge. Featuring tournament-grade tables, it's the perfect place to unwind and test your reflexes.",
    features: [
      "Tournament-grade ITSF approved tables",
      "Smooth rod action and precision players",
      "Comfortable lounge seating area",
      "Perfect for corporate events and team building"
    ],
    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "Recreational Supervisors",
    gallery: ["/images/foosball.jpg"]
  },
  "carrom": {
    title: "Carrom",
    subtitle: "Carrom Training Center",
    heroImage: "/images/carroms.jpg",
    description: "Master precision and focus at our specialized carrom center. Our smooth, championship-quality boards provide the ideal surface for players looking to perfect their striking techniques.",
    features: [
      "Championship quality smooth boards",
      "Proper overhead focused lighting",
      "Premium quality coins and strikers",
      "Quiet zone for maximum concentration"
    ],
    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "Experienced Carrom Professionals",
    gallery: ["/images/carroms.jpg"]
  },
  "air-hockey": {
    title: "Air Hockey",
    subtitle: "Arcade Zone - Air Hockey",
    heroImage: "/images/air-hockey.jpg",
    description: "Feel the rush of high-speed arcade action with our premium air hockey tables. Featuring powerful airflow and electronic scoring, it's an exciting addition to your recreational time at Zenithh.",
    features: [
      "Commercial-grade air hockey tables",
      "Powerful, consistent airflow",
      "Electronic score tracking",
      "High-energy arcade environment"
    ],
    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "Recreational Supervisors",
    gallery: ["/images/air-hockey.jpg"]
  },
  "vr-cricket": {
    title: "VR Cricket",
    subtitle: "Immersive Virtual Reality Cricket",
    heroImage: "/images/vr-cricket.png",
    description: "Step into the ultimate virtual reality cricket experience at Zenithh Sports Arena. Face international-level pacers and spinners in hyper-realistic stadiums using state-of-the-art VR technology. Perfect for honing your reflexes, shot selection, and match awareness in a fully controlled digital environment.",
    features: [
      "Hyper-realistic VR cricket simulation technology",
      "Face bowling speeds from 60kmph to 150kmph+",
      "Multiple international stadium environments",
      "Real-time shot analysis and impact feedback",
      "Progress tracking and reflex improvement",
      "Safe, weather-proof, immersive training"
    ],
    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "VR Training Specialists",
    gallery: ["/images/vr-cricket.png"]
  },
  "badminton-outdoor": {
    title: "Badminton Outdoor",
    subtitle: "High-Energy Outdoor Badminton",
    heroImage: "/images/badminton.png",
    description: "Experience the thrill of outdoor badminton at Zenithh Sports Arena. Specifically designed for all-weather recreational and competitive play, our outdoor badminton courts offer an exhilarating environment to improve fitness, agility, and racquet skills under the open sky.",
    features: [
      "Premium outdoor all-weather surfaces",
      "Professional lighting for evening play",
      "Singles and doubles court configurations",
      "Improves agility, reflexes, and cardiovascular health",
      "Available for casual booking and structured coaching",
      "Perfect for early morning and evening fitness routines"
    ],
    schedule: "Morning: 7 AM – 10 AM, Evening: 5 PM – 8 PM",
    coaches: "Certified Badminton Coaches",
    gallery: ["/images/badminton.png"]
  }
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function SportDetail() {
  const { sportId } = useParams<{ sportId: string }>();
  const navigate = useNavigate();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sportId]);

  if (!sportId || !SPORT_DETAILS[sportId]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)]">
        <h1 className="text-4xl font-bold uppercase text-[var(--text-primary)] mb-4">Sport Not Found</h1>
        <p className="text-[var(--text-muted)] mb-8">The program you are looking for doesn't exist or is currently unavailable.</p>
        <Link to="/sports" className="btn-primary">
          Back to All Sports
        </Link>
      </div>
    );
  }

  const sport = SPORT_DETAILS[sportId];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* ═══ HERO ═══ */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end pb-16 overflow-hidden pt-20">
        <div className="premium-image-hover absolute inset-0 z-0">
          <img
            src={sport.heroImage}
            alt={sport.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/about-arena.jpg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent z-10" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[var(--text-primary)]/80 hover:text-primary mb-8 transition-colors text-sm uppercase tracking-widest font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </motion.button>
          
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.span variants={fadeIn} className="text-primary font-bold tracking-[0.3em] uppercase text-sm block mb-3">
              {sport.subtitle}
            </motion.span>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-black uppercase text-[var(--text-primary)] tracking-tight mb-6">
              {sport.title}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left: Description & Features */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="flex-1"
            >
              <motion.h2 variants={fadeIn} className="text-3xl font-extrabold uppercase text-[var(--text-primary)] mb-6">
                About the Program
              </motion.h2>
              <motion.p variants={fadeIn} className="text-[var(--text-muted)] text-lg leading-relaxed mb-10">
                {sport.description}
              </motion.p>

              <motion.h3 variants={fadeIn} className="text-xl font-bold uppercase tracking-wide text-[var(--text-primary)] mb-6">
                Program Highlights
              </motion.h3>
              <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {sport.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-muted)] font-medium text-sm">{feature}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Info Card & Booking */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/3 flex-shrink-0"
            >
              <div className="bg-[var(--bg-secondary)] text-[var(--text-primary)] p-8 border border-[var(--border-light)] shadow-2xl sticky top-24">
                <h3 className="text-2xl font-bold uppercase tracking-wide mb-6">Program Details</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold mb-1">Timings</p>
                      <p className="text-sm font-medium">Morning: 7:00 AM – 10:00 AM</p>
                      <p className="text-sm font-medium">Evening: 5:00 PM – 8:00 PM</p>
                      <p className="text-[10px] text-primary opacity-60 mt-2 uppercase tracking-widest font-black leading-tight">* Timings will be changed according to the season</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold mb-1">Coaching</p>
                      <p className="text-sm font-medium">{sport.coaches}</p>
                    </div>
                  </div>
                </div>

                <Link to="/contact" className="btn-primary">
                  Enquire Now
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      {sport.gallery && sport.gallery.length > 0 && (
        <section className="py-20 bg-[var(--bg-secondary)] border-t border-[var(--border-light)]">
          <div className="container mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
              <motion.span variants={fadeIn} className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-3">Inside the Arena</motion.span>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-black uppercase text-[var(--text-primary)]">
                {sport.title} Gallery
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {sport.gallery.map((img: string, idx: number) => (
                <motion.div 
                  key={img}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="premium-image-hover aspect-square overflow-hidden bg-[var(--bg-primary)] group"
                >
                  <img loading="lazy" 
                    src={img} 
                    alt={`${sport.title} Gallery ${idx + 1}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/about-arena.jpg'; }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FAQ SECTION ═══ */}
      {SPORTS_FAQS[sportId] && (
        <FAQSection 
          faqs={SPORTS_FAQS[sportId]} 
          sportName={sport.title} 
        />
      )}

    </div>
  );
}
