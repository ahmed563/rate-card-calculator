// hooks/useCustomRateCalculator.ts
import { useEffect, useState } from "react";

type Role = { id: number; roles: string; base_rate: number };
type SeniorityLevel = { id: number; seniority_level: string; rate_adjustment: number };
type Region = { id: number; name: string; multipliers: number };
type Currency = {
  currency: string;
  rate: number;
  flag: string;
};

export function useCustomRateCalculator(
  selectedRole: Role | null,
  selectedSeniority: SeniorityLevel | null,
  selectedRegion: Region | null,
  selectedCurrency: Currency | null
) {
  const [finalRate, setFinalRate] = useState<number>(0);

  useEffect(() => {
    if (selectedRole && selectedSeniority && selectedRegion && selectedCurrency?.rate) {
      const base = selectedRole.base_rate;
      const seniorityMultiplier = selectedSeniority.rate_adjustment;
      const regionMultiplier = selectedRegion.multipliers;

      const rateInAED = base * seniorityMultiplier * regionMultiplier;
      const convertedRate = rateInAED * selectedCurrency.rate;

      setFinalRate(convertedRate);
    }
  }, [selectedRole, selectedSeniority, selectedRegion, selectedCurrency]);

  return finalRate;
}
