import React from "react";
import { motion } from "framer-motion";
import { useInsurance } from "../context/InsuranceContext";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

const Hero: React.FC = () => {
  const { insuranceData, potentialSavings } = useInsurance();

  return (
    <section className="min-h-screen pt-28 pb-16 flex flex-col justify-center relative container-eventual">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-lg md:text-xl font-normal mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your 3-year Premium Lock quote for{" "}
          <span className="font-bold border-b border-dashed border-white">
            123 Appleseed Drive, New York, NY
          </span>
        </motion.h1>

        <motion.div
          className=" rounded-3xl border border-gray-300 border-b-2 border-b-white px-8 py-5 inline-block mb-6 max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <h2 className="text-8xl  font-medium">
            <span className="font-light">$</span>
            {insuranceData.monthlyCost}
            <span className="block md:inline w-full text-center text-xs ml-0 md:ml-1">per month</span>
          </h2>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="border-white rounded-2xl border hover:bg-secondary/80 text-white font-medium py-3 px-4 w-full max-w-[410px] mx-auto flex items-center justify-center space-x-2 transition-all">
            <span>Next</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-1 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs text-muted-foreground">
            🎉 Based on our quote, you could save{" "}
            <span className="text-white font-medium">${potentialSavings.toLocaleString()}!</span>
          </p>
        </motion.div>

        <motion.div
          className="mt-2 flex items-center justify-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Checkbox id="terms" className="border-white/30 mt-[1px]" />
          <label htmlFor="terms" className="text-xs text-muted-foreground">
            I agree to the{" "}
            <a href="#" className="underline underline-offset-2">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2">
              Privacy Notice
            </a>
            .
          </label>
        </motion.div>
      </motion.div>
      <div className="w-full mt-24 px-4">
        <div className="border-t border-white/15 w-full" />

        <motion.div
          className="pt-4 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a
            href="#comparison"
            className="group text-white hover:bg-transparent text-base font-normal flex items-center"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>See How It Works</span>
            <ArrowDown
              className="ml-2 transition-transform group-hover:translate-y-1"
              size={18}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
