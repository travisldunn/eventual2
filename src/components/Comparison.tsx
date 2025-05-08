import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { useInsurance } from "../context/InsuranceContext";
import InsuranceBarChart from "./InsuranceBarChart";
import { STRIKE_PRICE } from "../context/InsuranceContext";

const Comparison: React.FC = () => {
  const { insuranceData, setGrowthRate, potentialSavings } = useInsurance();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [prevValue, setPrevValue] = useState(potentialSavings);

  useEffect(() => {
    // Set timeout to animate the number changing
    const timeout = setTimeout(() => {
      setPrevValue(potentialSavings);
    }, 100);

    return () => clearTimeout(timeout);
  }, [potentialSavings]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setGrowthRate(value[0]);
  };

  // Helper for chart data transformation
  const transformDataForChart = (type: "withoutLock" | "withLock") => {
    return insuranceData.yearlyData.map((data) => {
      // Determine fill color based on year and type
      let fill;
      if (type === "withoutLock") {
        fill = data.year === 3 ? "#FF3B30" : "#6A6A6A";
      } else {
        // withLock
        // First two bars should be gray like the other chart
        fill =
          data.year < 2 ? "#6A6A6A" : data.year === 3 ? "#34C759" : "#198754";
      }

      return {
        name: data.year === 0 ? "Current" : `Year ${data.year}`,
        value: data[type],
        fill: fill,
      };
    });
  };

  const withoutLockData = transformDataForChart("withoutLock");
  const withLockData = transformDataForChart("withLock");

  // Animation properties for the dollar amount
  const dollarVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  // Find the maximum value for the reference line (highest bar in either dataset)
  const maxValue = Math.max(
    ...withoutLockData.map((item) => item.value),
    ...withLockData.map((item) => item.value)
  );

  return (
    <section
      ref={ref}
      id="comparison"
      className="py-16 md:py-20 container-eventual"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-1">
          <span className="text-xs uppercase text-muted-foreground tracking-wide">
            COMPARISON TABLE
          </span>
        </div>
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-medium text-center mb-12"
        >
          See how much you could save
        </motion.h2>

        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex justify-center items-center gap-2">
            <span className="text-2xl md:text-3xl font-medium text-[#34C759]">
              $
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={potentialSavings}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={dollarVariants}
                className="text-4xl md:text-5xl font-medium text-[#34C759]"
              >
                {potentialSavings.toLocaleString()}
              </motion.span>
            </AnimatePresence>
          </div>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground mt-2"
          >
            potential savings over 3 years
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16">
          <div className="text-center mb-4 text-lg">
            Annual Insurance Growth Rate:{" "}
            <span className="font-medium">
              {insuranceData.annualGrowthRate}%
            </span>
          </div>
          <div className="w-full max-w-2xl mx-auto px-4">
            <Slider
              defaultValue={[insuranceData.annualGrowthRate]}
              min={0}
              max={50}
              step={1}
              onValueChange={handleSliderChange}
              className="w-full h-1"
            />
            <div className="flex justify-between text-base text-[#6A6A6A] mt-2">
              <span>0%</span>
              <span>50%</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Chart 1: Without Premium Lock */}
          <InsuranceBarChart
            data={withoutLockData}
            title="Without Premium Lock"
            year3Value={insuranceData.yearlyData[3].withoutLock}
            valueColor="#FF3B30"
          />

          {/* Chart 2: With Premium Lock */}
          <InsuranceBarChart
            data={withLockData}
            title="With Premium Lock"
            year3Value={insuranceData.yearlyData[3].withLock}
            showReferenceLine={true}
            referenceLineValue={STRIKE_PRICE}
            valueColor="#34C759"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Comparison;
