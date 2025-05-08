import React, { useEffect } from "react";
import { InsuranceProvider } from "../context/InsuranceContext";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Prediction from "../components/Prediction";
import Features from "../components/Features";
import Comparison from "../components/Comparison";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  // Handle smooth scroll
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          window.scrollTo({
            top:
              targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: "smooth",
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <InsuranceProvider>
      <div className="bg-eventual-black text-white min-h-screen">
        <Header />
        <main>
          <Hero />
          <Prediction />
          <Features />
          <Comparison />
          <Testimonials />
          <CTA />
          <Footer />
        </main>
      </div>
    </InsuranceProvider>
  );
};

export default Index;
