// app/components/hooks/useSwatCalculator.ts
import { useEffect, useState } from "react";

export type Role = { id: number; roles: string; base_rate: number };
export type SeniorityLevel = { id: number; seniority_level: string; rate_adjustment: number };
export type Currency = { currency: string; rate: number; flag: string };

export function useSwatCalculator(selectedCurrency: Currency | null) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedSeniority, setSelectedSeniority] = useState<SeniorityLevel | null>(null);
  const [workload, setWorkload] = useState<number>(0.4);
  const [durationDiscount, setDurationDiscount] = useState<number>(1);
  const [finalRate, setFinalRate] = useState<number>(0);

  const preNegotiatedDiscount = 0.8;

  useEffect(() => {
    if (selectedRole && selectedSeniority && selectedCurrency) {
      const base = selectedRole.base_rate;
      const seniorityMultiplier = selectedSeniority.rate_adjustment;
      const workloadMultiplier = workload;
      const duration = durationDiscount;

      const rateInAED = base * seniorityMultiplier * workloadMultiplier * duration * preNegotiatedDiscount;
      const convertedRate = rateInAED * selectedCurrency.rate;

      setFinalRate(convertedRate);
    }
  }, [selectedRole, selectedSeniority, workload, durationDiscount, selectedCurrency]);

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
