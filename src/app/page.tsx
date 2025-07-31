"use client";

import { useState, useEffect, useRef } from "react";
import SwatCalculator from "./components/SwatCalculator";
import CustomResource from "./components/CustomResources";
import { Sun, Moon, Users, Calculator } from "lucide-react";
import React from "react";
import { useCurrencies } from "@/lib/useCurrencies";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import EmailModal from "./components/modals/Email";

const MemoizedSwatCalculator = React.memo(SwatCalculator);
const MemoizedCustomResource = React.memo(CustomResource);

type Currency = {
  currency: string;
  rate: number;
  flag: string;
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"shared" | "custom">("shared");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [showModal, setShowModal] = useState(false); // To toggle modal visibility

  const currencies = useCurrencies();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (currencies.length > 0) {
      const defaultCurrency = currencies.find(currency => currency.currency === "AED");
      if (defaultCurrency) {
        setSelectedCurrency(defaultCurrency);
      }
    }
  }, [currencies]);

  // Handle currency change
  const handleCurrencyChange = (value: string) => {
    const selected = currencies.find(currency => currency.currency === value);
    if (selected) {
      setSelectedCurrency(selected);
    }
  };
  const swatRef = useRef<any>(null);
  const customRef = useRef<any>(null);
  const handleSendEmail = () => {
    const swatData = swatRef.current?.getSwatData?.();
    const customData = customRef.current?.getCustomData?.(); // implement similarly

    console.log("SWAT:", swatData);
    console.log("CUSTOM:", customData);

    // You can now pass swatData and customData to EmailModal as props
    setShowModal(true);
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen transition-all duration-500 text-black dark:text-white px-0 sm:px-4 py-8 ">
      {/* Dark mode toggle */}
      <div className="flex items-center justify-end w-full max-w-4xl mb-6 px-4">
        <div className="mr-4 w-48">
          <Select value={selectedCurrency?.currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-full py-6 bg-button rounded-lg">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map(({ currency, flag }) => (
                <SelectItem key={currency} value={currency}>
                  <div className="flex items-center gap-2">
                    <img src={flag} alt={currency} className="w-5 h-4 object-cover" />
                    <span>{currency}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-black transition cursor-pointer"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-gray-200 dark:bg-neutral-800 p-1 rounded-full mb-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        <button
          onClick={() => setActiveTab("shared")}
          className={`cursor-pointer px-4 py-2 rounded-full flex items-center justify-center gap-2 transition text-sm font-bold w-1/2 ${activeTab === "shared"
              ? "bg-white dark:bg-neutral-700 text-blue-500 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300"
            }`}
        >
          <Users className="w-5 h-5" />
          Shared Hub71 SWAT Team
        </button>
        <button
          onClick={() => setActiveTab("custom")}
          className={`cursor-pointer px-4 py-2 rounded-full flex items-center justify-center gap-2 transition text-sm font-bold w-1/2 ${activeTab === "custom"
              ? "bg-white dark:bg-neutral-700 text-blue-500 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-300"
            }`}
        >
          <Calculator className="w-5 h-5" />
          Custom Resources
        </button>
      </div>

      {/* Render both, toggle visibility */}
      <div className="w-full max-w-4xl">
        <div style={{ display: activeTab === "shared" ? "block" : "none" }}>
          <MemoizedSwatCalculator ref={swatRef} selectedCurrency={selectedCurrency} />
        </div>
        <div style={{ display: activeTab === "custom" ? "block" : "none" }}>
          <MemoizedCustomResource ref={customRef} selectedCurrency={selectedCurrency} />
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleSendEmail}
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Send Email
        </button>
      </div>
      {showModal && <EmailModal closeEmailModal={() => setShowModal(false)} swatData={swatRef.current?.getSwatData?.()}
        customData={customRef.current?.getCustomData?.()} />}

    </main>
  );
}
