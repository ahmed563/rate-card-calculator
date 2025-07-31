import { saveRatesToSupabase } from "./saveRates";

// Your Currency API key (replace with your actual key)

// List of major currencies you want to fetch
const majorCurrencies = ["USD", "EUR", "GBP", "PKR", "AED", "INR", "CAD", "AUD"];

export async function fetchExchangeRates() {
  try {
    // Fetch exchange rates for a base currency (e.g., AED)
    const res = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${process.env.NEXT_PUBLIC_CURRENCY_API_KEY}&base_currency=AED`);
    const data = await res.json();

    // Check if the response contains data
    if (!data?.data) throw new Error("Invalid response from currency API");

    // Filter only the major currencies we need
    const filteredRates = Object.entries(data.data).reduce((acc, [currency, rate]) => {
      if (majorCurrencies.includes(currency)) {
        acc[currency] = rate;
      }
      return acc;
    }, {} as Record<string, any>);

    console.log("Fetched and filtered rates:", filteredRates);

    // Save the filtered rates to Supabase
    await saveRatesToSupabase(filteredRates);

  } catch (err) {
    const error = err as Error;
    console.error("Error fetching rates:", error.message);
  }
}
