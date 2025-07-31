"use client";

import { useEffect } from "react";
import { CircleCheckBig } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

const options = [
  { label: "2 days / week", value: 0.4 },
  { label: "3 days / week", value: 0.6 },
  { label: "4 days / week", value: 0.8 },
  { label: "Full-time", value: 1.0 },
];

type Props = {
  value: number;
  onSelect: (value: number) => void;
};

export default function WorkloadOptions({ value, onSelect }: Props) {
  useEffect(() => {
    if (value === undefined || value === null) {
      onSelect(0.4); // default workload
    }
  }, [value, onSelect]);

  return (
    <div>
      <label className="flex items-center text-sm font-semibold gap-2 text-gray-600 dark:text-zinc-300 mb-2 block">
        <TrendingUp className="w-4 h-4" />
        Workload
      </label>
      <div className="space-y-4">
        {options.map((option) => {
          const isActive = value === option.value;

          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              type="button"
              className={cn(
                "flex items-center justify-between w-full px-4 py-4 rounded-md border text-sm transition cursor-pointer hover:shadow-md",
                isActive
                  ? "bg-blue text-white border-blue"
                  : "bg-button border-button text-white",
                "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={cn(
                    "text-md font-semibold",
                    isActive ? "text-gray-100" : "text-black dark:text-white"
                  )}
                >
                  {option.label}
                </span>
                <div className="flex items-center space-x-3">
                  <span
                    className={cn(
                      "text-xs",
                      isActive ? "text-gray-100" : "text-gray-500 dark:text-white"
                    )}
                  >
                    {(option.value * 100).toFixed(0)}%
                  </span>
                  <span
                    className={cn(
                      "flex items-center justify-center h-4 w-4 rounded-full border transition",
                      isActive
                        ? "bg-icon text-blue h-5 w-5"
                        : "border-gray-400 border-2 h-5 w-5"
                    )}
                  >
                    {isActive && <CircleCheckBig className="h-3 w-3" />}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
