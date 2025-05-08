import React, { createContext, useContext, useState, useEffect } from 'react';

// Types for our insurance data
export interface InsuranceData {
  annualGrowthRate: number; // The slider value (percentage)
  monthlyCost: number;
  totalPremium: number;
  yearlyData: YearlyData[];
}

export interface YearlyData {
  year: number; // 0 = current, 1, 2, 3
  withoutLock: number;
  withLock: number;
}

// Initial data
export const STRIKE_PRICE = 4371; // Set this to your spreadsheet's strike price
const initialInsuranceData: InsuranceData = {
  annualGrowthRate: 25, // 25% as default
  monthlyCost: 18.12,
  totalPremium: 4371,
  yearlyData: (() => {
    const baseAmount = 2950;
    const arr = [{ year: 0, withoutLock: baseAmount, withLock: baseAmount }];
    let prev = baseAmount;
    for (let year = 1; year <= 3; year++) {
      const withoutLock = Math.round(prev * 1.25);
      const withLock = Math.min(withoutLock, STRIKE_PRICE);
      arr.push({ year, withoutLock, withLock });
      prev = withoutLock;
    }
    return arr;
  })(),
};

interface InsuranceContextType {
  insuranceData: InsuranceData;
  setGrowthRate: (rate: number) => void;
  potentialSavings: number;
}

const InsuranceContext = createContext<InsuranceContextType | undefined>(undefined);

export const InsuranceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [insuranceData, setInsuranceData] = useState<InsuranceData>(initialInsuranceData);
  // Calculate initial potential savings based on strike price logic
  const initialPotentialSavings = initialInsuranceData.yearlyData
    .slice(1) // years 1-3
    .reduce((sum, y) => sum + (y.withoutLock > STRIKE_PRICE ? y.withoutLock - STRIKE_PRICE : 0), 0);
  const [potentialSavings, setPotentialSavings] = useState<number>(initialPotentialSavings);

  // Calculate new values when growth rate changes
  const setGrowthRate = (rate: number) => {
    // Strike price logic
    const baseAmount = initialInsuranceData.yearlyData[0].withoutLock;
    let prev = baseAmount;
    const yearlyData = [{ year: 0, withoutLock: baseAmount, withLock: baseAmount }];
    let savings = 0;
    for (let year = 1; year <= 3; year++) {
      const withoutLock = Math.round(prev * (1 + rate / 100));
      const withLock = Math.min(withoutLock, STRIKE_PRICE);
      if (withoutLock > STRIKE_PRICE) {
        savings += withoutLock - STRIKE_PRICE;
      }
      yearlyData.push({ year, withoutLock, withLock });
      prev = withoutLock;
    }
    setInsuranceData({
      ...insuranceData,
      annualGrowthRate: rate,
      totalPremium: yearlyData[3].withLock,
      yearlyData,
    });
    setPotentialSavings(savings);
  };

  // Export functions and state
  const value = {
    insuranceData,
    setGrowthRate,
    potentialSavings
  };

  return <InsuranceContext.Provider value={value}>{children}</InsuranceContext.Provider>;
};

// Custom hook for using insurance context
export const useInsurance = (): InsuranceContextType => {
  const context = useContext(InsuranceContext);
  if (context === undefined) {
    throw new Error('useInsurance must be used within an InsuranceProvider');
  }
  return context;
};
