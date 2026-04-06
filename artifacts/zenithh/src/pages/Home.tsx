import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  const onSubmit = (_values: z.infer<typeof formSchema>) => {
    toast({
      title: "Request Submitted",
      description: "Our team will contact you shortly to begin your journey.",
    });
    form.reset();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
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
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-primary selection:text-white">

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollTo("home"); }} className="text-2xl font-bold text-primary tracking-wider uppercase">
            ZENITHH
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6 text-sm font-medium text-gray-700">
              {NAV_LINKS.map((link) => (
                <button key={link} onClick={() => scrollTo(link)} className="hover:text-primary transition-colors uppercase tracking-wide">
                  {link}
                </button>
              ))}
            </div>
            <Button onClick={() => scrollTo("contact")} className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-none px-6">
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
            className="fixed inset-0 z-30 bg-white pt-24 px-6 flex flex-col gap-6 lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link)} className="text-2xl font-bold uppercase tracking-widest text-left text-gray-900 hover:text-primary transition-colors border-b border-gray-200 pb-4">
                {link}
              </button>
            ))}
            <Button onClick={() => scrollTo("contact")} className="bg-primary text-white font-bold uppercase text-lg py-6 mt-4">
              Join Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION — keep dark overlay on image for readability */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero.png" alt="Luxury Sports Stadium" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-start">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.span variants={fadeIn} className="text-primary font-bold tracking-[0.3em] uppercase mb-4 block text-sm md:text-base">
              Rise Beyond Limits
            </motion.span>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase leading-[1.1] mb-6 tracking-tight text-white">
              Elite <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-300">Performance</span><br/> Starts Here
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl font-light leading-relaxed">
              Experience world-class sports training, facilities, and athletic excellence designed for champions.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollTo("contact")} className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-none px-8 py-6 text-lg">
                Join Now
              </Button>
              <Button onClick={() => scrollTo("programs")} variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 font-bold uppercase tracking-wider rounded-none px-8 py-6 text-lg transition-all">
                Explore Programs
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="flex flex-col lg:flex-row gap-16 items-center"
          >
            <div className="flex-1">
              <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold uppercase mb-6 text-gray-900">
                About <span className="text-primary">Zenithh</span>
              </motion.h2>
              <motion.p variants={fadeIn} className="text-gray-500 text-lg leading-relaxed mb-8">
                We are not just a training center; we are an institution of excellence. ZENITHH shapes elite athletes by combining world-class coaching, cutting-edge infrastructure, and advanced sports science. Our commitment is singular: turning potential into undeniable power.
              </motion.p>
              <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: <Target className="text-primary w-8 h-8 mb-4" />, title: "Professional Coaching" },
                  { icon: <Activity className="text-primary w-8 h-8 mb-4" />, title: "Advanced Infrastructure" },
                  { icon: <TrendingUp className="text-primary w-8 h-8 mb-4" />, title: "Athlete Tracking" }
                ].map((feature, i) => (
                  <div key={i} className="p-6 bg-white border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all group cursor-default rounded-sm">
                    <div className="group-hover:scale-110 transition-transform duration-300 origin-left">{feature.icon}</div>
                    <h3 className="font-bold uppercase tracking-wide text-sm text-gray-800">{feature.title}</h3>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div variants={fadeIn} className="flex-1 relative">
              <div className="aspect-[4/5] relative bg-gray-100 border border-gray-200 p-2">
                <img src="/images/football.png" alt="Training" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section id="programs" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold uppercase mb-4 text-gray-900">Elite <span className="text-primary">Programs</span></motion.h2>
            <motion.p variants={fadeIn} className="text-gray-500 max-w-2xl mx-auto">Master your discipline with specialized training modules led by industry veterans.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((program, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden border border-gray-200 cursor-pointer rounded-sm shadow-sm hover:shadow-lg transition-shadow"
              >
                <img src={program.img} alt={program.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end transition-all duration-300 group-hover:bg-primary/10">
                  <h3 className="text-2xl font-bold uppercase mb-2 text-white group-hover:text-primary transition-colors">{program.title}</h3>
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
      <section id="facilities" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold uppercase mb-4 text-gray-900">World-Class <span className="text-primary">Facilities</span></motion.h2>
            <motion.p variants={fadeIn} className="text-gray-500 max-w-2xl mx-auto">Train in environments built to Olympic standards.</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
            {FACILITIES.map((facility, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative group overflow-hidden border border-gray-200 rounded-sm shadow-sm ${facility.span}`}
              >
                <img src={facility.img} alt={facility.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent pointer-events-none" />
                <h3 className="absolute bottom-6 left-6 text-xl font-bold uppercase tracking-wide text-white group-hover:text-primary transition-colors">
                  {facility.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COACHES SECTION */}
      <section id="coaches" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex justify-between items-end mb-16 border-b border-gray-200 pb-6">
            <div>
              <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold uppercase mb-4 text-gray-900">Expert <span className="text-primary">Coaches</span></motion.h2>
              <motion.p variants={fadeIn} className="text-gray-500">Guided by veterans. Forged by champions.</motion.p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-primary hover:text-primary/80 hover:bg-primary/5 uppercase tracking-wider group">
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
                className="group relative overflow-hidden rounded-t-full bg-gray-100 border border-gray-200 border-b-4 border-b-transparent hover:border-b-primary transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-md"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={coach.img} alt={coach.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0" />
                </div>
                <div className="p-6 text-center bg-gradient-to-t from-gray-900/80 to-transparent absolute bottom-0 w-full">
                  <h3 className="text-xl font-bold uppercase tracking-wide mb-1 text-white">{coach.name}</h3>
                  <p className="text-primary text-sm font-medium mb-1">{coach.role}</p>
                  <p className="text-gray-300 text-xs uppercase tracking-wider">{coach.exp} Experience</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section id="achievements" className="py-24 relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-fixed bg-center opacity-15" />
        <div className="absolute inset-0 bg-gray-900/85" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold uppercase text-white mb-4">
              Our <span className="text-primary">Achievements</span>
            </motion.h2>
          </motion.div>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {STATS.map((stat, i) => (
              <motion.div key={i} variants={fadeIn} className="text-center p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm">
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
      <section id="gallery" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold uppercase mb-4 text-gray-900">Moments of <span className="text-primary">Glory</span></motion.h2>
          </motion.div>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
            {GALLERY.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.1 }}
                className="relative group overflow-hidden break-inside-avoid border border-gray-200 rounded-sm shadow-sm"
              >
                <img src={img} alt={`Gallery ${i}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 bg-white relative">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-4xl mx-auto text-center">
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold uppercase mb-16 text-gray-900">Champion <span className="text-primary">Stories</span></motion.h2>
            
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
                  <p className="text-2xl md:text-3xl lg:text-4xl font-light italic leading-tight mb-10 text-gray-700">
                    "{TESTIMONIALS[activeTestimonial].text}"
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-1 bg-primary mb-4" />
                    <h4 className="font-bold uppercase text-lg tracking-wide text-gray-900">{TESTIMONIALS[activeTestimonial].author}</h4>
                    <p className="text-gray-400 uppercase text-sm tracking-widest">{TESTIMONIALS[activeTestimonial].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-4 mt-16">
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all text-gray-600"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all text-gray-600"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-[url('/images/facility-indoor.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 to-secondary/80" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white">
              Start Your Champion <br/>Journey Today
            </h2>
            <Button onClick={() => scrollTo("contact")} className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-none px-10 py-8 text-xl">
              Join Zenithh Now
            </Button>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6 text-gray-900">Connect With <span className="text-primary">Greatness</span></h2>
              <p className="text-gray-500 mb-12 max-w-md">Ready to elevate your game? Drop us a message and our performance directors will be in touch to discuss your athletic future.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center shrink-0 border border-primary/20">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wide text-sm mb-1 text-gray-700">Location</h4>
                    <p className="text-gray-500">ZENITHH Sports Arena, Champions Boulevard, Elite City — 400001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center shrink-0 border border-primary/20">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wide text-sm mb-1 text-gray-700">Contact</h4>
                    <p className="text-gray-500">+91 98765 43210<br/>info@zenithh.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-8 border border-gray-200 rounded-sm shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs tracking-wider text-gray-500">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-gray-50 border-gray-300 focus-visible:ring-primary focus-visible:border-primary text-gray-900 rounded-sm h-12" {...field} />
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
                          <FormLabel className="uppercase text-xs tracking-wider text-gray-500">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="bg-gray-50 border-gray-300 focus-visible:ring-primary focus-visible:border-primary text-gray-900 rounded-sm h-12" {...field} />
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
                          <FormLabel className="uppercase text-xs tracking-wider text-gray-500">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 234 567 8900" className="bg-gray-50 border-gray-300 focus-visible:ring-primary focus-visible:border-primary text-gray-900 rounded-sm h-12" {...field} />
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
                          <FormLabel className="uppercase text-xs tracking-wider text-gray-500">Sport Interest</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-50 border-gray-300 focus:ring-primary text-gray-900 rounded-sm h-12">
                                <SelectValue placeholder="Select a program" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-gray-200 text-gray-900 rounded-sm">
                              {PROGRAMS.map((p) => (
                                <SelectItem key={p.title} value={p.title} className="focus:bg-primary focus:text-white cursor-pointer">{p.title}</SelectItem>
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
                        <FormLabel className="uppercase text-xs tracking-wider text-gray-500">Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your current level and goals..." 
                            className="bg-gray-50 border-gray-300 focus-visible:ring-primary focus-visible:border-primary text-gray-900 rounded-sm min-h-[120px] resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-secondary" />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-none h-14 text-lg">
                    Submit Request
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 py-16 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-bold text-primary tracking-wider uppercase mb-6">ZENITHH</div>
              <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
                The ultimate destination for elite sports training. We build champions through discipline, science, and world-class infrastructure.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
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
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2026 ZENITHH | All Rights Reserved.</p>
            <p className="text-gray-500 text-sm tracking-widest uppercase font-bold">Designed by <span className="text-primary">AS KREATIV</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
