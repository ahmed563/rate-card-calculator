"use client";

import { useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";


const durations = [
  { label: "1 month", discount: null, value: 1 },
  { label: "2 months", discount: "-5.0%", value: 0.95 },
  { label: "3 months", discount: "-10.0%", value: 0.9 },
];

export default function DurationOptions({
  onSelect,
}: {
  onSelect?: (value: number) => void;
}) {
  const [selected, setSelected] = useState("1 month");

  useEffect(() => {
    // Set initial default on first render
    const defaultItem = durations.find((d) => d.label === selected);
    if (defaultItem && defaultItem.value) onSelect?.(defaultItem.value);
  }, [onSelect, selected]);

  const handleClick = (label: string, value: number) => {
    setSelected(label);
    onSelect?.(value);
  };

  return (
    <div>
      <label className="flex items-center text-sm gap-2 text-gray-700 dark:text-zinc-300 mb-2 block">
        <CalendarDays className="w-4 h-4" />
        Duration
      </label>
      <div className="space-y-4">
        {durations.map((item) => {
          const isActive = selected === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => handleClick(item.label, item.value)}
              className={cn(
                "flex items-center justify-between w-full px-4 py-4 rounded-md border text-sm transition cursor-pointer hover:shadow-md",
                isActive
                  ? "bg-blue text-white border-blue"
                  : "bg-button border-button text-white"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={cn(
                    "text-md font-semibold",
                    isActive ? "text-gray-100" : "text-black dark:text-white"
                  )}
                >
                  {item.label}
                </span>
                <div className="flex items-center space-x-2">
                  {item.discount && (
                    <span
                      className={cn(
                        "text-xs",
                        isActive ? "text-gray-100" : "text-red-400"
                      )}
                    >
                      {item.discount}
                    </span>
                  )}
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
