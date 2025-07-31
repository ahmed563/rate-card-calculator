"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import RoleSelect from "./common/RoleSelect";
import SeniorityOptions from "./common/SeniortityOption";
import RegionSelect from "./common/RegionOption";
import { useCustomRateCalculator } from "../hooks/useCustomRateCalculator";

type Role = { id: number; roles: string; base_rate: number };
type SeniorityLevel = { id: number; seniority_level: string; rate_adjustment: number };
type Region = { id: number; name: string; multipliers: number };
type Currency = {
  currency: string;
  rate: number;
  flag: string;
};

const CustomResource = forwardRef(function CustomResource(
  { selectedCurrency }: { selectedCurrency: Currency | null },
  ref: any
) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedSeniority, setSelectedSeniority] = useState<SeniorityLevel | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  // custom hook
  const finalRate = useCustomRateCalculator(
    selectedRole,
    selectedSeniority,
    selectedRegion,
    selectedCurrency
  );
  // Expose internal state values to parent component via ref,
  // allowing the parent to access selected options and finalRate 
  // when needed for email .
  useImperativeHandle(ref, () => ({
    getCustomData: () => ({
      selectedRole,
      selectedSeniority,
      selectedRegion,
      finalRate,
      currency: selectedCurrency?.currency || "N/A",
    }),
  }));

  return (
    <div className="bg-calc-light dark:bg-calc-dark text-foreground p-6 rounded-xl w-full max-w-4xl mx-auto space-y-6 border border-border">
      <header>
        <h1 className="text-2xl font-bold">Custom Resource Calculator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Calculate custom resource rates based on role, seniority, and region.
        </p>
      </header>

      <div className="-mx-6 border-t border-border" />

      <div className="grid md:grid-cols-3 gap-6">
        <RegionSelect onSelect={setSelectedRegion} />
        <RoleSelect onSelect={setSelectedRole} />
        <SeniorityOptions onSelect={setSelectedSeniority} />
      </div>

      <div className="-mx-6 border-t border-border" />

      <div className="pt-2 flex justify-end">
        <div className="text-right">
          <p className="text-muted-foreground text-sm">Monthly Rate:</p>
          <p className="font-semibold text-3xl text-blue-600 dark:text-blue-400 font-semibold ">
            {selectedCurrency?.currency || "AED"}{" "}
            {finalRate.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>
    </div>
  );
});

export default CustomResource;
