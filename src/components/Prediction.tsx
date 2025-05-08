import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useInsurance } from "../context/InsuranceContext";
import { STRIKE_PRICE } from "../context/InsuranceContext";
import { ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Prediction: React.FC = () => {
  const { insuranceData } = useInsurance();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section
      ref={ref}
      id="prediction"
      className="py-20 lg:py-24 container-eventual"
    >
      <motion.div
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-light text-muted-foreground mb-8">
          We predict your insurance
          <br />
          premiums will increase to{" "}
          <motion.span
            key={insuranceData.yearlyData[3].withoutLock}
            className="text-destructive font-normal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            ${insuranceData.yearlyData[3].withoutLock.toLocaleString()}
          </motion.span>
          <br />
          over the next 3 years
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-6"
        >
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-center space-x-2 mx-auto text-muted-foreground hover:text-white transition-colors"
          >
            <span>{showDetails ? "Hide details" : "Show me the details"}</span>
            <motion.div
              animate={{ rotate: showDetails ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9L12 16L5 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </button>
        </motion.div>

        {showDetails && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="border border-secondary rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">
                          Premium Type
                        </TableHead>
                        <TableHead className="text-center">Current</TableHead>
                        <TableHead className="text-center">Year 1</TableHead>
                        <TableHead className="text-center">Year 2</TableHead>
                        <TableHead className="text-center">Year 3</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium w-[180px]">
                          Without Premium Lock
                        </TableCell>
                        {insuranceData.yearlyData.map((y, i) => (
                          <TableCell
                            key={"without-" + i}
                            className={
                              "text-center" +
                              (i > 0 && y.withoutLock > STRIKE_PRICE ? " text-destructive font-medium" : "")
                            }
                          >
                            ${y.withoutLock}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium w-[180px]">
                          With Premium Lock
                        </TableCell>
                        {insuranceData.yearlyData.map((y, i) => (
                          <TableCell
                            key={"with-" + i}
                            className={
                              "text-center" +
                              (i > 0 && y.withLock === STRIKE_PRICE ? " text-[#34C759] font-medium" : "")
                            }
                          >
                            ${y.withLock}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-muted-foreground text-sm mb-4">
                Based on an annual growth rate of{" "}
                {insuranceData.annualGrowthRate}%
              </p>

              <a
                href="#comparison"
                className="inline-flex items-center justify-center space-x-2 text-white hover:text-primary transition-colors"
              >
                <span>See how much you could save</span>
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Prediction;
