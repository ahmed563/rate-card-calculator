import { supabase } from "./supabase";

export async function saveRatesToSupabase(rates: Record<string, any>) {
  const flagUrl = (currency: string) =>
    `https://flagcdn.com/w40/${currency.slice(0, 2).toLowerCase()}.png`;

  for (const [currency, { value }] of Object.entries(rates)) {
    const { error } = await supabase
      .from("currency")
      .upsert(
        {
          currency,
          rate: value,
          flag: flagUrl(currency),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "currency" }
      );

    if (error) {
      console.error(`Failed to upsert ${currency}:`, error.message);
    }
  }
}
