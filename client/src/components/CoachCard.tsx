import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Coach } from "@/data/coaches";

interface CoachCardProps {
  coach: Coach;
}

const CoachCard: React.FC<CoachCardProps> = ({ coach }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[var(--bg-secondary)] border border-[var(--border-light)] overflow-hidden transition-all duration-500 hover:-translate-y-2"
    >
      {/* Gold Top Border reveal */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-gold-primary)] translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-500 z-20" />
      
      <div className="premium-image-hover relative aspect-[3/4] overflow-hidden">
        <img
          src={coach.image}
          alt={coach.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent z-10" />
        
        <div className="absolute bottom-8 left-8 right-8 z-20">
          <div className="flex items-center gap-2 mb-2">
            {coach.expertise.slice(0, 2).map((exp, i) => (
              <span key={i} className="text-[var(--color-gold-primary)] font-bold text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 bg-[var(--color-gold-primary)]/10 backdrop-blur-md rounded-full">
                {exp}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-black uppercase text-[var(--text-primary)] leading-[1.15] mb-2 group-hover:text-[var(--color-gold-primary)] transition-colors">
            {coach.name}
          </h3>
          <p className="text-[var(--text-primary)]/40 text-[10px] font-bold uppercase tracking-[0.3em]">
            {coach.role}
          </p>
        </div>
      </div>

      <div className="p-8 pt-6">
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8 font-light line-clamp-3">
          {coach.shortSummary}
        </p>
        
        <div className="space-y-3 mb-8">
          {coach.highlights.slice(0, 2).map((highlight, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[var(--color-gold-primary)] rounded-full opacity-40 group-hover:opacity-100 transition-opacity" />
              <span className="text-[var(--text-primary)]/60 text-[10px] font-bold uppercase tracking-widest leading-tight">
                {highlight}
              </span>
            </div>
          ))}
        </div>

        <Link 
          to={`/coaches/${coach.id}`}
          className="inline-flex items-center gap-4 text-[var(--color-gold-primary)] font-black uppercase tracking-widest text-[11px] group/btn"
        >
          View Full Profile 
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CoachCard;
