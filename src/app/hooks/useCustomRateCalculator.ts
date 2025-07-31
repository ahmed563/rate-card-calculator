// hooks/useCustomRateCalculator.ts
import { useEffect, useState } from "react";

// Define expected input types
type Role = { id: number; roles: string; base_rate: number };
type SeniorityLevel = { id: number; seniority_level: string; rate_adjustment: number };
type Region = { id: number; name: string; multipliers: number };
type Currency = {
  currency: string;
  rate: number; // Conversion rate from AED to selected currency
  flag: string;
};

// Custom hook to calculate final rate based on role, seniority, region, and currency
export function useCustomRateCalculator(
  selectedRole: Role | null,
  selectedSeniority: SeniorityLevel | null,
  selectedRegion: Region | null,
  selectedCurrency: Currency | null
) {
  const [finalRate, setFinalRate] = useState<number>(0);

  useEffect(() => {
    // Ensure all inputs are selected and currency has a valid rate before calculation
    if (selectedRole && selectedSeniority && selectedRegion && selectedCurrency?.rate) {
      const base = selectedRole.base_rate;
      const seniorityMultiplier = selectedSeniority.rate_adjustment;
      const regionMultiplier = selectedRegion.multipliers;

      // Step 1: Calculate rate in AED using base rate, seniority, and region multipliers
      const rateInAED = base * seniorityMultiplier * regionMultiplier;

      // Step 2: Convert AED rate to selected currency
      const convertedRate = rateInAED * selectedCurrency.rate;

      // Update state with final calculated rate
      setFinalRate(convertedRate);
    }
  }, [selectedRole, selectedSeniority, selectedRegion, selectedCurrency]);

  // Return the final converted rate
  return finalRate;
}
