import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageSquare, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  sportName?: string;
}

/**
 * FAQSection - A premium accordion-style FAQ component for sports pages.
 * Includes "Still Have Questions?" CTA and FAQPage Structured Data.
 */
const FAQSection: React.FC<FAQSectionProps> = ({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about training at Zenithh Sports Arena",
  faqs,
  sportName
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="w-full">
      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase text-[var(--text-primary)] mb-4 leading-tight">
            {title}
          </h2>
          <div className="w-20 h-1 bg-[var(--color-gold-primary)] mx-auto mb-6" />
          <p className="text-[var(--text-muted)] text-lg font-light max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-none border border-[var(--color-gold-primary)]/20 bg-[var(--bg-secondary)] transition-all duration-300 overflow-hidden hover:border-[var(--color-gold-primary)] ${activeIndex === index ? 'border-[var(--color-gold-primary)] shadow-[0_0_30px_rgba(212,175,55,0.05)]' : ''}`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-[var(--text-primary)] font-bold text-base md:text-lg pr-4 uppercase tracking-wide leading-tight">
                  {faq.q}
                </span>
                <div className="flex-shrink-0 text-[var(--color-gold-primary)] bg-[var(--color-gold-primary)]/5 p-2 rounded-none transition-colors">
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-[var(--border-light)]">
                      <p className="text-[var(--text-primary)] opacity-80 text-sm md:text-base leading-[1.8] font-light">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-10 bg-[var(--color-gold-primary)] text-black text-center relative overflow-hidden"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 tracking-tight">
              Still have questions? We’re here to help.
            </h3>
            <p className="text-black/80 font-bold mb-10 max-w-xl mx-auto uppercase text-xs tracking-widest">
              Our expert coaches and admissions team are ready to guide you towards your athletic goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/contact"
                className="btn-primary gap-3"
              >
                <MessageSquare size={18} /> Contact Us
              </Link>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScxSW3CxICNVxvRtKCAJnJFk1FDjap4rkQ9vcBOS_fo0JJ9Gg/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline !border-black !text-black hover:!bg-black hover:!text-white gap-3"
              >
                <UserPlus size={18} /> Register Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQSection;
