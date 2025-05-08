import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTA: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 container-eventual mb-12">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-7xl font-light mb-12 leading-tight">
          Ready to lock in your
          <br />
          quote?
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            className="border border-white text-white rounded-xl px-8 py-3 text-lg font-normal flex items-center justify-center space-x-2 transition-all bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Continue</span>
            <ArrowRight size={22} />
          </motion.button>

          <motion.button
            className="border border-white text-white rounded-xl px-8 py-3 text-lg font-normal transition-all bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Schedule a demo
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
