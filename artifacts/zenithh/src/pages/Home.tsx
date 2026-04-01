import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Menu, X, ArrowRight, Activity, TrendingUp, Target, Instagram, Twitter, Youtube, Facebook, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// --- ANIMATION VARIANTS ---
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- DATA ---
const NAV_LINKS = ["Home", "About", "Programs", "Facilities", "Coaches", "Achievements", "Gallery", "Contact"];

const PROGRAMS = [
  { title: "Football Training", desc: "Elite tactical and physical conditioning for the modern game.", img: "/images/football.png" },
  { title: "Cricket Academy", desc: "Professional batting, bowling, and fielding mastery.", img: "/images/cricket.png" },
  { title: "Basketball Training", desc: "High-intensity drills, shooting mechanics, and game IQ.", img: "/images/basketball.png" },
  { title: "Tennis Coaching", desc: "Precision technique and endurance building on court.", img: "/images/tennis.png" },
  { title: "Fitness & Conditioning", desc: "Science-backed strength and explosive power programs.", img: "/images/fitness.png" },
  { title: "Athletics Training", desc: "Sprint mechanics and endurance for track domination.", img: "/images/athletics.png" }
];

const FACILITIES = [
  { title: "Indoor Training Arena", img: "/images/facility-indoor.png", span: "md:col-span-2 md:row-span-2" },
  { title: "Outdoor Stadium", img: "/images/facility-outdoor.png", span: "md:col-span-1 md:row-span-1" },
  { title: "Fitness Gym", img: "/images/facility-gym.png", span: "md:col-span-1 md:row-span-1" },
  { title: "Recovery & Rehab Center", img: "/images/facility-recovery.png", span: "md:col-span-1 md:row-span-1" },
  { title: "Performance Lab", img: "/images/facility-lab.png", span: "md:col-span-1 md:row-span-1" }
];

const COACHES = [
  { name: "David Carter", role: "Head Football Coach", exp: "15+ Years", img: "/images/coach-david.png" },
  { name: "Maria Santos", role: "Cricket Performance Director", exp: "12+ Years", img: "/images/coach-maria.png" },
  { name: "James Okafor", role: "Basketball & Athletics Coach", exp: "10+ Years", img: "/images/coach-james.png" },
  { name: "Priya Mehta", role: "Fitness & Conditioning Expert", exp: "8+ Years", img: "/images/coach-priya.png" }
];

const STATS = [
  { value: 500, suffix: "+", label: "Athletes Trained" },
  { value: 50, suffix: "+", label: "Championships Won" },
  { value: 25, suffix: "+", label: "Pro Players Produced" },
  { value: 10, suffix: "+", label: "Years Excellence" }
];

const GALLERY = [
  "/images/gallery-1.png",
  "/images/gallery-2.png",
  "/images/gallery-3.png",
  "/images/gallery-4.png",
  "/images/football.png",
  "/images/cricket.png",
  "/images/basketball.png",
  "/images/athletics.png"
];

const TESTIMONIALS = [
  { text: "ZENITHH transformed my performance and helped me reach national-level competition.", author: "Rahul Sharma", role: "National Athlete" },
  { text: "The coaching here is unmatched. I went from amateur to professional within 2 years.", author: "Aisha Patel", role: "Professional Cricketer" },
  { text: "World-class facilities and expert guidance. ZENITHH is where champions are made.", author: "Marcus Thompson", role: "Basketball Pro" }
];

// --- COMPONENTS ---

const Counter = ({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) => {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [from, to, duration]);

  return <span>{count}</span>;
};

