"use client";

import React, { useImperativeHandle, forwardRef } from "react";
import { useSwatCalculator, Currency } from "../hooks/useSwatCalculator";
import DurationOptions from "./common/DurationOption";
import RoleSelect from "./common/RoleSelect";
import SeniorityOptions from "./common/SeniortityOption";
import WorkloadOptions from "./common/WorkLoadFile";

const SwatCalculator = forwardRef(function SwatCalculator(
  { selectedCurrency }: { selectedCurrency: Currency | null },
  ref: any
) {
  const {
    selectedRole,
    setSelectedRole,
    selectedSeniority,
    setSelectedSeniority,
    workload,
    setWorkload,
    durationDiscount,
    setDurationDiscount,
    finalRate,
  } = useSwatCalculator(selectedCurrency);

  useImperativeHandle(ref, () => ({
    getSwatData: () => ({
      selectedRole,
      selectedSeniority,
      workload,
      durationDiscount,
      finalRate,
      currency: selectedCurrency?.currency || "N/A",
    }),
  }));

  return (
    <div className="bg-calc-light dark:bg-calc-dark text-foreground p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto space-y-6 border border-border">
      <header>
        <h1 className="text-2xl font-bold">SWAT Team Calculator</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pre-negotiated 20% discount. Base: Middle East - Advanced.
        </p>
      </header>

      <div className="-mx-6 border-t border-border" />

      <div className="grid md:grid-cols-4 gap-6">
        <RoleSelect onSelect={setSelectedRole} />
        <WorkloadOptions value={workload} onSelect={setWorkload} />
        <DurationOptions onSelect={setDurationDiscount} />
        <SeniorityOptions onSelect={setSelectedSeniority} />
      </div>

      <div className="-mx-6 border-t border-border" />

      <div className="pt-2 flex justify-end">
        <div className="text-right">
          <p className="text-muted-foreground text-sm">Monthly Rate:</p>
          <p className="font-semibold text-4xl text-blue-400 dark:text-blue-400">
            {selectedCurrency?.currency}{" "}
            {finalRate.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>
    </div>
  );
});

export default SwatCalculator;
