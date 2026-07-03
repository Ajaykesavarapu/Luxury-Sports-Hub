import React, { useState } from "react";
import { X } from "lucide-react";

const GALLERY_IMAGES = [
  { src: "/images/volleyball.jpg", caption: "Professional Volleyball Arena", category: "Arena" },
  { src: "/images/gallery-volley-1.jpg", caption: "Volleyball Training Session", category: "Arena" },
  { src: "/images/gallery-volley-2.jpg", caption: "Volleyball Net Setup", category: "Arena" },
  { src: "/images/gallery-volley-3.jpg", caption: "Volleyball Court View", category: "Arena" },
  { src: "/images/gallery-volley-4.jpg", caption: "Volleyball Spiking Practice", category: "Arena" },
  { src: "/images/gallery-volley-5.jpg", caption: "Volleyball Serve Setup", category: "Arena" },
  { src: "/images/pickleball.jpg", caption: "Elite Pickleball Courts", category: "Racket Sports" },
  { src: "/images/gallery-pickle-1.jpg", caption: "Pickleball Academy", category: "Racket Sports" },
  { src: "/images/cricket.png", caption: "Premium Cricket Nets", category: "Cricket" },
  { src: "/images/table-tennis.jpg", caption: "Table Tennis Championship Hall", category: "Indoor Sports" },
  { src: "/images/gallery-tabletennis-1.jpg", caption: "Table Tennis Tables", category: "Indoor Sports" },
  { src: "/images/gallery-tabletennis-2.jpg", caption: "Table Tennis Racket & Ball", category: "Indoor Sports" },
  { src: "/images/gallery-tabletennis-3.jpg", caption: "Table Tennis Practice", category: "Indoor Sports" },
  { src: "/images/gallery-tabletennis-4.jpg", caption: "Table Tennis Match View", category: "Indoor Sports" },
  { src: "/images/chess.jpg", caption: "Strategic Chess Academy", category: "Indoor Sports" },
  { src: "/images/gallery-chess-1.jpg", caption: "Chess Board Setup", category: "Indoor Sports" },
  { src: "/images/foosball.jpg", caption: "Foosball & Gaming Lounge", category: "Recreation" },
  { src: "/images/gallery-foosball-1.jpg", caption: "Foosball Table Detail", category: "Recreation" },
  { src: "/images/gallery-foosball-2.jpg", caption: "Foosball Action Shot", category: "Recreation" },
  { src: "/images/gallery-foosball-3.jpg", caption: "Foosball Players", category: "Recreation" },
  { src: "/images/gallery-foosball-4.jpg", caption: "Foosball Setup", category: "Recreation" },
  { src: "/images/gallery-foosball-5.jpg", caption: "Foosball Match", category: "Recreation" },
  { src: "/images/carroms.jpg", caption: "Carrom Training Center", category: "Indoor Sports" },
  { src: "/images/gallery-carroms-1.jpg", caption: "Carrom Board Focus", category: "Indoor Sports" },
  { src: "/images/gallery-carroms-2.jpg", caption: "Carrom Coins Arrangement", category: "Indoor Sports" },
  { src: "/images/air-hockey.jpg", caption: "Arcade Zone - Air Hockey", category: "Recreation" },
  { src: "/images/gallery-airhockey-1.jpg", caption: "Air Hockey Puck & Striker", category: "Recreation" },
  { src: "/images/zumba.png", caption: "Zumba & Fitness Studio", category: "Indoor Sports" },
  { src: "/images/about-arena.jpg", caption: "Zenithh Infrastructure", category: "Arena" },
  { src: "/images/DLP03630.JPG", caption: "Bridge Course Visit 1", category: "Events" },
  { src: "/images/DLP03631.JPG", caption: "Bridge Course Visit 2", category: "Events" },
  { src: "/images/DLP03633.JPG", caption: "Bridge Course Visit 3", category: "Events" },
  { src: "/videos/C0010.MP4", caption: "Bridge Course Video 1", category: "Videos", type: "video" },
  { src: "/videos/C0011.MP4", caption: "Bridge Course Video 2", category: "Videos", type: "video" },
  { src: "/videos/C0013.MP4", caption: "Bridge Course Video 3", category: "Videos", type: "video" },
  { src: "/videos/C0018.MP4", caption: "Bridge Course Video 4", category: "Videos", type: "video" },
  { src: "/videos/C0021.MP4", caption: "Bridge Course Video 5", category: "Videos", type: "video" },
];