// --- MAIN PAGE ---

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number is required"),
    sport: z.string().min(1, "Please select a sport"),
    message: z.string().min(10, "Message must be at least 10 characters")
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", sport: "", message: "" }
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Request Submitted",
      description: "Our team will contact you shortly to begin your journey.",
      className: "bg-black border-primary text-primary"
    });
    form.reset();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-1 bg-primary absolute top-1/2 left-0 -translate-y-1/2"
        />
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-primary text-4xl md:text-6xl font-bold tracking-widest uppercase"
        >
          ZENITHH
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-primary selection:text-black">
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? "bg-black/95 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("home"); }} className="text-2xl font-bold text-primary tracking-wider uppercase flex items-center gap-2">
            ZENITHH
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6 text-sm font-medium text-gray-300">
              {NAV_LINKS.map((link) => (
                <button key={link} onClick={() => scrollTo(link)} className="hover:text-primary transition-colors uppercase tracking-wide">
                  {link}
                </button>
              ))}
            </div>
            <Button onClick={() => scrollTo("contact")} className="bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-wider rounded-none px-6">
              Join Now
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-black pt-24 px-6 flex flex-col gap-6 lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link)} className="text-2xl font-bold uppercase tracking-widest text-left hover:text-primary transition-colors border-b border-white/10 pb-4">
                {link}
              </button>
            ))}
            <Button onClick={() => scrollTo("contact")} className="bg-primary text-black font-bold uppercase text-lg py-6 mt-4">
              Join Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero.png" alt="Luxury Sports Stadium" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-start">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.span variants={fadeIn} className="text-primary font-bold tracking-[0.3em] uppercase mb-4 block text-sm md:text-base">
              Rise Beyond Limits
            </motion.span>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[1.1] mb-6 tracking-tight">
              Elite <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Performance</span><br/> Starts Here
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl font-light leading-relaxed">
              Experience world-class sports training, facilities, and athletic excellence designed for champions.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollTo("contact")} className="bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-wider rounded-none px-8 py-6 text-lg">
                Join Now
              </Button>
              <Button onClick={() => scrollTo("programs")} variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white font-bold uppercase tracking-wider rounded-none px-8 py-6 text-lg transition-all">
                Explore Programs
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="flex flex-col lg:flex-row gap-16 items-center"
          >
            <div className="flex-1">
              <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold uppercase mb-6">
                About <span className="text-primary">Zenithh</span>
              </motion.h2>
              <motion.p variants={fadeIn} className="text-gray-400 text-lg leading-relaxed mb-8">
                We are not just a training center; we are an institution of excellence. ZENITHH shapes elite athletes by combining world-class coaching, cutting-edge infrastructure, and advanced sports science. Our commitment is singular: turning potential into undeniable power.
              </motion.p>
              <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: <Target className="text-primary w-8 h-8 mb-4" />, title: "Professional Coaching" },
                  { icon: <Activity className="text-primary w-8 h-8 mb-4" />, title: "Advanced Infrastructure" },
                  { icon: <TrendingUp className="text-primary w-8 h-8 mb-4" />, title: "Athlete Tracking" }
                ].map((feature, i) => (
                  <div key={i} className="p-6 bg-black border border-white/5 hover:border-primary/50 transition-colors group cursor-default rounded-sm">
                    <div className="group-hover:scale-110 transition-transform duration-300 origin-left">{feature.icon}</div>
                    <h3 className="font-bold uppercase tracking-wide text-sm">{feature.title}</h3>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div variants={fadeIn} className="flex-1 relative">
              <div className="aspect-[4/5] relative bg-black/50 border border-white/10 p-2">
                <img src="/images/football.png" alt="Training" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section id="programs" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold uppercase mb-4">Elite <span className="text-primary">Programs</span></motion.h2>
            <motion.p variants={fadeIn} className="text-gray-400 max-w-2xl mx-auto">Master your discipline with specialized training modules led by industry veterans.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((program, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden border border-white/10 cursor-pointer rounded-sm"
              >
                <img src={program.img} alt={program.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end transition-all duration-300 group-hover:bg-primary/10">
                  <h3 className="text-2xl font-bold uppercase mb-2 group-hover:text-primary transition-colors">{program.title}</h3>
                  <p className="text-gray-300 text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {program.desc}
                  </p>
                  <ArrowRight className="absolute bottom-8 right-8 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES SECTION */}
      <section id="facilities" className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold uppercase mb-4">World-Class <span className="text-primary">Facilities</span></motion.h2>
            <motion.p variants={fadeIn} className="text-gray-400 max-w-2xl mx-auto">Train in environments built to Olympic standards.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
            {FACILITIES.map((facility, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative group overflow-hidden border border-white/5 rounded-sm ${facility.span}`}
              >
                <img src={facility.img} alt={facility.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                <h3 className="absolute bottom-6 left-6 text-xl font-bold uppercase tracking-wide group-hover:text-primary transition-colors">
                  {facility.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COACHES SECTION */}
      <section id="coaches" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
            <div>
              <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold uppercase mb-4">Expert <span className="text-primary">Coaches</span></motion.h2>
              <motion.p variants={fadeIn} className="text-gray-400">Guided by veterans. Forged by champions.</motion.p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-primary hover:text-white hover:bg-transparent uppercase tracking-wider group">
              View All <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COACHES.map((coach, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-t-full bg-[#111] border-b-4 border-transparent hover:border-primary transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={coach.img} alt={coach.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0" />
                </div>
                <div className="p-6 text-center bg-gradient-to-t from-black to-transparent absolute bottom-0 w-full">
                  <h3 className="text-xl font-bold uppercase tracking-wide mb-1">{coach.name}</h3>
                  <p className="text-primary text-sm font-medium mb-1">{coach.role}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{coach.exp} Experience</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section id="achievements" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-fixed bg-center opacity-20 filter grayscale" />
        <div className="absolute inset-0 bg-black/80" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {STATS.map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="text-center p-8 border border-white/5 bg-black/40 backdrop-blur-sm rounded-sm">
                <div className="text-5xl md:text-6xl font-extrabold text-primary mb-2 font-heading tracking-tighter">
                  <Counter from={0} to={stat.value} />{stat.suffix}
                </div>
                <div className="text-gray-300 uppercase tracking-widest text-sm font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold uppercase mb-4">Moments of <span className="text-primary">Glory</span></motion.h2>
          </motion.div>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
            {GALLERY.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.1 }}
                className="relative group overflow-hidden break-inside-avoid border border-white/10 rounded-sm"
              >
                <img src={img} alt={`Gallery ${i}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 bg-black relative">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto text-center">
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold uppercase mb-16">Champion <span className="text-primary">Stories</span></motion.h2>
            
            <div className="relative min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-primary fill-primary mx-1" />)}
                  </div>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-light italic leading-tight mb-10 text-gray-200">
                    "{TESTIMONIALS[activeTestimonial].text}"
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-1 bg-primary mb-4" />
                    <h4 className="font-bold uppercase text-lg tracking-wide">{TESTIMONIALS[activeTestimonial].author}</h4>
                    <p className="text-gray-500 uppercase text-sm tracking-widest">{TESTIMONIALS[activeTestimonial].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-4 mt-16">
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-[url('/images/facility-indoor.png')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
              Start Your Champion <br/>Journey Today
            </h2>
            <Button onClick={() => scrollTo("contact")} className="bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-wider rounded-none px-10 py-8 text-xl">
              Join Zenithh Now
            </Button>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6">Connect With <span className="text-primary">Greatness</span></h2>
              <p className="text-gray-400 mb-12 max-w-md">Ready to elevate your game? Drop us a message and our performance directors will be in touch to discuss your athletic future.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1a1a1a] rounded-sm flex items-center justify-center shrink-0 border border-white/5">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wide text-sm mb-1 text-gray-300">Location</h4>
                    <p className="text-gray-400">ZENITHH Sports Arena, Champions Boulevard, Elite City — 400001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1a1a1a] rounded-sm flex items-center justify-center shrink-0 border border-white/5">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wide text-sm mb-1 text-gray-300">Contact</h4>
                    <p className="text-gray-400">+91 98765 43210<br/>info@zenithh.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-black p-8 border border-white/10 rounded-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-[#111] border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white rounded-sm h-12" {...field} />
                          </FormControl>
                          <FormMessage className="text-secondary" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-[#111] border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white rounded-sm h-12" {...field} />
                          </FormControl>
                          <FormMessage className="text-secondary" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 234 567 8900" className="bg-[#111] border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white rounded-sm h-12" {...field} />
                          </FormControl>
                          <FormMessage className="text-secondary" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Sport Interest</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[#111] border-white/10 focus:ring-primary text-white rounded-sm h-12">
                                <SelectValue placeholder="Select a program" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#1a1a1a] border-white/10 text-white rounded-sm">
                              {PROGRAMS.map((p) => (
                                <SelectItem key={p.title} value={p.title} className="focus:bg-primary focus:text-black cursor-pointer">{p.title}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-secondary" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your current level and goals..." 
                            className="bg-[#111] border-white/10 focus-visible:ring-primary focus-visible:border-primary text-white rounded-sm min-h-[120px] resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-secondary" />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-wider rounded-none h-14 text-lg">
                    Submit Request
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-bold text-primary tracking-wider uppercase mb-6">ZENITHH</div>
              <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
                The ultimate destination for elite sports training. We build champions through discipline, science, and world-class infrastructure.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-wider text-sm mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {["About Us", "Our Coaches", "Facilities", "Achievements", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-wider text-sm mb-6 text-white">Programs</h4>
              <ul className="space-y-3">
                {["Football Training", "Cricket Academy", "Basketball Elite", "Tennis Pro", "Athletics"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2026 ZENITHH | All Rights Reserved.</p>
            <p className="text-gray-500 text-sm tracking-widest uppercase font-bold">Designed by <span className="text-primary">AS KREATIV</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
