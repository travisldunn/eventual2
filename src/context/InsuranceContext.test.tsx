import React from "react";
import { render, act } from "@testing-library/react";
import { InsuranceProvider, useInsurance } from "./InsuranceContext";

// Mock component to test the context
const TestComponent = () => {
  const { insuranceData, setGrowthRate, potentialSavings } = useInsurance();
  return (
    <div>
      <div data-testid="annualGrowthRate">{insuranceData.annualGrowthRate}</div>
      <div data-testid="potentialSavings">{potentialSavings}</div>
      <button onClick={() => setGrowthRate(30)}>Set Growth Rate</button>
    </div>
  );
};

describe("InsuranceContext", () => {
  it("provides initial values", () => {
    const { getByTestId } = render(
      <InsuranceProvider>
        <TestComponent />
      </InsuranceProvider>
    );

    expect(getByTestId("annualGrowthRate").textContent).toBe("25");
    expect(getByTestId("potentialSavings").textContent).toBe("0");
  });

  it("updates values when growth rate changes", () => {
    const { getByTestId, getByText } = render(
      <InsuranceProvider>
        <TestComponent />
      </InsuranceProvider>
    );

    act(() => {
      getByText("Set Growth Rate").click();
    });

    expect(getByTestId("annualGrowthRate").textContent).toBe("30");
  });
});
