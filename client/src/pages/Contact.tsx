import React from "react";
import { motion, Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const SPORTS_LIST = [
  "Cricket",
  "Pickleball",
  "Volleyball",
  "Chess",
  "Zumba",
  "Table Tennis",
  "Foosball",
  "Carrom",
  "Astro Air Hockey Arcade",
  "Multi-Sport / Institutional Enquiry",
  "Facility Tour / Event Hosting",
  "Other"
];

const REGISTRATION_TYPES = [
  "Individual Training Enrollment",
  "School / College Partnership",
  "Corporate Sports Program",
  "Tournament / Event Hosting",
  "Facility Booking",
  "Coaching Career Registration"
];

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().trim().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number is required"),
    sport: z.string().min(1, "Please select a sport/program"),
    enquiryType: z.string().min(1, "Please select an enquiry type"),
    institution: z.string().optional(),
    preferredTiming: z.string().optional(),
    attendanceType: z.string().min(1, "Please select attendance type"),
    numberOfAttendees: z.string().optional(),
    friendReferral: z.string().optional(),
    referralMobile: z.string().optional(),
    referralEmail: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters")
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      name: "", email: "", phone: "", sport: "", enquiryType: "", institution: "", 
      preferredTiming: "", attendanceType: "Individual", numberOfAttendees: "", 
      friendReferral: "No", referralMobile: "", referralEmail: "", message: "" 
    }
  });

  const attendanceType = form.watch("attendanceType");
  const friendReferral = form.watch("friendReferral");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit registration');
      }

      toast({
        title: "✅ Registration Submitted Successfully",
        description: "Our team at Zenithh Sports Arena will contact you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "❌ Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-primary selection:text-[var(--text-inverse)]">

      {/* ═══ PAGE HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-grain">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" 
            src="/images/about-arena.jpg" 
            alt="Contact Zenithh" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(var(--hero-brightness))' }}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/about-arena.jpg'; }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, translateY: "10px" }} 
            animate={{ opacity: 1, translateY: 0 }} 
            className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] block mb-6"
          >
            JOIN THE ARENA
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, translateY: "20px" }} 
            animate={{ opacity: 1, translateY: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-3xl md:text-5xl font-black uppercase text-white mb-8"
          >
            REGISTER <span className="text-primary italic">NOW</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, translateY: "20px" }} 
            animate={{ opacity: 1, translateY: 0 }} 
            transition={{ delay: 0.2 }} 
            className="text-white/80 text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Start Your High-Performance Journey Today. Professional Training Awaits.
          </motion.p>
        </div>
      </section>

      {/* ═══ CONTACT SECTION ═══ */}
      <section className="py-24 bg-[var(--bg-primary)] border-t border-[var(--border-light)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

            {/* LEFT — INFO */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="lg:col-span-2 flex flex-col pt-4"
            >
              <motion.span variants={fadeIn} className="text-primary font-bold tracking-[0.5em] uppercase text-[10px] block mb-8">CONTACT DETAILS</motion.span>
              <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-black uppercase mb-10 text-[var(--text-primary)] leading-tight">
                START YOUR <span className="text-primary italic">STORY</span> <br /> AT ZENITHH
              </motion.h2>
              <div className="w-16 h-[2px] bg-primary mb-12" />
              
              <div className="space-y-8 mb-16">
                {[
                  { 
                    icon: <MapPin className="scale-125 transition-transform group-hover:scale-150" />, 
                    label: "LOCATION", 
                    value: (
                      <a href="https://maps.app.goo.gl/2KYR4nake6HgAnwL8" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        Zenithh Sports Arena, Hyderabad, India
                      </a>
                    )
                  },
                  { 
                    icon: <Phone className="scale-125 transition-transform group-hover:scale-150" />, 
                    label: "DIRECT LINE", 
                    value: (
                      <div className="flex flex-col gap-1">
                        <a href="tel:+919281472882" className="hover:text-primary transition-colors">
                          +91 92814 72882
                        </a>
                        <a href="tel:+917997171607" className="hover:text-primary transition-colors">
                          +91 79971 71607
                        </a>
                      </div>
                    )
                  },
                  { icon: <Mail className="scale-125 transition-transform group-hover:scale-150" />, label: "ENQUIRIES", value: "info@zenithh.in" },
                  { 
                    icon: <Clock className="scale-125 transition-transform group-hover:scale-150" />, 
                    label: "ARENA HOURS", 
                    value: (
                      <div>
                        <p>Morning: 7:00 AM – 10:00 AM</p>
                        <p>Evening: 5:00 PM – 8:00 PM</p>
                        <p className="text-[10px] text-primary opacity-60 mt-1 uppercase tracking-widest font-black">* Timings will be changed according to the season</p>
                      </div>
                    )
                  }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeIn} className="flex items-start gap-4 sm:gap-8 group">
                    <div className="w-14 h-14 bg-[var(--bg-secondary)] border border-[var(--border-light)] flex items-center justify-center flex-shrink-0 group-hover:border-primary/40 transition-all duration-300 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-black uppercase text-[10px] tracking-[0.4em] text-muted mb-2 group-hover:text-primary transition-colors">{item.label}</p>
                      <p className="text-[var(--text-primary)] text-sm font-medium tracking-wide">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* NEXT STEPS */}
              <div className="bg-[var(--bg-secondary)] p-6 md:p-10 border border-[var(--border-light)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-gold-primary)]/5 rounded-full" />
                <h4 className="font-black uppercase text-[10px] tracking-[0.4em] text-[var(--text-primary)] mb-8">WHAT HAPPENS NEXT?</h4>
                <div className="space-y-6">
                  {[
                    "Response within 24 operational hours",
                    "Schedule a facility tour or free trial",
                    "Customized program recommendation",
                    "Onboarding into the Zenithh ecosystem"
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <CheckCircle className="w-5 h-5 text-[var(--color-gold-primary)] opacity-40 flex-shrink-0 mt-0.5" />
                      <span className="text-muted text-xs uppercase tracking-widest font-bold">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT — FORM */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-[var(--bg-secondary)] border border-[var(--border-light)] p-6 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-primary/20 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
              
              <h3 className="text-2xl font-black uppercase tracking-widest text-[var(--text-primary)] mb-2">SEND ENQUIRY</h3>
              <p className="text-muted text-sm mb-12 font-light">Fill in the form below and our sports specialists will get back to you shortly.</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-[0.3em] text-muted font-black">Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" className="bg-[var(--bg-secondary)] border-[var(--border-medium)] focus-visible:ring-primary/40 focus-visible:border-primary text-[var(--text-primary)] h-14 rounded-none transition-all placeholder:text-[var(--text-muted)] font-light" {...field} />
                          </FormControl>
                          <FormMessage className="text-primary text-[10px] uppercase font-bold" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-[0.3em] text-muted font-black">Phone *</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 92814 72882" className="bg-[var(--bg-secondary)] border-[var(--border-medium)] focus-visible:ring-primary/40 focus-visible:border-primary text-[var(--text-primary)] h-14 rounded-none transition-all placeholder:text-[var(--text-muted)] font-light" {...field} />
                          </FormControl>
                          <FormMessage className="text-primary text-[10px] uppercase font-bold" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-[10px] tracking-[0.3em] text-muted font-black">Email *</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" className="bg-[var(--bg-secondary)] border-[var(--border-medium)] focus-visible:ring-primary/40 focus-visible:border-primary text-[var(--text-primary)] h-14 rounded-none transition-all placeholder:text-[var(--text-muted)] font-light" {...field} />
                        </FormControl>
                        <FormMessage className="text-primary text-[10px] uppercase font-bold" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-[0.3em] text-muted font-black">Institution (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Oakridge International" className="bg-[var(--bg-secondary)] border-[var(--border-medium)] focus-visible:ring-primary/40 focus-visible:border-primary text-[var(--text-primary)] h-14 rounded-none transition-all placeholder:text-[var(--text-muted)] font-light" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preferredTiming"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-[0.3em] text-muted font-black">Preferred Timing</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[var(--bg-secondary)] border-[var(--border-medium)] focus:ring-primary/40 text-[var(--text-primary)] h-14 rounded-none">
                                <SelectValue placeholder="Select Timing" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[var(--bg-secondary)] border-[var(--border-medium)] text-[var(--text-primary)] rounded-none">
                              <SelectItem value="7:00 AM - 10:00 AM" className="focus:bg-[var(--bg-secondary)] focus:text-primary cursor-pointer uppercase text-[10px] tracking-widest py-3">7:00 AM - 10:00 AM</SelectItem>
                              <SelectItem value="5:00 PM - 8:00 PM" className="focus:bg-[var(--bg-secondary)] focus:text-primary cursor-pointer uppercase text-[10px] tracking-widest py-3">5:00 PM - 8:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="sport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-[0.3em] text-muted font-black">Discipline *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[var(--bg-secondary)] border-[var(--border-medium)] focus:ring-primary/40 text-[var(--text-primary)] h-14 rounded-none">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[var(--bg-secondary)] border-[var(--border-medium)] text-[var(--text-primary)] rounded-none">
                              {SPORTS_LIST.map((s) => (
                                <SelectItem key={s} value={s} className="focus:bg-[var(--bg-secondary)] focus:text-primary cursor-pointer uppercase text-[10px] tracking-widest py-3">{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="enquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-[0.3em] text-muted font-black">Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[var(--bg-secondary)] border-[var(--border-medium)] focus:ring-primary/40 text-[var(--text-primary)] h-14 rounded-none">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[var(--bg-secondary)] border-[var(--border-medium)] text-[var(--text-primary)] rounded-none">
                              {REGISTRATION_TYPES.map((t) => (
                                <SelectItem key={t} value={t} className="focus:bg-[var(--bg-secondary)] focus:text-primary cursor-pointer uppercase text-[10px] tracking-widest py-3">{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="attendanceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-[0.3em] text-muted font-black">Attendance Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[var(--bg-secondary)] border-[var(--border-medium)] focus:ring-primary/40 text-[var(--text-primary)] h-14 rounded-none">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[var(--bg-secondary)] border-[var(--border-medium)] text-[var(--text-primary)] rounded-none">
                              <SelectItem value="Individual" className="focus:bg-[var(--bg-secondary)] focus:text-primary cursor-pointer uppercase text-[10px] tracking-widest py-3">Individual</SelectItem>
                              <SelectItem value="Team" className="focus:bg-[var(--bg-secondary)] focus:text-primary cursor-pointer uppercase text-[10px] tracking-widest py-3">Team</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    {attendanceType === "Team" && (
                      <FormField
                        control={form.control}
                        name="numberOfAttendees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase text-[10px] tracking-[0.3em] text-muted font-black">Number of People</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g. 5" className="bg-[var(--bg-secondary)] border-[var(--border-medium)] focus-visible:ring-primary/40 focus-visible:border-primary text-[var(--text-primary)] h-14 rounded-none transition-all placeholder:text-[var(--text-muted)] font-light" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    <FormField
                      control={form.control}
                      name="friendReferral"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-[10px] tracking-[0.3em] text-muted font-black">Refer a Friend?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-[var(--bg-secondary)] border-[var(--border-medium)] focus:ring-primary/40 text-[var(--text-primary)] h-14 rounded-none">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[var(--bg-secondary)] border-[var(--border-medium)] text-[var(--text-primary)] rounded-none">
                              <SelectItem value="No" className="focus:bg-[var(--bg-secondary)] focus:text-primary cursor-pointer uppercase text-[10px] tracking-widest py-3">No</SelectItem>
                              <SelectItem value="Yes" className="focus:bg-[var(--bg-secondary)] focus:text-primary cursor-pointer uppercase text-[10px] tracking-widest py-3">Yes</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  {friendReferral === "Yes" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[var(--bg-primary)] p-6 border border-[var(--border-light)]">
                      <FormField
                        control={form.control}
                        name="referralMobile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase text-[10px] tracking-[0.3em] text-muted font-black">Friend's Mobile</FormLabel>
                            <FormControl>
                              <Input placeholder="Friend's Mobile" className="bg-[var(--bg-secondary)] border-[var(--border-medium)] focus-visible:ring-primary/40 focus-visible:border-primary text-[var(--text-primary)] h-14 rounded-none transition-all placeholder:text-[var(--text-muted)] font-light" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="referralEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase text-[10px] tracking-[0.3em] text-muted font-black">Friend's Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Friend's Email" className="bg-[var(--bg-secondary)] border-[var(--border-medium)] focus-visible:ring-primary/40 focus-visible:border-primary text-[var(--text-primary)] h-14 rounded-none transition-all placeholder:text-[var(--text-muted)] font-light" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-[10px] tracking-[0.3em] text-muted font-black">Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your goals or requirements..."
                            className="bg-[var(--bg-secondary)] border-[var(--border-medium)] focus-visible:ring-primary/40 focus-visible:border-primary text-[var(--text-primary)] rounded-none min-h-[140px] resize-none transition-all placeholder:text-[var(--text-muted)] font-light"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-primary text-[10px] uppercase font-bold" />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-4"
                  >
                    {isSubmitting ? "TRANSMITTING..." : "SUBMIT REGISTRATION"}
                  </button>

                  <p className="text-[var(--text-muted)] text-[10px] text-center uppercase tracking-widest leading-relaxed">
                    By submitting, you agree to the Zenithh Arena communication policy. <br /> Private. Secure. Professional.
                  </p>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ PINNED HIGHLIGHTS ═══ */}
      <section className="bg-[var(--bg-primary)] py-24 border-y border-[var(--border-light)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: "🏏", title: "9 ELITE SPORTS", desc: "Complete multi-sport high-performance facility." },
              { icon: "🎓", title: "INSTITUTIONAL PARTNER", desc: "Trusted by leading schools and colleges in Hyderabad." },
              { icon: "⏰", title: "PEAK ACCESSIBILITY", desc: "Open 7-10 AM & 5-8 PM. Timings change per season." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">{item.icon}</div>
                <h3 className="font-black uppercase text-[var(--text-primary)] text-sm tracking-[0.3em] mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted text-[11px] uppercase tracking-widest leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VISUAL MAP SECTION ═══ */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="contact-map-section"
      >
        <div className="map-overlay-glow" />
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15221.166415516!2d78.3698806!3d17.4935981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb917637666687%3A0x6a043c2ae92f26b1!2sZenithh%20Sports%20Arena!5e0!3m2!1sen!2sin!4v1714722840000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Zenithh Sports Arena Location"
          ></iframe>
        </div>
      </motion.section>
    </div>
  );
}
