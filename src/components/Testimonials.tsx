import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  avatar: string;
  position?: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Premium Lock helped my family keep our homeowners insurance Premiums affordable over the last few years.",
    author: "Jon W.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    quote:
      "Without Premium Lock, I would have been paying much higher homeowners insurance after my last renewal.",
    author: "Renee M.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    quote:
      "I didn't know this product existed until my agent mentioned it last year. It gives me peace of mind that I can understand my insurance costs for multiple years.",
    author: "Marlon B.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 4,
    quote:
      "The process was so easy and transparent. Highly recommend Premium Lock!",
    author: "Samantha K.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    quote:
      "I saved more than I expected. Customer service was fantastic.",
    author: "Alex P.",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    id: 6,
    quote:
      "Premium Lock gave me peace of mind about my insurance costs.",
    author: "Linda Q.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const Testimonials: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollBy = 340; // px, matches card width + gap
  const handlePrev = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -scrollBy, behavior: 'smooth' });
  };
  const handleNext = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: scrollBy, behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="py-20 container-eventual" id="testimonials">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <div className="text-center mb-1">
          <span className="text-xs uppercase text-muted-foreground tracking-wide">TESTIMONIALS</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-medium">
          Don't just take our word for it
        </h2>
      </motion.div>

      <div className="relative">
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-secondary/70 hover:bg-secondary/90 text-white rounded-full p-2 shadow-lg disabled:opacity-30"
          aria-label="Previous"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-secondary/70 hover:bg-secondary/90 text-white rounded-full p-2 shadow-lg disabled:opacity-30"
          aria-label="Next"
        >
          <ChevronRight size={28} />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide py-2 px-1"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="min-w-[320px] max-w-[340px] flex-shrink-0 scroll-snap-align-start"
            >
              <div className="bg-secondary/30 border border-white/10 rounded-2xl p-8 flex flex-col h-full shadow-lg">
                <div className="flex flex-col items-start mb-6">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-16 h-16 rounded-full border-2 border-white object-cover mb-4 shadow"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-xl font-light text-white leading-relaxed mb-8 text-left">
                    “{item.quote}”
                  </p>
                </div>
                <div className="mt-auto">
                  <span className="font-bold text-white text-lg text-left block">{item.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
