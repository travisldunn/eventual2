import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Features: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section ref={ref} className="py-16 container-eventual">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.div className="flex flex-col" variants={item}>
          <div className="mb-4 flex justify-start -ml-5">
            <img
              src="/icons/buildings.png"
              alt="Building Icon"
              className="w-32 h-32 object-contain opacity-80"
            />
          </div>
          <h3 className="text-xl font-medium mb-4">How does it work?</h3>
          <p className="text-muted-foreground text-sm">
            Eventual predicts what your homeowners insurance will rise to over
            the next 3 years. If your actual premiums go above that, Premium
            Lock covers the difference guaranteeing the accuracy of our
            prediction.
          </p>
        </motion.div>

        <motion.div className="flex flex-col" variants={item}>
          <div className="mb-4 flex justify-start -ml-5">
            <img
              src="/icons/charts.png"
              alt="Chart Icon"
              className="w-32 h-32 object-contain opacity-80"
            />
          </div>
          <h3 className="text-xl font-medium mb-4">Any limitations?</h3>
          <p className="text-muted-foreground text-sm">
            Continue paying your homeowners insurance as usual. We'll check in
            annually for eligibility and reimbursement. You can switch providers
            anytime, just keep your coverage consistent (e.g., same deductible
            and endorsements).
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Features;
