import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export type Currency = {
  currency: string;
  rate: number;
  flag: string;
  symbol: string;
};

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const { data, error } = await supabase
        .from("currency")
        .select("*")
        .order("currency", { ascending: true });

      if (!error && data) {
        setCurrencies(data);
      }
    };

    fetchCurrencies();
  }, []);

  return currencies;
}