const CATEGORIES = ["All", "Arena", "Events", "Videos", "Cricket", "Racket Sports", "Indoor Sports", "Recreation"];

const GalleryImageItem = ({ image, onOpenLightbox }: { image: any, onOpenLightbox: () => void }) => {
  const [src, setSrc] = useState(image.src);
  const isVideo = image.type === 'video' || src.toLowerCase().endsWith('.mp4');

  return (
    <div
      className="premium-image-hover group relative overflow-hidden break-inside-avoid cursor-pointer bg-[var(--bg-secondary)] border border-[var(--border-light)] transition-all duration-500 hover:border-[var(--color-gold-primary)]/30"
      onClick={onOpenLightbox}
    >
      {isVideo ? (
        <video
          src={src}
          className="w-full h-auto object-cover"
          muted
          loop
          playsInline
          onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
          onMouseOut={(e) => {
            const v = e.target as HTMLVideoElement;
            v.pause();
            v.currentTime = 0;
          }}
        />
      ) : (
        <img
          src={src}
          alt={image.caption}
          className="w-full h-auto object-cover"
          onError={() => {
            if (src !== '/images/gallery-hero.jpg') {
              setSrc('/images/gallery-hero.jpg');
            }
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
        <div>
          <span className="text-[var(--color-gold-primary)] text-[9px] font-black uppercase tracking-widest block mb-1">{image.category}</span>
          <p className="text-[var(--text-primary)] text-[11px] font-bold uppercase tracking-wider leading-tight">{image.caption}</p>
        </div>
      </div>
    </div>
  );
};

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  return (
    <div className="pt-20 min-h-screen bg-[var(--bg-primary)]">
      {/* PAGE HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-grain">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" 
            src="/images/gallery-hero.jpg" 
            alt="Zenithh Gallery" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(var(--hero-brightness))' }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-6">
          <span className="text-[var(--color-gold-primary)] font-bold tracking-[0.5em] uppercase text-[10px] block mb-6">VISUAL PORTFOLIO</span>
          <h1 className="text-3xl md:text-5xl font-black uppercase text-white mb-6">
            ELITE <span className="text-[var(--color-gold-primary)] italic">VIEW</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto font-light leading-relaxed">
            A window into Hyderabad's most sophisticated multi-sport environment.
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="py-12 bg-[var(--bg-secondary)] border-y border-[var(--border-light)] sticky top-20 z-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all relative py-2 ${
                  activeCategory === cat ? "text-[var(--color-gold-primary)]" : "text-[var(--text-primary)]/40 hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
                {activeCategory === cat && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-gold-primary)]" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="py-24 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredImages.map((image) => (
              <GalleryImageItem 
                key={image.src} 
                image={image} 
                onOpenLightbox={() => setLightbox(GALLERY_IMAGES.indexOf(image))} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-[var(--bg-primary)]/95 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <button className="absolute top-10 right-10 text-[var(--text-primary)] hover:text-[var(--color-gold-primary)] transition-colors"><X className="w-10 h-10" /></button>
          {GALLERY_IMAGES[lightbox].type === 'video' || GALLERY_IMAGES[lightbox].src.toLowerCase().endsWith('.mp4') ? (
            <video
              src={GALLERY_IMAGES[lightbox].src}
              className="max-w-full max-h-[85vh] shadow-2xl outline-none"
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={GALLERY_IMAGES[lightbox].src}
              alt={GALLERY_IMAGES[lightbox].caption}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <div className="absolute bottom-10 text-center pointer-events-none">
            <span className="text-[var(--color-gold-primary)] text-xs font-black uppercase tracking-[0.5em] mb-2 block">{GALLERY_IMAGES[lightbox].category}</span>
            <h4 className="text-[var(--text-primary)] text-xl font-black uppercase tracking-widest">{GALLERY_IMAGES[lightbox].caption}</h4>
          </div>
        </div>
      )}
    </div>
  );
}
