"use client";

import { useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

type SeniorityLevel = {
  id: number;
  seniority_level: string;
  rate_adjustment: number;
};

export default function SeniorityOptions({
  onSelect,
}: {
  onSelect?: (level: SeniorityLevel) => void;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [levels, setLevels] = useState<SeniorityLevel[]>([]);

  useEffect(() => {
    const fetchLevels = async () => {
      const res = await fetch("/api/seniority-levels");
      const data = await res.json();
      setLevels(data);
      if (data.length > 0) {
        const defaultLevel = data[0];
        setSelectedId(defaultLevel.id); // set as selected in state
        onSelect?.(defaultLevel); // send to parent
      }
    };
    fetchLevels();
  }, []);

  const handleClick = (item: SeniorityLevel) => {
    setSelectedId(item.id);
    onSelect?.(item);
  };

  return (
    <div>
      <label className="flex items-center text-sm font-semibold gap-2 text-gray-600 dark:text-zinc-300 mb-2 block">
        <TrendingUp className="w-4 h-4" />
        Seniority Level
      </label>
      <div className="space-y-4">
        {levels.map((item) => {
          const isActive = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item)}
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
                  {item.seniority_level}
                </span>
                <div className="flex items-center space-x-2">
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
