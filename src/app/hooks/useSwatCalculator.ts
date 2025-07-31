// app/components/hooks/useSwatCalculator.ts
import { useEffect, useState } from "react";

// Define types for role, seniority, and currency
export type Role = { id: number; roles: string; base_rate: number };
export type SeniorityLevel = { id: number; seniority_level: string; rate_adjustment: number };
export type Currency = { currency: string; rate: number; flag: string };

// Custom hook for calculating SWAT team rate with discounts and multipliers
export function useSwatCalculator(selectedCurrency: Currency | null) {
  // Selected role and seniority level
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedSeniority, setSelectedSeniority] = useState<SeniorityLevel | null>(null);

  // Workload multiplier (e.g., 0.4 for part-time, 1 for full-time)
  const [workload, setWorkload] = useState<number>(0.4);

  // Duration-based discount multiplier (e.g., 0.9 for long-term commitments)
  const [durationDiscount, setDurationDiscount] = useState<number>(1);

  // Final calculated rate
  const [finalRate, setFinalRate] = useState<number>(0);

  // Pre-negotiated discount multiplier applied to all SWAT pricing
  const preNegotiatedDiscount = 0.8;

  useEffect(() => {
    // Ensure all required selections are made before calculating the rate
    if (selectedRole && selectedSeniority && selectedCurrency) {
      const base = selectedRole.base_rate;
      const seniorityMultiplier = selectedSeniority.rate_adjustment;
      const workloadMultiplier = workload;
      const duration = durationDiscount;

      // Calculate rate in AED before currency conversion
      const rateInAED =
        base * seniorityMultiplier * workloadMultiplier * duration * preNegotiatedDiscount;

      // Convert AED rate to selected currency
      const convertedRate = rateInAED * selectedCurrency.rate;

      // Set the final converted rate
      setFinalRate(convertedRate);
    }
  }, [selectedRole, selectedSeniority, workload, durationDiscount, selectedCurrency]);

  // Return all state values and setters needed for the calculator UI
  return {
    selectedRole,
    setSelectedRole,
    selectedSeniority,
    setSelectedSeniority,
    workload,
    setWorkload,
    durationDiscount,
    setDurationDiscount,
    finalRate,
  };
}
